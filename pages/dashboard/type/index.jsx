import { host } from "@/utils/constant"
import { Button } from "antd"
import axios from "axios"
import { Table } from "flowbite-react"
import { useEffect, useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import Swal from "sweetalert2"
import Link from "next/link"
import { useAuthStore } from "../../../stores/auth"

export async function getServerSideProps() {
  const props = {
    perdata: null,
  }

  try {
    const res = await axios.get(
      `${host}/types`,
      // {},{headers: {
      //   Authorization: 'Bearer ' + token
      // }}
    )
    props.perdata = res.data.data
  } catch (err) {
    props.perdata = null
  }

  console.log(props, host)

  return { props }
}

const Type = ({ perdata }) => {
  const [types, setTypes] = useState({
    refetch: false,
    data: perdata,
  })

  const user = useAuthStore(state => state.user)

  const handleDelete = async id => {
    const sure = confirm("Yakin mau hapus?")

    if (sure) {
      try {
        const response = await axios.delete(`${host}/types/${id}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        })

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Berhasil hapus type",
        })
        console.log(response)
        setTypes({
          ...types,
          refetch: true,
        })
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: err?.response.data.message ?? "Hapus Gagal",
        })
      }
    }
  }

  useEffect(() => {
    if (types.refetch) {
      axios
        .get(`${host}/types`)
        .then(res => {
          setTypes({
            refetch: false,
            data: res.data.data,
          })

          console.log(res)
        })
        .catch(err => console.log(err))
    }
  }, [types])

  return (
    <>
      <div className="float-end w-auto">
        <Link href="/dashboard/type/create">
          <Button type="primary" size={"large"}>
            Tambah Tipe Mobil
          </Button>
        </Link>
      </div>
      <div className="mt-20 overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Nama Tipe</Table.HeadCell>
            <Table.HeadCell>Deskripsi</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {types.data?.map((item, index) => (
              <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item?.name}
                </Table.Cell>
                <Table.Cell>{item?.description}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/type/edit/${item.id}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      <FaEdit className="text-yellow-300" />
                    </Link>{" "}
                    |
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      <FaTrash className="text-red-500" />
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  )
}

export default Type
