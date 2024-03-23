import axios from "axios"
import { host } from "@/utils/constant"

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

  console.log(props)

  return { props }
}

const Type = () => {
  return (
    <>
      <div className="float-end w-auto">
        <Button type="primary" size={"large"}>
          Tambah Tipe Mobil
        </Button>
      </div>
      <div className="mt-20 overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>No</Table.HeadCell>
            <Table.HeadCell>Nama Model</Table.HeadCell>
            <Table.HeadCell>Deskripsi</Table.HeadCell>
            <Table.HeadCell>Harga</Table.HeadCell>
            <Table.HeadCell>Transmisi</Table.HeadCell>
            <Table.HeadCell>Kondisi</Table.HeadCell>
            <Table.HeadCell>Tahun Produksi</Table.HeadCell>
            <Table.HeadCell>Kilometer</Table.HeadCell>
            <Table.HeadCell>Stok</Table.HeadCell>
            <Table.HeadCell>Warna</Table.HeadCell>
            <Table.HeadCell>Lokasi</Table.HeadCell>
            <Table.HeadCell>Gambar</Table.HeadCell>
            <Table.HeadCell>Brand</Table.HeadCell>
            <Table.HeadCell>Tipe</Table.HeadCell>
            <Table.HeadCell>Seller</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data?.map((item, index) => (
              <>
                <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item?.name}
                  </Table.Cell>
                  <Table.Cell>{item?.description}</Table.Cell>
                  <Table.Cell>{item?.price}</Table.Cell>
                  <Table.Cell>{item?.transmission}</Table.Cell>
                  <Table.Cell>{item?.condition}</Table.Cell>
                  <Table.Cell>{item?.year}</Table.Cell>
                  <Table.Cell>{item?.km}</Table.Cell>
                  <Table.Cell>{item?.stock}</Table.Cell>
                  <Table.Cell>{item?.color}</Table.Cell>
                  <Table.Cell>{item?.location}</Table.Cell>
                  <Table.Cell>{item?.image}</Table.Cell>
                  <Table.Cell>{item?.brand_name}</Table.Cell>
                  <Table.Cell>{item?.type_name}</Table.Cell>
                  <Table.Cell>{item?.user_name}</Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        <FaEdit className="text-yellow-300" />
                      </a>{" "}
                      |
                      <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                        <FaTrash className="text-red-500" />
                      </a>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  )
}

export default Type
