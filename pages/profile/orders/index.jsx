import { Table } from "flowbite-react"
import useSWR from "swr"
import {useAuthStore} from "@/stores/auth"
import { host } from '@/utils/constant';
import { Pagination } from "flowbite-react"
import LayoutProfile from "@/components/LayoutProfile"
import { useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/router";

const fetcher = ([url, header]) => fetch(`${host}${url}`, {headers: header}).then(res => res.json())

const Orderan = () => {
  const {user, logout} = useAuthStore()
  let header = {Authorization: `Bearer ${user?.access_token}`}
  const { data:orders, error:err1, isLoading:is1 } = useSWR([`/orders/seller`, header], fetcher)

  return (
    <LayoutProfile>
      <h1 className="font-bold text-4xl mb-8 m-6 ml-16">Daftar Pesanan Masuk</h1>
      <div className="w-11/12">
      {orders?.data?.length ?
      <Table hoverable className='mb-8 m-6 ml-16'>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell className="pl-0 ml-0">Merk</Table.HeadCell>
          <Table.HeadCell>Kondisi</Table.HeadCell>
          <Table.HeadCell>Transmisi</Table.HeadCell>
          <Table.HeadCell>Harga</Table.HeadCell>
          <Table.HeadCell>Status pesanan</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          { orders?.data?.map((car, index) => (
          <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {index+1}
            </Table.Cell>
            <Table.Cell className="">{car.brand_name} {car.name}</Table.Cell>
            <Table.Cell onClick={()=>toProd(car.id)}>{car.condition}</Table.Cell>
            <Table.Cell onClick={()=>toProd(car.id)}>{car.transmission}</Table.Cell>
            <Table.Cell onClick={()=>toProd(car.id)}>Rp {car.price.toLocaleString()}</Table.Cell>
            <Table.Cell onClick={()=>toProd(car.id)}>{car.payment_status}</Table.Cell>            
          </Table.Row>))}
        </Table.Body>
      </Table> : <h1 className="ml-16">Tambahkan Wishlist Mu Sekarang</h1>}
    </div>
    </LayoutProfile>
  )
}

export default Orderan
