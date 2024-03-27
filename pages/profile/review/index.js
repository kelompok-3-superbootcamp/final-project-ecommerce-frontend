import ReviewCard from "@/components/ReviewCard"
import useSWR from "swr"
import {useAuthStore} from "@/stores/auth"
import { host } from '@/utils/constant';
import LayoutProfile from "@/components/LayoutProfile";
import ListCar from "../../../components/ListCar";
import { Card } from "flowbite-react";

const fetcher = ([url, header]) => fetch(`${host}${url}`, {headers: header}).then(res => res.json())

const Reviews = () => {
    const {user, logout} = useAuthStore()
    let header = {Authorization: `Bearer ${user?.access_token}`}
    const { data:reviews, error:err1, isLoading:is1 } = useSWR([`/reviews/for-seller`, header], fetcher)
    console.log('oi',reviews)
    return (

        <LayoutProfile>
        <div>
            <section className="p-8">
                <h1 className="px-3 font-bold text-3xl">Daftar Review Mobil mu</h1>
            <hr className="mt-5"></hr>
            {reviews?.data.length ? reviews?.data.map((review, index) => (
                <>
                <div key={index} className="flex">
                <ListCar
                image_url={review.image}
                transmission={review.transmission}
                km={review.km}
                location={review.location}
                color={review.color}
                price={review.price}
                year={review.year}
                brand={review.brand_name}
                merk={review.name}
                description={review.description}
                key={index}
                condition={review.condition}
              ></ListCar>
                <ReviewCard username={review.user_name} stars={review.star_count} description={review.comment} key={index}>
                    
                </ReviewCard>
                </div>
                <hr className="mt-5"></hr>
                </>
            )) : "belum ada review"}
            </section>
        </div>
        </LayoutProfile>
    )
}

export default Reviews