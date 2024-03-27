"use client"

import { Card } from "flowbite-react"
import Link from "next/link"
import Image from "next/image"
import { IoMdColorPalette, IoIosSpeedometer } from "react-icons/io"
import { GiGearStickPattern } from "react-icons/gi"
import { FaLocationDot, FaCarOn, FaCalendar, FaHeart } from "react-icons/fa6"
import { limitString } from "../src/utils/strhelper"

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
  condition,
}) {
  return (
    <Link href={`/car/show/${id}`}>
      <div className="rounded-t-lg max-h-56 bg-white px-3 pt-6 flex h-full">
        <Image className="rounded-lg max-h-52 min-w-40 2xl:min-w-48" src={image_url} alt="gambar" width={200} height={10}/>
        <div className="text-wrap w-full px-3 items-center">
        <h5 className="min-h-8 mb-2 text-xl lg:text-2xl 2xl:text-4xl font-bold text-gray-900 dark:text-white">
          {brand} {merk} {year}
        </h5>
        <div className="font-normal text-gray-700 dark:text-gray-400 2xl:text-2xl lg:text-base text-sm">
          <div className="flex justify-between space-x-2">
            <div>
              <div className="flex"><FaLocationDot className="mr-2 mt-1"/> {location}</div>
              <div className="flex"><IoMdColorPalette className="mr-2 mt-1" />warna {color}</div>
              <div className="flex"><IoIosSpeedometer className="mr-2 mt-1"/> {km?.toLocaleString()} km</div>
            </div>
            <div>
              <div className="flex"><GiGearStickPattern className="mr-2 mt-1"/> {transmission}</div>
              <div className="flex"><FaCarOn className="mr-2 mt-1"/>mobil {condition}</div>
            </div>
          </div>
          {limitString(description, 40)}
        </div>
        <div className="flex mt-2">
          <h1 className="w-11/12 text-lg font-bold 2xl:text-3xl">Rp {price?.toLocaleString()}</h1>
        </div>
        </div>
      </div>
    </Link>
  )
}
