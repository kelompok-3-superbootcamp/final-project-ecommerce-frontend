'use client';

import { Table } from 'flowbite-react';
import useSWR from "swr"
import {useAuthStore} from "@/stores/auth"
import { host } from '@/utils/constant';
import { Pagination } from 'flowbite-react';
import { useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/router";
import axios from 'axios';
import LayoutProfile from '@/components/LayoutProfile';

const fetcher = ([url, header]) => fetch(`${host}${url}`, {headers: header}).then(res => res.json())

export default function Etalase() {
  const {user, logout} = useAuthStore()
  let header = {Authorization: `Bearer ${user?.access_token}`}
  const { data:cars, error:err1, isLoading:is1, mutate } = useSWR([`/cars/based-on-seller`, header], fetcher)
  const handleDelete = (id) => {
    axios.delete(`${host}/cars/${id}`, {headers: header}).then((res)=>{mutate()})
  }
  const router = useRouter()
  const toProd = (id) => {
    router.push(`/car/show/${id}`)
  }

  return (
    <LayoutProfile>
    <div className="w-11/12">
      <h1 className='m-6 ml-16 text-2xl font-bold'>Daftar Penjualan Mobil Anda</h1>
      {cars?.data?.length ?
      <Table hoverable className='mb-8 ml-16'>
        <Table.Head>
          <Table.HeadCell className='p-3'>No.</Table.HeadCell>
          <Table.HeadCell >Merk</Table.HeadCell>
          <Table.HeadCell >Tahun</Table.HeadCell>
          <Table.HeadCell >Kondisi</Table.HeadCell>
          <Table.HeadCell >Kilometer</Table.HeadCell>
          <Table.HeadCell >Transmisi</Table.HeadCell>
          <Table.HeadCell >Harga</Table.HeadCell>
          <Table.HeadCell >
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          { cars?.data?.map((car, index) => (
          <Table.Row onClick={()=>toProd(car.id)} key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {index+1}
            </Table.Cell>
            <Table.Cell class="">{car.brand_name} {car.name}</Table.Cell>
            <Table.Cell >{car.year}</Table.Cell>
            <Table.Cell >{car.condition}</Table.Cell>
            <Table.Cell >{car.km}</Table.Cell>
            <Table.Cell >{car.transmission}</Table.Cell>
            <Table.Cell >Rp {car.price.toLocaleString()}</Table.Cell>
            <Table.Cell >
              <a href={`/car/edit/${car.id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                edit
              </a>
            </Table.Cell>
            <Table.Cell >
          
              <a onClick={()=>handleDelete(car.id)} className="cursor-pointer font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                hapus
              </a>
            </Table.Cell>
          </Table.Row>))}
        </Table.Body>
      </Table> : <h1 className="ml-16">Etalase mu kosong, Jual Mobil mu sekarang juga</h1>}
    </div>
    </LayoutProfile>
  );
}
