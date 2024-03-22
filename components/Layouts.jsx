import React, { useEffect, useState } from "react"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Layout, Menu, Button, theme, Breadcrumb } from "antd"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BiSolidDiscount } from "react-icons/bi"
import { FaShoppingCart, FaCar } from "react-icons/fa"
import { MdReviews } from "react-icons/md"
import { BsFuelPumpFill } from "react-icons/bs"
import { IoPricetag } from "react-icons/io5"

const { Header, Sider, Content, Footer } = Layout

export const DashLayout = ({ children }) => {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [path, setPath] = useState("")
  const [breadcrumb, setBreadcrumb] = useState([])

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const menus = [
    {
      key: "product",
      icon: <FaCar />,
      label: <Link href={"/dashboard/product"}>Produk</Link>,
    },
    {
      key: "order",
      icon: <FaShoppingCart />,
      label: <Link href={"/dashboard/order"}>Pesanan</Link>,
    },
    {
      key: "voucher",
      icon: <BiSolidDiscount />,
      label: <Link href={"/dashboard/voucher"}>Voucher</Link>,
    },
    {
      key: "review",
      icon: <MdReviews />,
      label: <Link href={"/dashboard/review"}>Ulasan</Link>,
    },
    {
      type: "group",
      label: "Master Data",
      children: [
        {
          label: <Link href={"/dashboard/type"}>Tipe</Link>,
          key: "type",
          icon: <BsFuelPumpFill />,
        },
        {
          label: <Link href={"/dashboard/brand"}>Brand</Link>,
          key: "brand",
          icon: <IoPricetag />,
        },
      ],
    },
  ]

  useEffect(() => {
    if (pathname) {
      const regex = /^\/dashboard\//
      const result = pathname.replace(regex, "")
      setPath(result)
      const listPath = pathname.split("/").slice(1)
      setBreadcrumb(
        pathname
          .split("/")
          .slice(1)
          .map((item, index) => {
            if (index === listPath.length - 1) {
              return { title: item }
            } else {
              return {
                title: item,
                href: `/${pathname
                  .split("/")
                  .slice(1, index + 2)
                  .join("/")}`,
              }
            }
          }),
      )
    }
  }, [pathname])
  return (
    <Layout className="h-auto max-h-full !min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed} className="!bg-primary-blue">
        <div className="sticky top-0">
          <div className={`flex h-16 items-center transition-all duration-300 ease-in-out ${collapsed && "pl-3"}`}>
            <Image
              src={"/main-logo.jpg"}
              alt="logo"
              style={{
                objectFit: "contain",
                height: "max-content",
              }}
              width={collapsed ? 60 : 50}
              height={0}
              priority={false}
              className="transition-all duration-100 ease-in-out"
            />
            <h1 className={`text-3xl text-white transition-all duration-300 ease-in-out ${collapsed && "opacity-0"}`}>
              SanberCar
            </h1>
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={[path]} className="!bg-primary-blue" items={menus} />
        </div>
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="sticky top-0 z-50 border-b border-zinc-500 bg-opacity-50 backdrop-blur-sm"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Breadcrumb className="!pl-8 !pt-6 capitalize" separator=">" items={breadcrumb} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className="h-full max-h-full min-h-screen"
        >
          {children}
        </Content>
        <Footer className="!bg-white">Copyright &copy; SanberCar 2024</Footer>
      </Layout>
    </Layout>
  )
}
