import { Button } from "flowbite-react"
import Link from "next/link"

const SideDetail = () => {
    return (
        <div className="w-1/3 bg-white mx-auto p-6">
            <div className="sticky top-0 space-y-4">
                <h1 className="text-black text-5xl font-bold">Rp 170.000.000</h1>
                <Link href={'/checkout'}><Button type="primary" className="m-auto w-full mt-8 bg-rose-500 text-white">Beli Sekarang</Button></Link>
                <h1>Dijual oleh SanberCar</h1>
                <Link href={'/'}><Button type="primary" className="m-auto w-full mt-6 bg-black text-white">Lihat Profil</Button></Link>
                <h1>Hubungi Penjual</h1>
                <Link href={'/'}><Button type="primary" className="m-auto w-full mt-4 bg-green-400"><Link href={'/'}>WhatsApp</Link></Button></Link>
                <Link href={'/'}><Button type="primary" className="m-auto w-full mt-4"><Link href={'/'}>Telepon</Link></Button></Link>
                <Link href={'/'}><Button type="primary" className="m-auto w-full mt-4 bg-cyan-950"><Link href={'/'}>SMS</Link></Button></Link>
                <div className="flex justify-between"><h1>Bagikan</h1><Button className="bg-rose-400">Wishlist</Button></div>
            </div>
        </div>
    )
}

export default SideDetail