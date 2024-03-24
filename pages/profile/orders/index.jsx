import { Table } from "flowbite-react"
import useSWR from "swr"
import {useAuthStore} from "@/stores/auth"
import { host } from '@/utils/constant';
import { Pagination } from 'flowbite-react';
import { useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/router";
import SideBar from "@/components/sideNavBar"

const fetcher = ([url, header]) => fetch(`${host}${url}`, {headers: header}).then(res => res.json())

const Orderan = () => {
  const {user, logout} = useAuthStore()
  let header = {Authorization: `Bearer ${user?.access_token}`}
  const { data:orders, error:err1, isLoading:is1 } = useSWR([`/orders/seller`, header], fetcher)

  return (
    <div className="flex">
      <SideBar></SideBar>
      <div className="w-full overflow-x-auto">
        <h1 className="m-6 text-2xl font-bold">Daftar Pesanan Masuk</h1>
        {orders?.data.length ?
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Color</Table.HeadCell>
            <Table.HeadCell>Tahun</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Status Pesanan</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {"Honda Brio"}
              </Table.Cell>
              <Table.Cell>Sliver</Table.Cell>
              <Table.Cell>2019</Table.Cell>
              <Table.Cell>$2999</Table.Cell>
              <Table.Cell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Pembeli sudah Membayar lunas, Kirim Mobil mu Sekarang!
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Toyota Agya
              </Table.Cell>
              <Table.Cell>White</Table.Cell>
              <Table.Cell>2019 PC</Table.Cell>
              <Table.Cell>$1999</Table.Cell>
              <Table.Cell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Menunggu Pembayaran dari Pembeli
                </a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        : <h1 className="ml-6">Belum ada pesanan masuk</h1>}
      </div>
    </div>
  )
}

export default Orderan
