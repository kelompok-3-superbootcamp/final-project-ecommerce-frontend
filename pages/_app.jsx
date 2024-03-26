import "@/styles/globals.css"
import { ConfigProvider } from "antd"
import Header from "../components/header"
import Footers from "../components/Footers"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { usePathname } from "next/navigation"
import { Show } from "../utils/Show"
import { DashLayout } from "@/components/Layouts"
import Head from "next/head"

export default function App({ Component, pageProps }) {
  const pathname = usePathname()
  return (
    <>
      <Head>
        <title>SanberCar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ConfigProvider>
        <Show>
          <Show.When isTrue={!pathname?.includes("dashboard")}>
            <Header />
            <Component {...pageProps} />
            <Footers />
          </Show.When>
          <Show.Else>
            <DashLayout>
              <Component {...pageProps} />
            </DashLayout>
          </Show.Else>
        </Show>
      </ConfigProvider>
    </>
  )
}
