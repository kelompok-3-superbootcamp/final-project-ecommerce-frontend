import ReviewCard from "@/components/ReviewCard"
import useSWR from "swr"
import {useAuthStore} from "@/stores/auth"
import { host } from '@/utils/constant';
import LayoutProfile from "@/components/LayoutProfile";

const fetcher = ([url, header]) => fetch(`${host}${url}`, {headers: header}).then(res => res.json())

const Reviews = () => {
    const {user, logout} = useAuthStore()
    let header = {Authorization: `Bearer ${user?.access_token}`}
    const { data:reviews, error:err1, isLoading:is1 } = useSWR([`/reviews/for-seller`, header], fetcher)
    let users = ["Funixxxxx84","Sarah", 'Nisa', 'Ari', 'Joko', 'Deborah', "Funixxxxx84"]
    users = users.concat(users)
    console.log('oi',reviews)
    let merk = 'Honda Brio 2024'
    let desc = 'Untuk prosesnya cepat, tidak ribet, mudah juga dan dibantu oleh pihak sales dalam menyelesaikan segala prosesnya. Memuaskan, unit bagus dan sesuai. Prosesnya cepat dan mudah'
    return (

        <LayoutProfile>
        <div className="flex">
            <section className="w-4/5 grid grid-cols-2 gap-4 p-8">
            {reviews?.data.length ? reviews?.data.map((review, index) => (
                <ReviewCard username={review.user_id} stars={review.star_count} description={review.comment} key={index}/>
            )) : "belum ada review"}
            </section>
        </div>
        </LayoutProfile>
    )
}

export default Reviews