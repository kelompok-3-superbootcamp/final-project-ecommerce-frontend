import CheckOut from "@/components/checkOut"
import { Button } from "flowbite-react"

const Payment = () => {
    return (
        <>
        <CheckOut />
        <div className="w-full bg-black bg-opacity-50 fixed z-10 top-0 h-full">
            <div className="bg-white max-w-96 m-auto items-center mt-24 h-96">
                <div className="h-16 bg-sky-950 text-white p-4 font-bold text-2xl"><h1 className="">PT Santai Berkualitas Car</h1></div>
                <div className="h-24 bg-slate-300 py-2 px-4 font-bold">
                    <h1 className="text-slate-500">Total</h1>
                    <h1 className="font-bold text-3xl">Rp 3.000.000</h1>
                    <h1 className="text-slate-500">Order ID</h1>
                </div>
                <div className="p-4 font-bold">
                <h1 className="text-2xl">Bank Mandiri</h1>
                <h1 className="text-slate-500 my-4">Lakukan Pembayaran dari rekening bank Mandiri ke Nomor Virtual Account berikut:</h1>
                <h1 className="text-xl text-slate-700">Nomor Virtual Account</h1>
                <h1 className="text-xl">720807764797</h1>
                <div className="h-1 w-full bg-slate-300 my-6 rounded"></div>
                <Button className="w-full">Kembali ke Merchant</Button>
                </div>
            </div>
            <div className="bg-white max-w-96 m-auto items-center h-24"></div>
        </div>
        </>
    )
}

export default Payment