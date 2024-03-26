import { useEffect, useState } from "react"
import Cards from "./Cards"
import axios from "axios"
import Slider from "react-slick"
import { host } from "@/utils/constant"

export default function Grid() {
  const [newCars, setNewCars] = useState([])
  const [secondCars, setSecondCars] = useState([])
  const [fetchStatus, setFetchStatus] = useState(true)

  var settings = {
    dots: true,
    infinite: false,
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
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  }

  useEffect(() => {
    if (fetchStatus === true) {
      axios
        .get(`${host}/cars`, { params: { condition: "baru" } })
        .then(response => {
          setNewCars([...response.data.data.data])
        })
        .catch(error => {
          console.error(error)
        })
      axios
        .get(`${host}/cars`, { params: { condition: "bekas" } })
        .then(response => {
          setSecondCars([...response.data.data.data])
        })
        .catch(error => {
          console.error(error)
        })
      setFetchStatus(false)
    }
  }, [fetchStatus, setFetchStatus])

  return (
    <div className="container mx-auto">
      <div className="space-y-7 px-5 pt-10 text-4xl font-semibold">
        <h1>Mobil Terbaru</h1>
      </div>

      <div className="mx-auto mb-10">
        <Slider {...settings}>
          {newCars.map(car => (
            <div key={car.id}>
              <Cards carId={car.id} carName={car.name} carPrice={car.price} carImage={car.image} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="space-y-7 px-5 pt-10 text-4xl font-semibold">
        <h1>Mobil Bekas</h1>
      </div>
      <div className="mx-auto mb-10">
        <Slider {...settings}>
          {secondCars.map(car => (
            <div key={car.id}>
              <Cards carId={car.id} carName={car.name} carPrice={car.price} carImage={car.image} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
