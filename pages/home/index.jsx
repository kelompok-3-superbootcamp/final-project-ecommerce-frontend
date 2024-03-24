'use client';

import Slider from '@/components/slider';
import Grid from '@/components/Grid';
import {useAuthStore} from "@/stores/auth"
import Footers from '@/components/footer';

const Home = () => {
    return (
        <>
            {/* {user} */}
            <Slider />
            <Grid />
        </>
    );
    }

export default Home