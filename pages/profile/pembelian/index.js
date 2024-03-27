"use client"
"use client"

import Link from "next/link"
import { Button, Navbar } from "flowbite-react"
import { useState } from "react"
import { Card } from "flowbite-react"
import LayoutProfile from "@/components/LayoutProfile"
import useSWR from "swr"
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

  return (
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
        {orders?.data?.map((car, index) => (<div key={index} className="flex m-auto"><ListCar
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
        ></ListCar>{status === 'pending' ?
          <Button className="bg-white text-blue h-10 m-auto">Bayar Sekarang</Button>
          : (car.isReviewed == 0 ? <Button href={`/review/${car.id}`} className="bg-white text-blue h-10 m-auto">Beri Penilaian / Review</Button> : <h1 className="m-auto">Sudah di Review</h1>)}
        </div>))}

        {status == 'reviewed' ? <section className="w-4/5 grid grid-cols-2 gap-4 p-8 m-auto">
          {reviews?.data.length ? reviews?.data.map((review, index) => (
            <ReviewCard username={review.user_id} stars={review.star_count} description={review.comment} key={index} />
          )) : "belum ada review"}
        </section> : ''}
      </Card>
    </LayoutProfile>
  )
}
