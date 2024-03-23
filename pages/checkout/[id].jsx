import { useAuthStore } from "@/stores/auth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button } from "flowbite-react"
import { host } from "@/utils/constant"
import axios from "axios"
import Swal from "sweetalert2"

const Checkout = () => {
  const router = useRouter()
  const { id } = router.query
  const [orderData, setOrderData] = useState({})
  const [carDetail, setCarDetail] = useState(null)
  const { user } = useAuthStore()

  useEffect(() => {
    if (!id) {
      return
    }
    axios
      .get(`${host}/orders/${id}`, {
        headers: { Authorization: "Bearer " + user.access_token },
      })
      .then(res => {
        setTest(true)
        setOrderData(res.data.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [id])

  useEffect(() => {
    if (orderData.id) {
      axios
        .get(`${host}/cars/${orderData.car_id}`)
        .then(res => {
          setCarDetail(res.data.data)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [orderData.id])

  const handleBuy = () => {
    axios
      .post(`${host}/orders/checkout/${id}`, 
      {},
      {
        headers: { Authorization: "Bearer " + user.access_token },
      })
      .then(res => {
        Swal.fire({
          title: "Apakah kamu yakin?",
          text: `Pastikan kamu membayarnya dalam waktu 24 jam`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, pergi membayar!",
        }).then(result => {
          if (result.isConfirmed) {
            window.open(`${res.data.data}`)
          }
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div id="checkout" className="min-h-[60vh] pt-6">
      <section className="h-14 w-full bg-slate-100">
        <div className="m-auto flex w-2/3 justify-between pt-4 font-semibold">
          <h1>{carDetail?.name}</h1>
          <h1>Rp {carDetail?.price}</h1>
        </div>
      </section>
      <div className="m-auto grid w-2/3 grid-cols-1 bg-white p-8 md:grid-cols-2">
        <figure>
          <img src={carDetail?.image} alt={carDetail?.name} width={"350px"} />
        </figure>
        <div>
          <h1 className="text-3xl font-semibold">Beli Aman & Terpercaya dengan SanberCar</h1>
          <h1 className="mt-6 text-xl font-semibold">Pesan Mobil Ini</h1>
          <figcaption className="mr-16">
            <div className="mt-6 flex justify-between">
              <p>Brand :</p>
              <p>{carDetail?.brand_name}</p>
            </div>
            <hr></hr>
            <div className="flex justify-between">
              <p>Merk :</p>
              <p>{carDetail?.name}</p>
            </div>
            <hr></hr>
            <div className="flex justify-between">
              <p>Harga :</p>
              <p>{carDetail?.price}</p>
            </div>
            <hr></hr>
            <div className="flex justify-between">
              <p>Kondisi :</p>
              <p>{carDetail?.condition}</p>
            </div>
            <hr></hr>
            <div className="flex justify-between">
              <p>Tahun :</p>
              <p>{carDetail?.year}</p>
            </div>
            <hr></hr>
            <div className="flex justify-between">
              <p>Transmisi :</p>
              <p>{carDetail?.transmission}</p>
            </div>
            <hr></hr>
            <div className="flex justify-between">
              <p>Warna :</p>
              <p>{carDetail?.color}</p>
            </div>
            <hr></hr>
            <div className="flex justify-between">
              <p>Tipe :</p>
              <p>{carDetail?.type_name}</p>
            </div>
            <hr></hr>
            <div className="flex justify-between">
              <p>Kilometer :</p>
              <p>{carDetail?.km} KM</p>
            </div>
            <hr></hr>
            <div className="flex justify-between">
              <p>Lokasi :</p>
              <p>{carDetail?.location}</p>
            </div>
            <hr></hr>
            <div className="flex justify-between">
              <p>Stok :</p>
              <p>{carDetail?.stock}</p>
            </div>
            <hr></hr>
            {/* <p>Voucher</p>
            <hr></hr> */}
          </figcaption>
          <Button type="primary" className="mt-6" onClick={() => handleBuy()}>
            Beli
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
