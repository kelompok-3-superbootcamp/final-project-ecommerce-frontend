
'use client';

import { Footer } from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

export default function Footers() {
  return (
    <Footer bgDark style={{backgroundColor: '#01253D', color:"white"}}>
      <div className="w-full">
        <h1 className='pl-12 pt-12 text-3xl'>SanberCar.id</h1>
        <div className="md:flex w-full px-12 py-8 justify-between">
          <div className='md:w-2/5 mb-8'>
            <Footer.Title title="Head Office"/>
            <Footer.LinkGroup col>
              <Footer.Link href="#">Millennium Centennial Center, Jl. Jenderal Sudirman No.Kav.25, RT.12/RW.1, Kuningan, Karet Kuningan, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12920</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="Pusat Bantuan" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Personal Assistant</Footer.Link>
              <Footer.Link href="#">Tata Cara Pembayaran</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div className='mt-8 md:mt-0'>
            <Footer.Title title="Hubungi Kami" />
            <Footer.LinkGroup col>
              <Footer.Link href="#">Halo@sanbercar.id</Footer.Link>
              <Footer.Link href="#">08xx xxxx xxxx</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div className="mt-4 flex space-x-4 sm:mt-0 justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
          </div>
        </div>
        <hr className='mx-12'></hr>
        <div className="w-full bg-gray-700 px-12 pt-6 pb-8 sm:flex sm:items-center sm:justify-between" style={{backgroundColor: '#01253D', color:"white"}}>
          <div className='flex space-x-6'>
            <Footer.Title title="Tentang Kami" />
            <Footer.Title title="Kebijakan Privasi" />
            <Footer.Title title="Pertanyaan Umum" />
          </div>
          {/* <Footer.Copyright href="#" by="Flowbite™" year={2022} /> */}
          <Footer.Title title="&#169;2023. PT Santai Berkualitas Car, Tbk"/>
        </div>
      </div>
    </Footer>
  );
}
