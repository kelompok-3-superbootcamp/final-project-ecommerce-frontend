"use client"

import { Card } from "flowbite-react"
import Image from "next/image"
import Link from "next/link"
import LayoutProfile from "../../components/LayoutProfile"
import { useEffect, useState } from "react"
import { host } from "@/utils/constant"
import axios from "axios"
import { useAuthStore } from "@/stores/auth"
import { CiMail, CiPhone, CiChat1 } from "react-icons/ci";
import StarRating from "@/components/StarRating"
import moment from "moment"


export default function UserProfile() {
  const [dataUser, setDataUser] = useState({})
  const [dataReview, setDataReview] = useState([])
  const [listCar, setListCar] = useState([])
  const { user } = useAuthStore()


  useEffect(() => {
    if (user?.access_token) {
      axios.post(`${host}/auth/me`, {}, {
        headers: { Authorization: "Bearer " + user?.access_token },
      }).then(res => {
        setDataUser(res.data.data);
      }).catch(error => {
      })

      axios.get(`${host}/reviews/for-seller`, {
        headers: { Authorization: "Bearer " + user?.access_token },
      }).then(res => {
        setDataReview(res.data.data)
      }).catch(error => {
      })
    }
  }, [user?.access_token])


  useEffect(() => {
    if (dataUser.id) {
      axios.get(`${host}/cars/based-on-profile/${dataUser?.id}`)
        .then(res => {
          setListCar(res.data.data.cars)
        })
    }
  }, [dataUser?.id])


  const averageStar = (dataReview) => {
    let totalStarCount = 0

    dataReview.forEach(review => {
      totalStarCount += review.star_count;
    });

    const rataRata = totalStarCount / dataReview.length;
    return rataRata.toFixed(1);
  }


  return (
    <LayoutProfile>
      <div className="flex flex-wrap space-between mx-auto">
        <Card className="my-4 mx-8 max-w-sm">
          <div className="flex flex-col items-center pb-10">
            <Image
              alt="Daihatsu Bandung"
              height="96"
              src="/download.png"
              width="96"
              className="mb-3 rounded-full shadow-lg"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{dataUser?.name}</h5>
            <span className="flex text-sm text-gray-500 dark:text-gray-400">
              <StarRating rating={averageStar(dataReview)} />
            </span>
            <h1>{averageStar(dataReview)}</h1>
            <div>
              <h5 className="text-md mb-1 mt-8 text-gray-900 dark:text-white">Anggota Sejak {moment(dataUser?.created_at).format("dddd, DD MMMM YYYY")}</h5>
              <h5 className="text-md mb-1 font-medium text-gray-900 dark:text-white">Pengguna terverifikasi dengan :</h5>

              <div className="mt-4 flex space-x-4">
                <CiMail />
                <h1>{dataUser?.email}</h1>
              </div>

              <div className="mt-4 flex space-x-4">
                <CiPhone />
                <h1>{dataUser?.phone_number}</h1>
              </div>

              <div className="mt-4 flex space-x-4">
                <CiChat1 />
                <h1>{dataUser?.phone_number}</h1>
              </div>

            </div>
          </div>
        </Card>
        <Card className="w-1/2  m-4 h-[60vh]">
          <h1 className="text-xl font-medium">Daftar Mobil dari Toko ini</h1>
          <div className="overflow-auto">
            {
              listCar.map(res => {
                return (
                  <Card className="mx-auto mt-5" imgSrc={res.image} horizontal key={res.id}>
                    <Link href={`/car/show/${res.id}`}>
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {res.name}
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400 mt-5">
                        {res.description.substring(0, 50)}
                      </p>
                      <p className="font-normal text-gray-700 dark:text-gray-400 mt-1">
                        Rp. {res.price}
                      </p>

                    </Link>
                  </Card>
                )
              })
            }

          </div>

        </Card>
      </div>
    </LayoutProfile>
  )
}
