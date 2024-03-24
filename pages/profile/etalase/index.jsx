
'use client';

import { Table } from 'flowbite-react';
import useSWR from "swr"
import {useAuthStore} from "@/stores/auth"
import { host } from '@/utils/constant';
import { Pagination } from 'flowbite-react';
import { useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/router";
import SideBar from '@/components/sideNavBar';

const fetcher = ([url, header]) => fetch(`${host}${url}`, {headers: header}).then(res => res.json())

export default function Etalase() {
  const {user, logout} = useAuthStore()
  let header = {Authorization: `Bearer ${user?.access_token}`}
  const { data:cars, error:err1, isLoading:is1 } = useSWR([`/cars/based-on-seller`, header], fetcher)

  return (
    <div className='flex'>
    <SideBar></SideBar>
    <div className="overflow-x-auto w-full">
      <h1 className='m-6 text-2xl font-bold'>Daftar Penjualan Mobil Anda</h1>
      {cars?.data?.length ?
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Color</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {'Honda Brio'}
            </Table.Cell>
            <Table.Cell>Sliver</Table.Cell>
            <Table.Cell>Laptop</Table.Cell>
            <Table.Cell>$2999</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Delete
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Toyota Agya
            </Table.Cell>
            <Table.Cell>White</Table.Cell>
            <Table.Cell>Laptop PC</Table.Cell>
            <Table.Cell>$1999</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Delete
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Toyota Fortuner</Table.Cell>
            <Table.Cell>Black</Table.Cell>
            <Table.Cell>Accessories</Table.Cell>
            <Table.Cell>$99</Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Delete
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table> : <h1 className="ml-6">Etalase mu kosong, Jual Mobil mu sekarang juga</h1>}
    </div>
  </div>
  );
}
