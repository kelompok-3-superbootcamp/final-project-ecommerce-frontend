
'use client';

import { Label, TextInput, Select, Textarea, FileInput } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { Rate } from 'antd';
import ListCar from '@/components/listCar';
import Cards from '@/components/card';
export default function Review() {
  return (
    <div className="flex max-w-xl flex-col gap-4 m-auto p-8">
        <h1 className='m-auto font-bold text-2xl'>Selamat Mobil mu dah sampai, Review yuk!</h1>
        <ListCar image_url={'/brio.jpeg'} merk={'Honda Brio'} description={''}/>
        <div className="block">
        <Label htmlFor="description" value="Kualitas Mobil" />
      </div>
        <Rate />
      <div className=" block">
        <Label htmlFor="description" value="Berikan Penilaianmu terkait Mobil ini" />
      </div>
      <Textarea id="description" placeholder="Bagikan penilaianmu dan bantu Pengguna lain membuat pilihan yang lebih baik" required rows={4} />

      <Button>Kirim</Button>
    </div>
  );
}
