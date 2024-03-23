'use client';

import Slider from '@/components/slider';
import Grid from '@/components/Grid';
import {useAuthStore} from "@/stores/auth"

const Home = () => {
    const {user, logout} = useAuthStore()
    console.log(user)
    return (
        <>
            {/* {user} */}
            <Slider />
            <Grid />
        </>
    );
    }

export default Home