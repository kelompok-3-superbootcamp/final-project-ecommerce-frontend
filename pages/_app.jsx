import "@/styles/globals.css"
import { ConfigProvider } from "antd"
import Header from "../components/header"
import Footers from "../components/footer"

export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider>
      <Header />
      <Component {...pageProps} />
      <Footers />
    </ConfigProvider>
  )
}
