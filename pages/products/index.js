import ListCar from "@/components/listCar"
import SideFilter from "@/components/sideFilter"
import useSWR from "swr"
import {useAuthStore} from "@/stores/auth"
import { host } from '@/utils/constant';
import { Pagination } from 'flowbite-react';
import { useState } from "react";
import { useSearchParams } from 'next/navigation'

const fetcher = ([url, header]) => fetch(`${host}${url}`, {headers: header}).then(res => res.json())

const Product = () => {
    const {user, logout} = useAuthStore()
    const [currentPage, setCurrentPage] = useState(1);
    const onPageChange = (page, number) => setCurrentPage(page);
    const searchParams = useSearchParams()
    const condition = searchParams.get('condition')
    const transmission = searchParams.get('transmission')
    const type = searchParams.get('type_name')
    let query = ''
    transmission ? query += `transmission=${transmission}` : ""
    condition ? query += `condition=${condition}` : ""
    type ? query += `type_name=${type}` : ""
    let header = {Authorization: `Bearer ${user?.access_token}`}
    const { data:cars, error:err1, isLoading:is1 } = useSWR([`/cars?${query}`, header], fetcher)

    return (
        <div>
        <div className="space-y-4 py-4 flex" id="listcar">
            <section>
                <SideFilter />
            </section>
            <section className="w-4/5 grid grid-cols-2 gap-4">
            {cars?.data?.data?.map((car, index) => (
                <ListCar image_url={'/brio.jpeg'} merk={car.name} description={car.description} key={index}></ListCar>
            ))}

            </section></div>
            <div className="flex overflow-x-auto sm:justify-center m-auto mt-2 mb-4">
      <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} showIcons />
    </div>
        </div>
    )
}

export default Product