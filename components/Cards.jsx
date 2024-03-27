"use client"

import Image from "next/image"
import Link from "next/link"

export default function Cards({ carId, carImage, carName, carPrice, carBrand }) {

  return (
    <Link href={`/car/show/${carId}`} key={carId}>
      <div className="p-4" key={carId}>
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="relative h-48 w-full">
            <Image
              className=""
              src={carImage}
              alt={carName}
              fill
              layout="fill"
              objectfit="cover"
              objectposition="center"
            />
          </div>
          <div className="p-4">
            <h2 className="mb-2 text-lg font-bold text-gray-900">
              {carBrand} {carName}
            </h2>
            <div className="flex flex-wrap justify-between">
              <p className="text-gray-700">Rp.{carPrice.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
