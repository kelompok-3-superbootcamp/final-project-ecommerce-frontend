import "@/styles/globals.css";
import Header from "@/components/header";
import Footers from "@/components/footer";

export default function App({ Component, pageProps }) {
  return (
    <>
    <Header />
    <Component {...pageProps} />
    <Footers />
    </>
  )
}
