
'use client';

import { Label, Textarea } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { useAuthStore } from "@/stores/auth"
import { Rate } from 'antd';
import ListCar from "../../components/listCar"
import { useRouter } from "next/router"
import axios from "axios"
import useSWR from "swr"
import { useParams } from 'next/navigation';
import { host } from "@/utils/constant"
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';

const fetcher = ([url, header]) => fetch(`${host}${url}`, { headers: header }).then(res => res.json())

export default function Review() {
  const formRef = useRef()
  const [stars, setStars] = useState()
  const { user, logout } = useAuthStore()
  const router = useRouter()
  let header = { Authorization: `Bearer ${user?.access_token}` }
  const param = useParams()
  // console.log("id :", param?.id)
  const { data: car, error: err1, isLoading: is1 } = useSWR([`/cars/${param?.id}`, header], fetcher)
  // console.log("mobi :", car)
  // console.log("star :", stars)
  const handleSubmit = (e) => {
    e.preventDefault()
    let {
      comment: { value: comment }
    } = formRef.current
    let body = { comment, car_id: param?.id, star_count: stars}
    console.log('bodinya',body)
    axios.post(`${host}/reviews`, body, {headers: header}).then((res)=>{Swal.fire({
      icon: "success",
      title: "Logout Berhasil",
      text: "Beralih ke halaman utama dalam 5 detik",
      timer: 5000,
    }).then(response => {
      if (response.isDismissed) {
        router.push("/home")
      } else if (response.isConfirmed) {
        router.push("/home")
      }
    })}).catch((err)=>{console.log(err)})
  }
  return (
    <form onSubmit={handleSubmit} ref={formRef} className="flex max-w-xl flex-col gap-4 m-auto p-8">
        <h1 className='m-auto font-bold text-2xl'>Selamat Mobil mu dah sampai, Review yuk!</h1>
        { car ? <ListCar
                id={car.data.id}
                image_url={car.data.image}
                transmission={car.data.transmission}
                km={car.data.km}
                location={car.data.location}
                color={car.data.color}
                price={car.data.price}
                year={car.data.year}
                brand={car.data.brand_name}
                merk={car.data.name}
                description={car.data.description}
                condition={car.data.condition}
              ></ListCar> : "" }
        <div className="block">
        <Label htmlFor="description" value="Kualitas Mobil" />
      </div>
        <Rate value={stars} onChange={(e)=>setStars(e)}/>
      <div className=" block">
        <Label htmlFor="description" value="Berikan Penilaianmu terkait Mobil ini" />
      </div>
      <Textarea id="comment" name='comment' placeholder="Bagikan penilaianmu dan bantu Pengguna lain membuat pilihan yang lebih baik" required rows={4} />

      <input type='submit' value="Kirim Review mu sekarang" className='cursor-pointer bg-slate-600 text-white font-bold p-2 rounded-lg'/>
    </form>
  );
}
