
'use client';

import { Avatar, Dropdown, Navbar } from 'flowbite-react';

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
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Status Pembelian</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/products" className='text-white'>Mobil Bekas</Navbar.Link>
        <Navbar.Link href="/products" className='text-white'>Mobil Baru</Navbar.Link>
        <Navbar.Link href="/products" className='text-white'>Mobil Listrik</Navbar.Link>
        <Navbar.Link href="/products" className='text-white'>Mobil Matic</Navbar.Link>
        <Navbar.Link href="/products" className='text-white'>Mobil Manual</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}