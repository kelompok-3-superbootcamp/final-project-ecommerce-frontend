import Cards from "./card"
import LayoutProfile from "./LayoutProfile"
import useSWR, { mutate } from "swr"
import {useAuthStore} from "@/stores/auth"
import { host } from '@/utils/constant';
import { Pagination } from 'flowbite-react';
import { useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/router";
import axios from 'axios';
import { useEffect } from "react";
import { Table } from "flowbite-react";
import { Button } from "flowbite-react";

const fetcher = ([url, header]) => fetch(`${host}${url}`, {headers: header}).then(res => res.json())

export default function Wishlist(){
    // let cars = ["/brio.jpeg", "/fortuner.jpeg", "/omoda.jpeg", "/brio.jpeg","/xenia.jpeg","/sigra.jpeg"]
    // let merk = 'Honda Brio 2024'
    // let desc = 'Rp 334.800.000 - Rp 493.800.000'
    const [wishlists, setWishlists] = useState()
    const { user, logout } = useAuthStore()
    const router = useRouter()
    const toProd = (id) => {
        router.push(`/car/show/${id}`)
      }
  let header = { Authorization: `Bearer ${user?.access_token}` }
    const { data: cars, error: err1, isLoading: is1, mutate } = useSWR([`/wishlists`, header], fetcher)
    const pluck = (arr, key) => arr?.map(i => i[key])

    // useEffect(() => {
    //     console.log(cars)
    //     setWishlists(pluck(cars?.data, "isWishList"))
    //   }, [cars])
    // const save = (index, id) => {
    //     axios.post(`${host}/wishlists`, { car_id: id}, {headers: header})
    //     let newWishlists = [...wishlists]
    //     newWishlists[index] = 1
    //     setWishlists(newWishlists)
    //   }
      const unsave = (index, id) => {
        axios.delete(`${host}/wishlists/${id}`, {headers: header})
        mutate()
        // let newWishlists = [...wishlists]
        // newWishlists[index] = 0
        // setWishlists(newWishlists)
      }
    return (
        <>

    <div className="w-11/12">
      {cars?.data?.length ?
      <Table hoverable className='mb-8 ml-6'>
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell className="pl-0 ml-0">Merk</Table.HeadCell>
          <Table.HeadCell>Tahun</Table.HeadCell>
          <Table.HeadCell>Kondisi</Table.HeadCell>
          <Table.HeadCell>Kilometer</Table.HeadCell>
          <Table.HeadCell>Transmisi</Table.HeadCell>
          <Table.HeadCell>Harga</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          { cars?.data?.map((car, index) => (
          <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {index+1}
            </Table.Cell>
            <Table.Cell class="">{car.brand_name} {car.name}</Table.Cell>
            <Table.Cell onClick={()=>toProd(car.id)}>{car.year}</Table.Cell>
            <Table.Cell onClick={()=>toProd(car.id)}>{car.condition}</Table.Cell>
            <Table.Cell onClick={()=>toProd(car.id)}>{car.km}</Table.Cell>
            <Table.Cell onClick={()=>toProd(car.id)}>{car.transmission}</Table.Cell>
            <Table.Cell onClick={()=>toProd(car.id)}>{car.price}</Table.Cell>
            <Table.Cell >
              <Button onClick={()=>toProd(car.id)} className="w-full">Checkout Now</Button>
            </Table.Cell>
            <Table.Cell >
                  <button className="flex" onClick={() => unsave(index, car.id)}>
                    <svg
                      className="h-6 w-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                    </svg>
                    <h1 className="font-bold">Saved</h1>
                  </button>
              
            </Table.Cell>
          </Table.Row>))}
        </Table.Body>
      </Table> : <h1 className="ml-6 ml-16">Tambahkan Wishlist Mu Sekarang</h1>}
    </div>
        {/* <div className="grid grid-cols-4 gap-4 p-10">
            {cars.slice(0,4).map((car, index) => (
                <Cards imageUrl={car} merk={merk} description={desc} key={index}></Cards>
            ))}
        </div>
        <div className="grid grid-cols-4 gap-4 p-10">
            {cars.slice(4,6).map((car, index) => (
                <div key={index}>
                   <Cards imageUrl={car} merk={merk} description={desc} />
                </div>
            ))}
        </div> */}
        </>
    )
}