
'use client';

import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { useAuthStore } from "@/stores/auth"
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

export default function Header() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  const logOut = () => {
    logout()
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Berhasil Logout",
    });
    router.push("/home")
  }

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
          { user ? <Dropdown.Header>
            <span className="block text-sm">{user.name}</span>
            <span className="block truncate text-sm font-medium">{user.email}</span>
          </Dropdown.Header> : ""}
          { user?.role == 'admin' ? <Dropdown.Item>Dashboard</Dropdown.Item> : ''}
          { user ? 
          <>
          <Dropdown.Item href='/profile/user'>Profil</Dropdown.Item>
          <Dropdown.Item href='/profile/pembelian'>Status Pembelian</Dropdown.Item>
          <Dropdown.Item href='/profile/wishlists'>Daftar Wishlist</Dropdown.Item>
          <Dropdown.Divider />

          <Dropdown.Item href='/profile/orders'>Status Penjualan</Dropdown.Item>
          <Dropdown.Item href='/profile/Etalase'>etalase</Dropdown.Item>
          <Dropdown.Item href='/profile/review'>Review toko mu</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => logOut()}>Log out</Dropdown.Item>
          </>
          : 
          <>
            <Dropdown.Item href='/auth/login'>Login</Dropdown.Item>
            <Dropdown.Item href='/auth/register'>Register</Dropdown.Item>
          </>
          }
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/products?condition=bekas" className='text-white my-3'>Mobil Bekas</Navbar.Link>
        <Navbar.Link href="/products?condition=baru" className='text-white my-3'>Mobil Baru</Navbar.Link>
        <Navbar.Link href="/products?type_name=listrik" className='text-white my-3'>Mobil Listrik</Navbar.Link>
        <Navbar.Link href="/products?transmission=automatic" className='text-white my-3'>Mobil Matic</Navbar.Link>
        <Navbar.Link href="/products?transmission=manual" className='text-white my-3'>Mobil Manual</Navbar.Link>
        <Navbar.Link href="/car/create" className='text-white'><Button className='bg-yellow-400'>Jual Mobil</Button></Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}