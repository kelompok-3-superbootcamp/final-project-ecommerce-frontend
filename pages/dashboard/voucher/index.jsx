import { useAuthStore } from "@/stores/auth"
import { Show } from "@/utils/Show"
import { host } from "@/utils/constant"
import { Button, Pagination, Empty } from "antd"
import axios from "axios"
import { Table } from "flowbite-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import Swal from "sweetalert2"
import moment from "moment"

const Voucher = () => {
  const [vouchers, setVouchers] = useState({
    data: null,
    get: true,
  })
  const [isLoading, setIsLoading] = useState(false)
  // const [current, setCurrent] = useState(vouchers.data?.current_page)
  const { user } = useAuthStore()

  // const onChangePage = page => {
  //   setCurrent(page)
  //   setIsLoading(true)
  //   axios
  //     .get(`${host}/vouchers?order_by=desc&page=${page}`)
  //     .then(res => {
  //       setVouchers({
  //         data: res.data.data,
  //         get: false,
  //       })
  //       setIsLoading(false)
  //     })
  //     .catch(err => {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: err.response.data.message ?? "",
  //       })
  //       setIsLoading(false)
  //       setVouchers({
  //         data: null,
  //         get: false,
  //       })
  //     })
  // }

  const handleDelete = id => {
    const voucherName = vouchers.data.find(item => item.id === id).voucher_code
    Swal.fire({
      icon: "question",
      title: `Hapus Data?`,
      text: `Apakah anda yakin akan menghapus "${voucherName}"`,
    }).then(respose => {
      if (respose.isConfirmed) {
        axios
          .delete(`${host}/vouchers/${id}`, {
            headers: {
              Authorization: "Bearer " + user.access_token,
            },
          })
          .then(res => {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Data berhasil dihapus",
              timer: 3000,
            })
            setVouchers({ ...vouchers, get: true })
          })
          .catch(err => {
            Swal.fire({
              icon: "error",
              title: "Gagal menghapus Data",
              text: err.response.data.message ?? "Terjadi kesalahan. Coba lagi",
              timer: 5000,
            })
          })
      }
    })
  }

  useEffect(() => {
    if (vouchers.get)
      axios
        .get(`${host}/vouchers?order_by=desc`)
        .then(res => {
          setVouchers({
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
          setVouchers({
            data: null,
            get: false,
          })
        })
  }, [vouchers.get])

  return (
    <>
      <Show>
        <Show.When isTrue={vouchers.get === true || isLoading === true}>
          <div className="flex w-auto justify-center">
            <div className="flex items-center text-lg">
              <Image src={"/icons/loading.svg"} alt="" width={42} height={42} /> Loading
            </div>
          </div>
        </Show.When>
        <Show.Else>
          <div className="!float-end !w-auto">
            <Link href={"/dashboard/voucher/create"}>
              <Button type="primary">Tambah Voucher</Button>
            </Link>
          </div>
          <div className="mt-12 overflow-x-auto">
            <Table striped>
              <Table.Head>
                <Table.HeadCell>No</Table.HeadCell>
                <Table.HeadCell>Kode Voucher</Table.HeadCell>
                <Table.HeadCell>Diskon</Table.HeadCell>
                <Table.HeadCell>Tipe Diskon</Table.HeadCell>
                <Table.HeadCell>Quota</Table.HeadCell>
                <Table.HeadCell>Tanggal Expire</Table.HeadCell>
                <Table.HeadCell>Action</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {vouchers.data?.length ? (
                  vouchers.data?.map((item, index) => (
                    <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {item.voucher_code}
                      </Table.Cell>
                      <Table.Cell>{item.discount_value}</Table.Cell>
                      <Table.Cell>{item.discount_type}</Table.Cell>
                      <Table.Cell>{item.quota}</Table.Cell>
                      <Table.Cell>{moment(item.expire_at).format("dddd, DD-MMMM-YYYY")}</Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <div
                            className="cursor-pointer font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            title="Delete"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FaTrash className="text-red-500" />
                          </div>
                        </div>
                      </Table.Cell>
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
          {/* <div className="float-end mt-8 w-auto">
            <Pagination
              current={current}
              onChange={onChangePage}
              total={vouchers.data?.total}
              pageSize={vouchers.data?.per_page}
            />
          </div> */}
        </Show.Else>
      </Show>
    </>
  )
}

export default Voucher
