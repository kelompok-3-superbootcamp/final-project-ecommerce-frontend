import SideBar from "@/components/sideNavBar";
import Wishlist from "@/components/wishlist";
const Pembelian = () => {
    return (
        <div className="flex">
        <SideBar></SideBar>
        <div className="p-8 w-full items-center justify-center space-y-2">
            <h1 className="font-bold text-4xl mb-8">Daftar Wishlists</h1>
            <hr></hr>
            <Wishlist></Wishlist>
        </div>
        </div>
    )
}

export default Pembelian