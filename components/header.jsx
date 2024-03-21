
'use client';

import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { Button } from 'flowbite-react';

export default function Header() {
  return (
    <Navbar fluid style={{backgroundColor: '#01253D', color:"white"}}>
      <Navbar.Brand href="/home">
        <img src="/sanbercar.jpg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SanberCar</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="/download.png" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Login</Dropdown.Item>
          <Dropdown.Item>Register</Dropdown.Item>
          <Dropdown.Item href='/profile/pembelian'>Status Pembelian</Dropdown.Item>
          <Dropdown.Item>Lihat Penjualan</Dropdown.Item>
          <Dropdown.Item href='/profile/wishlists'>Wishlists</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/products" className='text-white my-3'>Mobil Bekas</Navbar.Link>
        <Navbar.Link href="/products" className='text-white my-3'>Mobil Baru</Navbar.Link>
        <Navbar.Link href="/products" className='text-white my-3'>Mobil Listrik</Navbar.Link>
        <Navbar.Link href="/products" className='text-white my-3'>Mobil Matic</Navbar.Link>
        <Navbar.Link href="/products" className='text-white my-3'>Mobil Manual</Navbar.Link>
        <Navbar.Link href="/car/create" className='text-white'><Button className='bg-yellow-400'>Jual Mobil</Button></Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}