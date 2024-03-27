"use client"

import { Card } from "flowbite-react"
import Link from "next/link"
import Image from "next/image"

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
      <div className="flex h-full max-h-56 rounded-t-lg bg-white px-6 pt-6">
        <img className="max-h-52 rounded-lg" src={image_url} alt="gambar" width={180} height={10} />
        <div className="w-full items-center text-wrap px-3">
          <h5 className="mb-2 min-h-16 text-2xl font-bold text-gray-900 dark:text-white">
            {brand} {merk}
            <br></br>
            {year}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {location}
            <br></br>
            warna {color}
            <br></br>
            {km?.toLocaleString()} km <br></br>
            <span className="line-clamp-2">{description}</span>
            <br></br>
            {/* Say Carmudi.co.id for the best deal MAZDA 2 S AT 2011 HIJAU KM PAJAK PANJANG KM RENDAH */}
          </p>
          <div className="mt-2 flex">
            <h1 className="w-11/12 text-lg font-bold">Rp {price?.toLocaleString()}</h1>
          </div>
        </div>
      </div>
    </Link>
  )
}
