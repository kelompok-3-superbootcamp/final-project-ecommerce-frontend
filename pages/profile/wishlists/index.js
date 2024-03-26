import Wishlist from "@/components/Wishlist";
import LayoutProfile from "@/components/LayoutProfile";

const Wishlists = () => {
    return (
        <LayoutProfile>
            <div className="flex">
                <div className="w-full space-y-2 pt-6">
                    <h1 className="px-10 font-bold text-4xl mb-8 ml-6">Daftar Wishlists</h1>
                    <hr></hr>
                    <Wishlist></Wishlist>
                </div>
            </div>
        </LayoutProfile>
    )
}

export default Wishlists