"use client"

import { Card } from "flowbite-react"
import Link from "next/link"
import Image from "next/image"
import { IoMdColorPalette, IoIosSpeedometer } from "react-icons/io"
import { GiGearStickPattern } from "react-icons/gi"
import { FaLocationDot, FaCarOn, FaCalendar, FaHeart } from "react-icons/fa6"

export default function ListCar({
  id,
  km,
  transmission,
  location,
  color,
  price,
  year,
  image_url,
  merk,
  description,
  brand,
  condition
}) {
  return (
    <Link href={`/car/show/${id}`}>
      <div className="rounded-t-lg max-h-56 bg-white px-6 pt-6 flex h-full">
        <Image className="rounded-lg max-h-52 2xl:min-w-48" src={image_url} alt="gambar" width={200} height={10}/>
        <div className="text-wrap w-full px-3 items-center">
        <h5 className="min-h-8 mb-2 text-2xl 2xl:text-4xl font-bold text-gray-900 dark:text-white">
          {brand} {merk} {year}
        </h5>
        <div className="font-normal text-gray-700 dark:text-gray-400 flex 2xl:text-2xl">
          {location}
          <br></br>
          <div className="flex"><IoMdColorPalette className="mr-2 mt-1" />warna {color}</div>
          <br></br>
          {km?.toLocaleString()} km <br></br>
          {description}
          <br></br>
          {/* Say Carmudi.co.id for the best deal MAZDA 2 S AT 2011 HIJAU KM PAJAK PANJANG KM RENDAH */}
        </div>
        <div className="flex mt-2">
          <h1 className="w-11/12 text-lg font-bold">Rp {price?.toLocaleString()}</h1>
        </div>
        </div>
      </div>
    </Link>
  )
}
