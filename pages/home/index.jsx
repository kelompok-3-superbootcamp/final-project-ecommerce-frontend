'use client';

import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import Header from '@/components/header';
import Slider from '@/components/slider';
import Footers from '@/components/footer';
import Grid from '@/components/grid';
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