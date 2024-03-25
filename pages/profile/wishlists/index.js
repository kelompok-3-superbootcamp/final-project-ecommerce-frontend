import SideBar from "@/components/sideNavBar";
import Wishlist from "@/components/wishlist";
import LayoutProfile from "../../../components/LayoutProfile";

const Wishlists = () => {
    return (
        <LayoutProfile>
            <div className="flex">
                <div className="p-8 w-full items-center justify-center space-y-2">
                    <h1 className="font-bold text-4xl mb-8 ml-6">Daftar Wishlists</h1>
                    <hr></hr>
                    <Wishlist></Wishlist>
                </div>
            </div>
        </LayoutProfile>
    )
}

export default Wishlists