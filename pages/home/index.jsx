'use client';

import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import Header from '@/components/header';
import Slider from '@/components/slider';
import Footers from '@/components/footer';
import Grid from '@/components/grid';

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