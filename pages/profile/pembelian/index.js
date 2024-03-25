
'use client';

import Link from 'next/link';
import { Navbar } from 'flowbite-react';
import { useState } from 'react';
import { Card } from 'flowbite-react';
import LayoutProfile from '@/components/LayoutProfile';

export default function Pembelian() {
  const [status, setStatus] = useState('pending')
  return (
    <LayoutProfile>
      <Card className='m-auto my-8'>
        <Navbar fluid rounded className='items-center mx-auto mt-8'>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link className='cursor-pointer'>
              Menunggu Pembayaran
            </Navbar.Link>
            <Navbar.Link className='cursor-pointer'>
              Di Kirim (Towing)
            </Navbar.Link>
            <Navbar.Link className='cursor-pointer'>Pembayaran Gagal</Navbar.Link>
            <Navbar.Link className='cursor-pointer'>Pembelian Dibatalkan</Navbar.Link>
            <Navbar.Link className='cursor-pointer' onClick={() => setStatus('waitin')}>Beri Penilaian / Review</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
        <Card className="m-auto" imgSrc={'/brio.jpeg'} horizontal>
          <Link href={"/car/show/1"}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Honda Brio
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <br></br>
              Say Carmudi.co.id for the best deal MAZDA 2 S AT 2011 HIJAU KM PAJAK PANJANG KM RENDAH

            </p>
          </Link>
        </Card>
        <Card className="m-auto" imgSrc={'/brio.jpeg'} horizontal>
          <Link href={"/car/show/1"}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Honda Brio
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              <br></br>
              Say Carmudi.co.id for the best deal MAZDA 2 S AT 2011 HIJAU KM PAJAK PANJANG KM RENDAH

            </p>
          </Link>
        </Card>
      </Card>
    </LayoutProfile>
  );
}
