
'use client';

import { Card } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Cards({imageUrl, merk ,description}) {
  return (
    <Link href='/car/1' >
    <Card
      className="max-w-sm"
      renderImage={() => <Image width={500} height={500} src={imageUrl} alt="image 1" />}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {merk}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
    </Card>
    </Link>
  );
}
