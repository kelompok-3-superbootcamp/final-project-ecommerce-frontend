"use client"

import Link from "next/link"
import { Navbar } from "flowbite-react"
import { useEffect, useState } from "react"
import { Card } from "flowbite-react"
import LayoutProfile from "@/components/LayoutProfile"
import axios from "axios"
import { host } from "@/utils/constant"
import { useAuthStore } from "@/stores/auth"

export default function Pembelian() {
  const { user } = useAuthStore()
  const [status, setStatus] = useState("pending")

  const [orders, setOrders] = useState({
    refetch: true,
    data: [],
  })

  useEffect(() => {
    if (orders.refetch) {
      axios
        .get(`${host}/orders/user/${status}`, {
          headers: {
            Authorization: `Bearer ${user?.access_token}`,
          },
        })
        .then(res => {
          setOrders({
            refetch: false,
            data: res.data.data,
          })

          console.log(res.data.data)
        })
        .catch(err => console.log(err))
    }
  }, [orders, user])

  return (
    <LayoutProfile>
      <Card className="m-auto my-8">
        <Navbar fluid rounded className="mx-auto mt-8 items-center">
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link className="cursor-pointer">Menunggu Pembayaran</Navbar.Link>
            <Navbar.Link className="cursor-pointer">Di Kirim (Towing)</Navbar.Link>
            <Navbar.Link className="cursor-pointer">Pembayaran Gagal</Navbar.Link>
            <Navbar.Link className="cursor-pointer">Pembelian Dibatalkan</Navbar.Link>
            <Navbar.Link className="cursor-pointer" onClick={() => setStatus("waitin")}>
              Beri Penilaian / Review
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
        <Card className="m-auto" imgSrc={"/brio.jpeg"} horizontal>
          <Link href={"/car/show/1"}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Honda Brio</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <br></br>
              Say Carmudi.co.id for the best deal MAZDA 2 S AT 2011 HIJAU KM PAJAK PANJANG KM RENDAH
            </p>
          </Link>
        </Card>
        <Card className="m-auto" imgSrc={"/brio.jpeg"} horizontal>
          <Link href={"/car/show/1"}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Honda Brio</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <br></br>
              Say Carmudi.co.id for the best deal MAZDA 2 S AT 2011 HIJAU KM PAJAK PANJANG KM RENDAH
            </p>
          </Link>
        </Card>
      </Card>
    </LayoutProfile>
  )
}
