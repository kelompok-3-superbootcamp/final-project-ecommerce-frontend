import ListCar from "@/components/listCar"
import SideFilter from "@/components/sideFilter"
import useSWR from "swr"
import {useAuthStore} from "@/stores/auth"
import { host } from '@/utils/constant';
import { Pagination } from 'flowbite-react';
import { useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/router";

const fetcher = ([url, header]) => fetch(`${host}${url}`, {headers: header}).then(res => res.json())

const Product = () => {
    const {user, logout} = useAuthStore()
    const [currentPage, setCurrentPage] = useState(1);
    const searchParams = useSearchParams()
    const router = useRouter()

    let queries = [
        'brand_name',
        'name',
        'min_year',
        'max_year',
        'min_price',
        'max_price',
        'transmission',
        'condition',
        'min_km',
        'max_km',
        'type_name',
        'location',
        'price_range',
        'order_by',
        'page'
      ]
    
    let paramss = []
    queries.forEach((value) => {
        if (searchParams.get(value)) {
            paramss.push(value + '=' + searchParams.get(value))
        }})
    // const condition = searchParams.get('condition')
    // const transmission = searchParams.get('transmission')
    // const type = searchParams.get('type_name')
    paramss = paramss.join('&')
    // let query = []
    // transmission ? query.push(`transmission=${transmission}`) : ""
    // condition ? query.push(`condition=${condition}`) : ""
    // type ? query.push(`type_name=${type}`) : ""
    // query.push('order_by=asc')
    // query = query.join('&')
    // console.log('queri:', query)
    let header = {Authorization: `Bearer ${user?.access_token}`}
    const { data:cars, error:err1, isLoading:is1 } = useSWR([`/cars?${paramss}`, header], fetcher)
    const onPageChange = (page, number) => {
        console.log('paramsssnya', paramss)
        paramss = paramss.split("&")
        if (paramss.length > 1) {
        paramss.pop()
            
        }
    paramss = paramss.join('&')
    router.push(`/products?${paramss}&page=${page}`)
    }
    return (
        <div>
        <div className="space-y-4 py-14 flex" id="listcar">
            <section className="w-1/4">
                <SideFilter />
            </section>
            <section className="w-3/4 grid row-start-auto grid-cols-2 grid-rows-6 gap-5 pr-5">
            {cars?.data?.data?.map((car, index) => (
                <ListCar image_url={'/brio.jpeg'} merk={car.name} description={car.description} key={index}></ListCar>
            ))}

            </section></div>
            <div className="flex overflow-x-auto sm:justify-center m-auto mt-2 mb-4">
      <Pagination currentPage={cars ? cars.data.current_page : 0} totalPages={cars ? Math.ceil(cars.data.total/10) : 0} onPageChange={onPageChange} showIcons />
    </div>
        </div>
    )
}

export default Product