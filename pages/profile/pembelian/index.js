import SideBar from "@/components/sideNavBar";

const Pembelian = () => {
    return (
        <div className="flex items-center">
        <SideBar></SideBar>
        <div className="p-8 w-full items-center justify-center space-y-2">
            <h1>Status Pembelian</h1>
            <hr></hr>
            <div className="flex space-between">
                <h1>Belum Bayar</h1>
                <h1>Dikemas</h1>
                <h1>Dikirim</h1>
                <h1>Beri Penilaian</h1>
            </div>
        </div>
        </div>
    )
}

export default Pembelian