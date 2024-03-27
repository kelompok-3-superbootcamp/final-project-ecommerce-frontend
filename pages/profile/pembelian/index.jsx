"use client"

import Link from "next/link"
import { Button, Navbar } from "flowbite-react"
import { useState } from "react"
import { Card } from "flowbite-react"
import LayoutProfile from "@/components/LayoutProfile"
import useSWR from "swr"
import Swal from "sweetalert2"
import ListCar from "../../../components/ListCar"
import { useAuthStore } from "@/stores/auth"
import { host } from "@/utils/constant"
import { Pagination } from "flowbite-react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useEffect } from "react"
import axios from "axios"
import ReviewCard from "@/components/ReviewCard"

const fetcher = ([url, header]) => fetch(`${host}${url}`, { headers: header }).then(res => res.json())

export default function Pembelian() {
  const [status, setStatus] = useState("pending")
  const { user, logout } = useAuthStore()
  const style = { color: "orange" }
  let header = { Authorization: `Bearer ${user?.access_token}` }
  const { data: orders, error: err1, isLoading: is1, mutate } = useSWR([`/orders/user/${status}`, header], fetcher)
  const { data: reviews, error: err2, isLoading: is2 } = useSWR([`/reviews`, header], fetcher)
  console.log("orderan:", orders)
  const handleBuy = id => {
    axios
      .post(
        `${host}/orders/checkout/${id}`,
        {},
        {
          headers: { Authorization: "Bearer " + user.access_token },
        },
      )
      .then(res => {
        Swal.fire({
          title: "Apakah kamu yakin?",
          text: `Pastikan kamu membayarnya dalam waktu 24 jam`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, pergi membayar!",
        }).then(result => {
          if (result.isConfirmed) {
            window.open(`${res.data.data}`)
          }
        })
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: error?.response.data.message ?? "Checkout gagal",
        })
        console.error(error)
      })
  }

  return (
    <>
      <LayoutProfile>
        <Card className="m-auto my-8">
          <Navbar fluid rounded className="mx-auto mt-8 items-center">
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Navbar.Link
                className="cursor-pointer"
                onClick={() => setStatus("pending")}
                style={status === "pending" ? style : {}}
              >
                Menunggu Pembayaran
              </Navbar.Link>
              <Navbar.Link
                className="cursor-pointer"
                onClick={() => setStatus("success")}
                style={status === "success" ? style : {}}
              >
                Di Kirim (Towing)
              </Navbar.Link>
              <Navbar.Link
                className="cursor-pointer"
                onClick={() => setStatus("error")}
                style={status === "error" ? style : {}}
              >
                Pembayaran Gagal
              </Navbar.Link>
              <Navbar.Link
                className="cursor-pointer"
                onClick={() => setStatus("closed")}
                style={status === "closed" ? style : {}}
              >
                Pembelian Dibatalkan
              </Navbar.Link>
              <Navbar.Link
                className="cursor-pointer"
                onClick={() => setStatus("reviewed")}
                style={status === "reviewed" ? style : {}}
              >
                Lihat Penilaian / Review
              </Navbar.Link>
            </Navbar.Collapse>
          </Navbar>
          {orders?.data?.map((car, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <ListCar
                id={car.id}
                image_url={car.image}
                transmission={car.transmission}
                km={car.km}
                location={car.location}
                color={car.color}
                price={car.price}
                year={car.year}
                brand={car.brand_name}
                merk={car.name}
                description={car.description}
                key={index}
                condition={car.condition}
              ></ListCar>
              { status === "pending" ? (
                <Button onClick={() => handleBuy(car.order_id)} className="text-blue m-auto h-10 bg-white">
                  Bayar Sekarang
                </Button>
              ) : (status === "success" ? (car.isReviewed == 0 ? (
                <Button href={`/review/${car.id}`} className="text-blue m-auto h-10 bg-white">
                  Beri Penilaian / Review
                </Button>
              ) : (
                <h1 className="m-auto">Sudah di Review</h1>
              )) : (status === 'error' ? <Button onClick={() => handleBuy(car.order_id)} className="text-blue m-auto h-10 bg-white">
              Bayar Ulang
            </Button> : <h1 className="mt-7 text-red-500 font-bold">Status Pembelian dibatalkan!</h1> ))}
            </div>
          ))}

          {status == "reviewed" ? (
            <section className="m-auto w-full p-8">
              {reviews?.data.length
                ? reviews?.data.map((review, index) => (
                    <>
                      <div key={index} className="flex grid grid-cols-2 gap-4">
                        <ListCar
                          image_url={review.image}
                          transmission={review.transmission}
                          km={review.km}
                          location={review.location}
                          color={review.color}
                          price={review.price}
                          year={review.year}
                          brand={review.brand_name}
                          merk={review.name}
                          description={review.description}
                          key={index}
                          condition={review.condition}
                        ></ListCar>
                        <ReviewCard
                          username={review.user_name}
                          stars={review.star_count}
                          description={review.comment}
                          key={index}
                        ></ReviewCard>
                      </div>
                      <hr className="mt-5"></hr>
                    </>
                  ))
                : "belum ada review"}
            </section>
          ) : (
            ""
          )}
        </Card>
      </LayoutProfile>
    </>
  )
}
