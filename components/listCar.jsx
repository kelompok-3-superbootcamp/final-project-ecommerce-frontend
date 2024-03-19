
'use client';

import { Card } from 'flowbite-react';
import Link from 'next/link';

export default function ListCar({image_url, merk, description}) {
  return (
    <Card className="m-auto" imgSrc={image_url} horizontal>
      <Link href={"/car/1"}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {merk}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}<br></br>
        Say Carmudi.co.id for the best deal MAZDA 2 S AT 2011 HIJAU KM PAJAK PANJANG KM RENDAH

      </p>
      </Link>
    </Card>
  );
}
