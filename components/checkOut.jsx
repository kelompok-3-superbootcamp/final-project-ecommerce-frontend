
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
        <figcaption className='mr-16'>
            <div className='flex justify-between mt-6'>
                <p>Brand :</p><p>Honda</p>
            </div>
            <hr></hr>
            <div className='flex justify-between'>
                <p>Merk :</p><p>Brio</p>
            </div>
            <hr></hr>
            <div className='flex justify-between'>
                <p>Harga :</p><p>170.000.000</p>
            </div>
            <hr></hr>
            <div className='flex justify-between'>
                <p>Warna :</p><p>Putih</p>
            </div>
            <hr></hr>
            <div className='flex justify-between'>
                <p>Kondisi :</p><p>Bekas</p>
            </div>
            <hr></hr>
            <div className='flex justify-between'>
                <p>Harga :</p><p>170.000.000</p>
            </div>
            <hr></hr>
            <div className='flex justify-between'>
                <p>Tipe :</p><p>LCGC Matic</p>
            </div>
            <hr></hr>
            <div className='flex justify-between'>
                <p>Kilometer :</p><p>100.000 KM</p>
            </div>
            <hr></hr>
            <div className='flex justify-between'>
                <p>Pembayaran via :</p><p>Transfer Bank</p>
            </div>
            <hr></hr>
                {/* <p>Voucher</p>
            <hr></hr> */}
        </figcaption>
            <Button type="primary" className="mt-6"><Link href={'/checkout/payment'}>Beli Sekarang</Link></Button>

        </div>
    </div>
    </>
  );
}
