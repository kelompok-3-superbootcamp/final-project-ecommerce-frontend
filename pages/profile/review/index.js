import SideBar from "@/components/sideNavBar"
import ListCar from "@/components/listCar"
import ReviewCard from "@/components/reviewCard"
const Reviews = () => {
    let users = ["Funixxxxx84","Sarah", 'Nisa', 'Ari', 'Joko', 'Deborah', "Funixxxxx84"]
    users = users.concat(users)
    let merk = 'Honda Brio 2024'
    let desc = 'Untuk prosesnya cepat, tidak ribet, mudah juga dan dibantu oleh pihak sales dalam menyelesaikan segala prosesnya. Memuaskan, unit bagus dan sesuai. Prosesnya cepat dan mudah'
    return (
        <div className="flex">
            <SideBar></SideBar>
            <section className="w-4/5 grid grid-cols-2 gap-4 p-8">
            {users.map((username, index) => (
                <ReviewCard username={username} stars={4} description={desc} key={index}/>
            ))}
            </section>
        </div>
    )
}

export default Reviews