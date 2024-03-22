
'use client';

import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';

export default function SideBar() {
  return (
    <div className="bg-white items-start">
      <Sidebar aria-label="Default sidebar example" className='mt-0 sticky top-0 h-vh'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/profile/user" icon={HiUser}>
            Profil
          </Sidebar.Item>
          <Sidebar.Item href="/profile/wishlists" className='px-0'>
            <div className='flex'>
          <svg className="mr-2 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
          </svg>
            Wishlists
            </div>
          </Sidebar.Item>
          <Sidebar.Item href="/profile/etalase" icon={HiViewBoards} label="Seller" labelColor="dark">
            Etalase
          </Sidebar.Item>
          <Sidebar.Item href="/profile/pembelian" icon={HiShoppingBag}>
            Status Pembelian
          </Sidebar.Item>
          <Sidebar.Item href="/profile/orders" icon={HiInbox} label="1">
            Pesanan Masuk
          </Sidebar.Item>
          <Sidebar.Item href="/profile/review" icon={HiChartPie}>
            Review Toko Mu
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Log Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </div>
  );
}
