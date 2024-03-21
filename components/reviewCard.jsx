
'use client';

import { Card } from 'flowbite-react';
import Link from 'next/link';
import { Rate } from 'antd';

export default function ReviewCard({username, rating, description}) {
  return (
    <Card className="m-auto" horizontal>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {username}
      </h5>
      <Rate disabled defaultValue={4} />
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}<br></br>
      </p>
    </Card>
  );
}
