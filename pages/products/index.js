import ListCar from "@/components/ListCar"
import SideFilter from "@/components/SideFilter"
import useSWR from "swr"
import { useAuthStore } from "@/stores/auth"
import { host } from "@/utils/constant"
import { Pagination } from "flowbite-react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useEffect } from "react"
import axios from "axios"
// import { headers } from "next/headers"

const fetcher = ([url, header]) => fetch(`${host}${url}`, { headers: header }).then(res => res.json())

const Product = () => {
  const { user, logout } = useAuthStore()
  const [currentPage, setCurrentPage] = useState(1)
  const searchParams = useSearchParams()
  const router = useRouter()

  let queries = [
    "brand_name",
    "name",
    "min_year",
    "max_year",
    "min_price",
    "max_price",
    "transmission",
    "condition",
    "min_km",
    "max_km",
    "type_name",
    "location",
    "price_range",
    "order_by",
    "page",
  ]

  let paramss = []
  queries.forEach(value => {
    if (searchParams.get(value)) {
      paramss.push(value + "=" + searchParams.get(value))
    }
  })
  // const condition = searchParams.get('condition')
  // const transmission = searchParams.get('transmission')
  // const type = searchParams.get('type_name')
  paramss = paramss.join("&")
  // let query = []
  // transmission ? query.push(`transmission=${transmission}`) : ""
  // condition ? query.push(`condition=${condition}`) : ""
  // type ? query.push(`type_name=${type}`) : ""
  // query.push('order_by=asc')
  // query = query.join('&')
  // console.log('queri:', query)
  let header = { Authorization: `Bearer ${user?.access_token}` }
  const { data: cars, error: err1, isLoading: is1 } = useSWR([`/cars?${paramss}`, header], fetcher)
  const [wishlists, setWishlists] = useState()
  const pluck = (arr, key) => arr?.map(i => i[key])
  useEffect(() => {
    setWishlists(pluck(cars?.data?.data, "isWishList"))
  }, [cars])
  console.log(wishlists)
  const onPageChange = (page, number) => {
    console.log("paramsssnya", paramss)
    paramss = paramss.split("&")
    if (paramss.length > 1) {
      paramss.pop()
    }
    paramss = paramss.join("&")
    router.push(`/products?${paramss}&page=${page}`)
  }
  const save = (index, id) => {
    axios.post(`${host}/wishlists`, { car_id: id}, {headers: header})
    let newWishlists = [...wishlists]
    newWishlists[index] = 1
    setWishlists(newWishlists)
  }
  const unsave = (index, id) => {
    axios.delete(`${host}/wishlists/${id}`, {headers: header})
    let newWishlists = [...wishlists]
    newWishlists[index] = 0
    setWishlists(newWishlists)
  }
  return (
    <div>
      <h1 id="title" className="px-6 py-4 text-4xl font-bold">
        Pusat Jual Beli Mobil Online di Indonesia
      </h1>
      <div className="flex space-y-4 py-2 pb-4" id="listcar">
        <section className="w-1/4">
          <SideFilter />
        </section>
        <section className="row-start-auto grid w-3/4 grid-cols-2 grid-rows-5 gap-5 pr-5">
          {cars?.data?.data?.map((car, index) => (
            <div key={index}>
              <ListCar
                id={car.id}
                image_url={car.image}
                transmission={car.transmission}
                km={car.km}
                location={car.location}
                color={car.color}
                price={car.price}
                year={car.year}
                brand={car.brand_name}
                merk={car.name}
                description={car.description}
                key={index}
                condition={car.condition}
              ></ListCar>
              <div className="w-full bg-white p-1">
                { wishlists && wishlists[index] ? (
                  <button className="ml-20 flex" onClick={() => unsave(index, car.id)}>
                    <svg
                      className="h-6 w-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                    </svg>
                    <h1 className="font-bold">Saved</h1>
                  </button>
                ) : (
                  <button className="ml-20 flex" onClick={() => save(index, car.id)}>
                    <svg
                      className="h-6 w-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                      />
                    </svg>
                    <h1 className="font-bold">Save</h1>
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
      <div className="m-auto mb-4 mt-2 flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={cars ? cars.data.current_page : 0}
          totalPages={cars ? Math.ceil(cars.data.total / 10) : 0}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
  )
}

export default Product
