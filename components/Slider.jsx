'use client';

import { Carousel } from 'flowbite-react';
import Image from 'next/image';
import banner1 from '../public/banner1.png'
import banner2 from '../public/banner2.png'

export default function Slider() {
  return (
    <div className="h-[16vh] md:h-[74vh]">
      <Carousel id='banner' className='!rounded-none'>
        <Image src={banner1} alt='...'/>
        <Image src={banner2} alt='...'/>
      </Carousel>
    </div>
  );
}
