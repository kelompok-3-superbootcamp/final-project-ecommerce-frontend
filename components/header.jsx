"use client"

import { Avatar, Dropdown, Navbar } from "flowbite-react"
import { Button } from "flowbite-react"
import { useRouter } from "next/router"
import { host } from "@/utils/constant"
import { useAuthStore } from "@/stores/auth"
import Swal from "sweetalert2"
import axios from "axios"
import Image from "next/image"

export default function Header() {
  const router = useRouter()
  const { logout, user } = useAuthStore(state => state)

  const handleSignOut = () => {
    axios
      .post(`${host}/auth/logout`, {}, { headers: { Authorization: `Bearer ${user.access_token}` } })
      .then(res => {
        Swal.fire({
          icon: "success",
          title: "Logout Berhasil",
          text: "Beralih ke halaman utama dalam 5 detik",
          timer: 5000,
        }).then(response => {
          if (response.isDismissed) {
            router.push("/home")
          } else if (response.isConfirmed) {
            router.push("/home")
          }
        })
        logout()
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Logout Gagal",
          text:
            err.response.data.message + "Beralih ke halaman utama dalam 5 detik" ??
            "Terjadi kesalahan. Beralih ke halaman utama dalam 5 detik",
          timer: 5000,
        }).then(response => {
          if (response.isDismissed || response.isConfirmed) {
            router.push("/home")
            logout()
          }
        })
      })
  }

  return (
    <Navbar fluid style={{ backgroundColor: "#01253D", color: "white" }}>
      <Navbar.Brand href="/home">
        <Image src="/sanbercar.jpg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" width={50} height={30} />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SanberCar</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" img="/download.png" rounded />}>
          {user && (
            <Dropdown.Header>
              <span className="block text-sm">{user.name}</span>
              <span className="block truncate text-sm font-medium">{user.email}</span>
            </Dropdown.Header>
          )}
          {user ? (
            <>
              {user.user.role === "admin" && (
                <Dropdown.Item onClick={() => router.push("/dashboard")}>Dashboard</Dropdown.Item>
              )}
              <Dropdown.Item href="/profile/pembelian">Status Pembelian</Dropdown.Item>
              <Dropdown.Item>Lihat Penjualan</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
            </>
          ) : (
            <>
              <Dropdown.Item onClick={() => router.push("/auth/login")}>Login</Dropdown.Item>
              <Dropdown.Item onClick={() => router.push("/auth/register")}>Register</Dropdown.Item>
            </>
          )}
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
  )
}
