import { useAuthStore } from "@/stores/auth"
import { Show } from "@/utils/Show"
import { host } from "@/utils/constant"
import { Button, Pagination, Select, Space, Input, InputNumber, Typography, Empty } from "antd"
import axios from "axios"
import { Table } from "flowbite-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FaFilter, FaTrash, FaSearch } from "react-icons/fa"
import { Col, Row } from "antd"
const { Search } = Input
const { Text } = Typography
import Swal from "sweetalert2"

const Order = () => {
  const [orders, setOrders] = useState({
    data: null,
    get: true,
  })
  console.log("orders", orders)

  useEffect(() => {
    if (orders.get)
      axios
        .get(`${host}/orders`)
        .then(res => {
          setOrders({
            data: res.data.data,
            get: false,
          })
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.response.data.message ?? "",
          })
          setOrders({
            data: null,
            get: false,
          })
        })
  }, [orders])

  return (
    <>
      <Show>
        <Show.When isTrue={orders.get === true}>
          <div className="flex w-auto justify-center">
            <div className="flex items-center text-lg">
              <Image src={"/icons/loading.svg"} alt="" width={42} height={42} /> Loading
            </div>
          </div>
        </Show.When>
        <Show.Else>
          <div className="mt-4 overflow-x-auto">
            <Table striped>
              <Table.Head>
                <Table.HeadCell>No</Table.HeadCell>
                <Table.HeadCell>User</Table.HeadCell>
                <Table.HeadCell>Mobil</Table.HeadCell>
                <Table.HeadCell>Total Pembayaran</Table.HeadCell>
                <Table.HeadCell>Metode Pembayaran</Table.HeadCell>
                <Table.HeadCell>Status Pembayaran</Table.HeadCell>
                <Table.HeadCell>Waktu Transaksi</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {orders.data?.data?.length ? (
                  orders.data?.data?.map((item, index) => (
                    <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {item?.user_id}
                      </Table.Cell>
                      <Table.Cell>{item?.car_id}</Table.Cell>
                      <Table.Cell>{item?.total_price}</Table.Cell>
                      <Table.Cell>{item?.payment_method}</Table.Cell>
                      <Table.Cell>{item?.payment_status}</Table.Cell>
                      <Table.Cell>{item?.date}</Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan={16}>
                      <Empty />
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
        </Show.Else>
      </Show>
    </>
  )
}

export default Order
