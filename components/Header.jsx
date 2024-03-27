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
    <Navbar fluid style={{ backgroundColor: "#01253D", color: "white" }} className="2xl:h-[9vh]">
      <Navbar.Brand href="/home">
        <Image src="/sanbercar.jpg" className="mr-3 h-10" alt="Flowbite React Logo" width={50} height={50} />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white 2xl:text-4xl">SanberCar</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" img="/download.png" rounded />}>
          {user && (
            <Dropdown.Header>
              <span className="block text-sm">{user.user.name}</span>
              <span className="block truncate text-sm font-medium">{user.email}</span>
            </Dropdown.Header>
          )}
          {user ? (
            <>
              {user.user.role === "admin" && (
                <Dropdown.Item onClick={() => router.push("/dashboard")}>Dashboard</Dropdown.Item>
              )}
              <Dropdown.Item href="/profile/akun">Pengaturan Akun</Dropdown.Item>
              <Dropdown.Item href="/profile">Profil</Dropdown.Item>
              <Dropdown.Item href="/profile/pembelian">Status Pembelian</Dropdown.Item>
              <Dropdown.Item href="/profile/wishlists">Daftar Wishlist</Dropdown.Item>
              <Dropdown.Divider />

              <Dropdown.Item href="/profile/orders">Status Penjualan</Dropdown.Item>
              <Dropdown.Item href="/profile/etalase">Etalase</Dropdown.Item>
              <Dropdown.Item href="/profile/review">Review toko mu</Dropdown.Item>

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
        <Navbar.Link href="/products?condition=bekas" className="my-3 text-white 2xl:text-2xl 2xl:pt-2">
          Mobil Bekas
        </Navbar.Link>
        <Navbar.Link href="/products?condition=baru" className="my-3 text-white 2xl:text-2xl 2xl:pt-2">
          Mobil Baru
        </Navbar.Link>
        <Navbar.Link href="/products?type_name=listrik" className="my-3 text-white 2xl:text-2xl 2xl:pt-2">
          Mobil Listrik
        </Navbar.Link>
        <Navbar.Link href="/products?transmission=automatic" className="my-3 text-white 2xl:text-2xl 2xl:pt-2">
          Mobil Matic
        </Navbar.Link>
        <Navbar.Link href="/products?transmission=manual" className="my-3 text-white 2xl:text-2xl 2xl:pt-2">
          Mobil Manual
        </Navbar.Link>
        <Navbar.Link href="/car/create" className="text-white 2xl:text-2xl">
          <div className="items-center justify-center cursor-pointer rounded-lg bg-yellow-400 h-10 w-24 2xl:h-16 2xl:w-36 2xl:mt-1 2xl:text-xl"><h1 className="py-2.5 px-3.5 2xl:py-4 2xl:px-6">Jual Mobil</h1></div>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
