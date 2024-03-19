
'use client';

import { Card } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'flowbite-react';

export default function CheckOut({imageUrl, merk ,description}) {
  return (
    <>
    <section className="h-14 w-full bg-slate-100">
        <div className='w-2/3 justify-between flex m-auto pt-4 font-black'>
        <h1>Honda Brio</h1>
        <h1>Rp 178.000.000</h1>
        </div>
    </section>
    <div className='grid grid-cols-1 md:grid-cols-2 bg-white w-2/3 m-auto p-8'>
        <figure>
            <img src="/brio.jpeg" alt="Trulli" width={'350px'}/>
        </figure>
        <div>
            <h1 className='font-black text-3xl'>Beli Aman & Terpercaya dengan SanberCar</h1>
            <h1 className='font-black text-xl mt-6'>Pesan Mobil Ini</h1>
        <figcaption className='flex justify-between mt-6'>
            <div>
                <p>Brand :</p>
                <p>Merk:</p>
                <p>Harga :</p>
                <p>Warna :</p>
                <p>Kondisi :</p>
                <p>Tipe :</p>
                <p>KM :</p>
                <br></br>
                <p>Pembayaran via</p>
                <p>Voucher</p>
                
            </div>
            <div>
                <p>Honda Brio</p>
            </div>
            <hr></hr>
        </figcaption>
            <Button type="primary" className="m-auto"><Link href={'/checkout'}>Beli Sekarang</Link></Button>

        </div>
    </div>
    </>
  );
}
