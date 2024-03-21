"use client"

import Image from "next/image"
import Link from "next/link"

export default function Cards({ carId, carImage, carName, carPrice }) {
  return (
    <Link href={`/car/show/${carId}`} key={carId}>
    <div className="p-4" key={carId}>
      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="relative h-48 w-full">
          <Image className="" src={carImage} alt={carName} fill layout="fill" objectfit="cover" objectposition="center" />
        </div>
        <div className="p-4">
          <h2 className="mb-2 text-lg font-bold text-gray-900">{carName}</h2>
          <p className="text-gray-700">Rp.{carPrice}</p>
        </div>
      </div>
    </div>
    </Link>
  )
}
