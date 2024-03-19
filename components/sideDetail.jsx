import { Button } from "flowbite-react"
import Link from "next/link"

const SideDetail = () => {
    return (
        <div className="w-1/3 bg-white mx-auto p-6">
            <div className="sticky top-0">
                <h1 className="text-black text-5xl font-bold">Rp 170.000.000</h1>
                <Button type="primary" className="m-auto w-full mt-8 bg-green-400"><Link href={'/checkout'}>WhatsApp</Link></Button>
                <Button type="primary" className="m-auto w-full mt-8"><Link href={'/checkout'}>Telepon</Link></Button>
                <Button type="primary" className="m-auto w-full mt-8 bg-cyan-950"><Link href={'/checkout'}>SMS</Link></Button>
            </div>
        </div>
    )
}

export default SideDetail