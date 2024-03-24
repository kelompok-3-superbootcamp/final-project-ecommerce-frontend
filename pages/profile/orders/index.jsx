import { Table } from "flowbite-react"
import LayoutProfile from "@/components/LayoutProfile"

const Orderan = () => {
  return (
    <LayoutProfile>
      <div className="w-full overflow-x-auto">
        <h1 className="m-6 text-2xl font-bold">Daftar Pesanan Masuk</h1>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Color</Table.HeadCell>
            <Table.HeadCell>Tahun</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Status Pesanan</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {"Honda Brio"}
              </Table.Cell>
              <Table.Cell>Sliver</Table.Cell>
              <Table.Cell>2019</Table.Cell>
              <Table.Cell>$2999</Table.Cell>
              <Table.Cell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Pembeli sudah Membayar lunas, Kirim Mobil mu Sekarang!
                </a>
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Toyota Agya
              </Table.Cell>
              <Table.Cell>White</Table.Cell>
              <Table.Cell>2019 PC</Table.Cell>
              <Table.Cell>$1999</Table.Cell>
              <Table.Cell>
                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Menunggu Pembayaran dari Pembeli
                </a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </LayoutProfile>
  )
}

export default Orderan
