import { useAuthStore } from "@/stores/auth"
import { useRouter } from "next/router"
import { Input, Space } from "antd"
import { Button } from "flowbite-react"
import { host } from "@/utils/constant"
import axios from "axios"
import Swal from "sweetalert2"
import { useState } from "react"

export async function getServerSideProps(ctx) {
  const responseOrder = await axios.get(`${host}/orders/${ctx.query.id}`)
  const responseCarDetail = await axios.get(`${host}/cars/${responseOrder.data.data.car_id}`)

  return {
    props: {
      orderDetail: responseOrder.data.data,
      carDetail: responseCarDetail.data.data,
    },
  }
}

const Checkout = ({ orderDetail, carDetail }) => {
  const router = useRouter()
  const { id } = router.query
  const { user } = useAuthStore()

  const [totalPrice, setTotalPrice] = useState(carDetail.price)
  const [voucherErr, setVoucherErr] = useState(null)

  const [voucherCode, setVoucherCode] = useState("")
  const [voucherId, setVoucherId] = useState(null)

  const [isVerify, setIsVerify] = useState(false)

  const handleBuy = () => {
    axios
      .post(
        `${host}/orders/checkout/${id}`,
        voucherId
          ? {
            voucher_id: voucherId,
          }
          : {},
        {
          headers: { Authorization: "Bearer " + user.access_token },
        },
      )
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
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: error?.response.data.message ?? "Checkout gagal",
        })
        console.error(error)
      })
  }

  const handleVerifyVoucher = async () => {
    setIsVerify(true)

    try {
      const response = await axios.post(`${host}/vouchers/verify`, {
        voucher_code: voucherCode,
        order_id: orderDetail.id,
      })

      console.log(response.data.data)
      setVoucherErr(null)

      setVoucherId(response.data.data.voucher.id)
      setTotalPrice(response.data.data.total_price)
    } catch (err) {
      setVoucherErr(err.response.data.message ?? "Voucher error")
      console.log(err)
    }

    setIsVerify(false)
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
            <div className="py-4">
              <div className="mb-4">
                <h1 className="text-lg font-bold">Voucher</h1>
                <p className="text-sm text-black/60">Masukan kode voucher untuk mendapatkan potongan harga</p>
              </div>
              <Space.Compact
                style={{
                  width: "100%",
                }}
              >
                <Input value={voucherCode} placeholder="Voucher Code" onChange={e => setVoucherCode(e.target.value)} />
                <Button className="rounded-none" disabled={isVerify} type="primary" onClick={handleVerifyVoucher}>
                  {isVerify ? "Verifying.." : "Verify"}
                </Button>
              </Space.Compact>
              {voucherErr && <p className="mt-2 text-sm text-red-600">{voucherErr}</p>}
            </div>

            <div className="flex items-start justify-between">
              <p>Total Harga</p>
              <div>
                {voucherId && <p className="text-red-600 line-through">Rp.{orderDetail.total_price}</p>}
                <p className="font-bold">Rp.{totalPrice}</p>
              </div>
            </div>
          </figcaption>
          <Button type="primary" className="mt-6" onClick={() => handleBuy()}>
            Bayar Sekarang
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
