
'use client';

import { Carousel } from 'flowbite-react';

export default function Slider() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        <img src="/banner1.png" alt="..." />
        {/* <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." /> */}
        <img src="/banner2.png" alt="..." />
      </Carousel>
    </div>
  );
}
