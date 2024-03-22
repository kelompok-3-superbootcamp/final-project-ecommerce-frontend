import axios from "axios"
// import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Slider from "react-slick"
import { IoMdColorPalette, IoIosSpeedometer } from "react-icons/io"
import { GiGearStickPattern } from "react-icons/gi"
import { FaLocationDot, FaCarOn, FaCalendar, FaHeart } from "react-icons/fa6"

const Car = () => {
  const router = useRouter()
  const id = router.query.id
  const [carDetail, setCarDetail] = useState([])
  const [fetchStatus, setFetchStatus] = useState(true)
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  useEffect(() => {
    if (id) {
      if (fetchStatus === true) {
        axios
          .get(`http://127.0.0.1:8000/api/cars/${id}`)
          .then(response => {
            setCarDetail([response.data.data])
          })
          .catch(error => {
            console.error(error)
          })
        setFetchStatus(false)
      }
    }
  }, [fetchStatus, setFetchStatus, id])

  return (
    <div className="bg-slate-200">
      {carDetail.map(res => {
        return (
          <div className="container mx-auto pb-12 pt-12" key={res.id}>
            <div className="container mx-auto px-5 py-24" style={{ cursor: "auto" }}>
              <div className="mx-auto flex flex-wrap lg:w-4/5">
                <img
                  alt="ecommerce"
                  className="h-64 w-full rounded object-cover object-center lg:h-auto lg:w-1/2"
                  src={res.image}
                  style={{ cursor: "auto" }}
                />
                <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10" style={{ cursor: "auto" }}>
                  <h1 className="title-font mb-1 text-3xl font-medium text-gray-900" style={{ cursor: "auto" }}>
                    {res.name}
                  </h1>

                  <p className="leading-relaxed">{res.description}</p>

                  <div className="flex">
                    <span className="title-font text-2xl font-medium text-gray-900">Rp.{res.price}</span>
                  </div>
                  <div className="flex mt-5 justify-between">
                    <button className="flex rounded border-0 bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none">
                      Beli sekarang
                    </button>
                    <button className="flex rounded border-0 bg-green-500 px-6 py-2 text-white hover:bg-green-600 focus:outline-none">
                      WhatsApp
                    </button>
                    <button className="flex rounded border-0 bg-purple-500 px-6 py-2 text-white hover:bg-purple-600 focus:outline-none">
                      Telepon
                    </button>
                    <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border-0 bg-gray-200 p-0 text-gray-500">
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mx-auto my-10">
                <Slider {...settings}>
                  <div className="bg-white p-10 text-center">
                    <div className="mx-auto flex justify-center">
                      <IoMdColorPalette />
                    </div>
                    <h3 className="md:text-md pt-2 font-semibold sm:text-sm lg:text-lg">Warna</h3>
                    <p>{res.color}</p>
                  </div>
                  <div className="bg-white p-10 text-center">
                    <div className="mx-auto flex justify-center">
                      <GiGearStickPattern />
                    </div>
                    <h3 className="md:text-md pt-2 font-semibold sm:text-sm lg:text-lg">Transmisi</h3>
                    <p>{res.transmission}</p>
                  </div>
                  <div className="bg-white p-10 text-center">
                    <div className="mx-auto flex justify-center">
                      <FaLocationDot />
                    </div>
                    <h3 className="md:text-md pt-2 font-semibold sm:text-sm lg:text-lg">Lokasi</h3>
                    <p>{res.location}</p>
                  </div>
                  <div className="bg-white p-10 text-center">
                    <div className="mx-auto flex justify-center">
                      <FaCarOn />
                    </div>
                    <h3 className="md:text-md pt-2 font-semibold sm:text-sm lg:text-lg">Kondisi</h3>
                    <p>{res.condition}</p>
                  </div>
                  <div className="bg-white p-10 text-center">
                    <div className="mx-auto flex justify-center">
                      <FaCalendar />
                    </div>
                    <h3 className="md:text-md pt-2 font-semibold sm:text-sm lg:text-lg">Year</h3>
                    <p>{res.year}</p>
                  </div>
                  <div className="bg-white p-10 text-center">
                    <div className="mx-auto flex justify-center">
                      <IoIosSpeedometer />
                    </div>
                    <h3 className="md:text-md pt-2 font-semibold sm:text-sm lg:text-lg">Kilometer</h3>
                    <p>{res.km}</p>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Car
