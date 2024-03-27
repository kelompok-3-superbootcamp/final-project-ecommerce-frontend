"use client"

import { Sidebar } from "flowbite-react"
import Link from "next/link"
import {
  HiChartPie,
  HiHeart,
  HiInbox,
  HiOutlineKey,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
} from "react-icons/hi"


export default function SideBarProfile() {

  return (
    <div className="items-start bg-white">
      <Sidebar aria-label="Default sidebar example" className="sticky top-0 mt-0 min-h-[60vh]">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item as={Link} href="/profile" icon={HiUser}>
              Profil
            </Sidebar.Item>
            <Sidebar.Item as={Link} href="/profile/wishlists" icon={HiHeart}>
              Wishlists
            </Sidebar.Item>
            <Sidebar.Item as={Link} href="/profile/pembelian" icon={HiShoppingBag}>
              Status Pembelian
            </Sidebar.Item>
            <Sidebar.Item as={Link} href="/profile/etalase" icon={HiViewBoards} label="Seller" labelColor="dark">
              Etalase
            </Sidebar.Item>
            <Sidebar.Item as={Link} href="/profile/orders" icon={HiInbox} label="1">
              Pesanan Masuk
            </Sidebar.Item>
            <Sidebar.Item as={Link} href="/profile/review" icon={HiChartPie}>
              Review Toko Mu
            </Sidebar.Item>
            <Sidebar.Item as={Link} href="/profile/akun" icon={HiOutlineKey}>
              Ganti Password
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}
