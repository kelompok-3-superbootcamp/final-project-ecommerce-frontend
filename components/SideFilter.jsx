"use client"

import { Label, Select, TextInput } from "flowbite-react"
import { useRef } from "react"
import { useAuthStore } from "@/stores/auth"
import { host } from "@/utils/constant"
import useSWR from "swr"
import axios from "axios"
import { useRouter } from "next/router"

const fetcher = ([url, header]) => fetch(`${host}${url}`, { headers: header }).then(res => res.json())

export default function SideFilter() {
  const router = useRouter()
  const formRef = useRef()
  const { user, logout } = useAuthStore()
  let header = { Authorization: `Bearer ${user?.access_token}` }
  const { data: brands, error: err1, isLoading: is1 } = useSWR(["/brands", header], fetcher)
  const { data: types, error: err2, isLoading: is2 } = useSWR(["/types", header], fetcher)
  const handleSubmit = (e) => {
    e.preventDefault()
    let {
      brand_name: { value: brand_name },
      name: { value: name },
      min_year: { value: min_year },
      max_year: { value: max_year },
      min_price: { value: min_price },
      max_price: { value: max_price },
      transmission: { value: transmission },
      condition: { value: condition },
      min_km: { value: min_km },
      max_km: { value: max_km },
      type_name: { value: type_name },
      location: { value: location },
      price_range: { value: price_range },
      order_by: { value: order_by }
    } = formRef.current

    let query = {
      brand_name,
      name,
      min_year,
      max_year,
      min_price,
      max_price,
      transmission,
      condition,
      min_km,
      max_km,
      type_name,
      location,
      price_range,
      order_by,
    }

    let queries = []

    for (let key in query) {
      if (query[key]) {
        queries.push(key + '=' + query[key]);
      }
    }

    queries = queries.join('&')

    console.log("bodi", queries)

    router.push(`/products?${queries}`)
  }
  return (
    <form onSubmit={handleSubmit} ref={formRef} className="mt-4 rounded-lg space-y-1">
      <div className="mx-6 rounded-t-lg p-2 2xl:p-4 text-white font-bold 2xl:text-2xl" style={{ backgroundColor: "#01253D" }}>
        Cari Mobil
      </div>
      <div className="mx-6 rounded-b-lg bg-white px-2 2xl:px-4 pb-8 space-y-1">
        <div className="mb-2 block">
          <Label className="" htmlFor="countries" value="Brand" />
        </div>
        <Select id="brand" name="brand_name" className="">
          <option className="" value={''}>Pilih Brand</option>
          {brands?.data?.map((item, index) => (
            <option className="" key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </Select>
        <div className="mb-2 block">
          <Label htmlFor="countries" value="Merk" />
        </div>
        <TextInput id="base" type="text" sizing="md" name="name" placeholder="Cari Merk" />
        <div className="mb-2 block">
          <Label htmlFor="countries" value="Transmisi" />
        </div>
        <Select name="transmission" id="countries">
          <option value={''}>Pilih Transmisi</option>
          <option value={"automatic"}>Automatic</option>
          <option value={"manual"}>Manual</option>
        </Select>
        <div className="mb-2 block">
          <Label htmlFor="countries" value="Harga" />
        </div>
        <div className="flex space-x-1">
          <TextInput id="base" type="number" sizing="md" name="min_price" placeholder="0"/>
          <h1 className="mt-1.5">s/d</h1>
          <TextInput id="base" type="number" sizing="md" name="max_price" placeholder="1.000.000.000"/>
        </div>
        <div className="mb-2 block">
          <Label htmlFor="countries" value="Kondisi" />
        </div>
        <Select id="countries" name="condition">
          <option value={''}>Pilih Kondisi</option>
          <option value={'bekas'}>Bekas</option>
          <option value={'baru'}>Baru</option>
        </Select>
        <div className="mb-2 block">
          <Label htmlFor="countries" value="Kilometer" />
        </div>
        <div className="flex space-x-1">
          <TextInput  id="base" type="number" sizing="md" name="min_km" placeholder="0"/>
          <h1 className="mt-1.5">s/d</h1>
          <TextInput  id="base" type="number" sizing="md" name="max_km" placeholder="1.000.000.000"/>
        </div>
        <div className="mb-2 block">
          <Label htmlFor="countries" value="Tipe" />
        </div>
        <Select id="type" name="type_name">
          <option value={''}>Pilih Tipe</option>
          {types?.data?.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </Select>
        <div className="mb-2 block">
          <Label htmlFor="countries" value="Tahun" />
        </div>
        <div className="flex space-x-1">
          <TextInput  id="base" type="number" sizing="md" name="min_year" placeholder=""/>
          <h1 className="mt-1.5">s/d</h1>
          <TextInput  id="base" type="number" sizing="md" name="max_year" placeholder="2024"/>
        </div>
        <div className="mb-2 block">
          <Label htmlFor="countries" value="Lokasi" />
        </div>
        <TextInput id="base" type="text" sizing="md" name="location" placeholder="Cari Lokasi" />
        <div className="mb-2 block">
          <Label htmlFor="countries" value="Urut berdasarkan" />
        </div>
        <Select name="price_range" id="countries">
          <option value={"termurah"}>Harga Termurah</option>
          <option value={"termahal"}>Harga Termahal</option>
        </Select>
        <Select name="order_by" id="countries">
          <option value={"terbaru"}>Terbaru</option>
          <option value={"terlama"}>Terlama</option>
        </Select>

        <input
          // disabled={beginUpload ? true : false}
          className="w-full cursor-pointer rounded bg-slate-900 p-2 font-bold text-white"
          type="submit"
          // value={beginUpload ? "Loading..." : "Jual Sekarang"}
        />
      </div>
    </form>
  )
}
