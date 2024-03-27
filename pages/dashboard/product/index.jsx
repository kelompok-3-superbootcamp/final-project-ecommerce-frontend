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
import { limitString } from "@/src/utils/strhelper"

const Product = () => {
  const [cars, setCars] = useState({
    data: null,
    get: true,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState({
    name: "",
    order_by: "terbaru",
    user_name: "",
    brand_name: "",
    type_name: "",
    location: "",
    condition: "",
    transmission: "",
    price_range: "",
    min_price: "",
    max_price: "",
    color: "",
    min_year: "",
    max_year: "",
    min_km: "",
    max_km: "",
    page: "",
  })
  const [refetch, setRefetch] = useState(false)
  const [openFilter, setOpenFilter] = useState(cars.data?.current_page)
  const [current, setCurrent] = useState(cars.data?.current_page)
  const { user } = useAuthStore()
  const [masterData, setMasterData] = useState({
    brands: null,
    types: null,
  })

  const makeQuery = query => {
    return `order_by=${query.order_by}${query.name ? `&name=${query.name}` : ""}${query.transmission ? `&transmission=${query.transmission}` : ""}${query.location ? `&location=${query.location}` : ""}${query.condition ? `&condition=${query.condition}` : ""}${query.min_price ? `&min_price=${query.min_price}` : ""}${query.max_price ? `&max_price=${query.max_price}` : ""}${query.color ? `&max_price=${query.color}` : ""}${query.min_km ? `&min_km=${query.min_km}` : ""}${query.max_km ? `&max_km=${query.max_km}` : ""}${query.min_year ? `&min_year=${query.min_year}` : ""}${query.max_year ? `&max_year=${query.max_year}` : ""}${query.brand_name ? `&brand_name=${query.brand_name}` : ""}${query.type_name ? `&type_name=${query.type_name}` : ""}${query.user_name ? `&user_name=${query.user_name}` : ""}${query.price_range ? `&price_range=${query.price_range}` : ""}${query.page ? `&page=${query.page}` : ""}`
  }

  const onChangePage = page => {
    setCurrent(page)
    setIsLoading(true)
    setFilter({ ...filter, page: page })
    setTimeout(() => {
      setRefetch(true)
    }, 500)
  }

  const onChangeOrderBy = value => {
    setFilter({ ...filter, order_by: value })
  }
  const onChangeUserName = value => {
    setFilter({ ...filter, user_name: value })
  }
  const onChangeBrand = value => {
    setFilter({ ...filter, brand_name: value })
  }
  const onChangeType = value => {
    setFilter({ ...filter, type_name: value })
  }
  const onChangeLocation = value => {
    setFilter({ ...filter, location: value })
  }
  const onChangeCondition = value => {
    setFilter({ ...filter, condition: value })
  }
  const onChangeTransmission = value => {
    setFilter({ ...filter, transmission: value })
  }
  const onChangePriceRange = value => {
    setFilter({ ...filter, price_range: value })
  }
  const onChangeMinPrice = value => {
    setFilter({ ...filter, min_price: value })
  }
  const onChangeMaxPrice = value => {
    setFilter({ ...filter, max_price: value })
  }
  const onChangeColor = value => {
    setFilter({ ...filter, color: value })
  }
  const onChangeMinYear = value => {
    setFilter({ ...filter, min_year: value })
  }
  const onChangeMaxYear = value => {
    setFilter({ ...filter, max_year: value })
  }
  const onChangeMinKm = value => {
    setFilter({ ...filter, min_km: value })
  }
  const onChangeMaxKm = value => {
    setFilter({ ...filter, max_km: value })
  }

  const onSearch = _e => {
    setRefetch(true)
  }
  const onChangeSearch = e => {
    setFilter({ ...filter, name: e.target.value })
  }

  const filterOption = (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())

  const handleSearchSort = () => {
    setRefetch(true)
    setOpenFilter(false)
  }

  const handleDelete = id => {
    const carName = cars.data.data.find(item => item.id === id).name
    Swal.fire({
      icon: "question",
      title: `Hapus Data?`,
      text: `Apakah anda yakin akan menghapus ${carName}`,
    }).then(respose => {
      if (respose.isConfirmed) {
        axios
          .delete(`${host}/cars/${id}`, {
            headers: {
              Authorization: "Bearer " + user?.access_token,
            },
          })
          .then(res => {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Data berhasil dihapus",
              timer: 3000,
            })
            setCars({ ...cars, get: true })
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

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter)
  }

  useEffect(() => {
    if (refetch === true) {
      setIsLoading(true)
      axios
        .get(
          `${host}/cars?${makeQuery({
            order_by: filter.order_by,
            name: filter.name,
            transmission: filter.transmission,
            location: filter.location,
            condition: filter.condition,
            min_price: filter.min_price,
            max_price: filter.max_price,
            min_km: filter.min_km,
            max_km: filter.max_km,
            min_year: filter.min_year,
            max_year: filter.max_year,
            color: filter.color,
            brand_name: filter.brand_name,
            type_name: filter.type_name,
            user_name: filter.user_name,
            price_range: filter.price_range,
            page: filter.page,
          })}`,
          {
            headers: {
              Authorization: "Bearer " + user.access_token,
            },
          },
        )
        .then(res => {
          setCars({
            get: false,
            data: res.data.data,
          })
          setRefetch(false)
          setIsLoading(false)
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.response.data.message ?? "Terjadi kesalahan",
          })
          setIsLoading(false)
          setRefetch(false)
          setCars({
            get: false,
            data: null,
          })
        })
    }
  }, [refetch])

  useEffect(() => {
    if (cars.get)
      axios
        .get(`${host}/cars?order_by=terbaru`, {
          headers: {
            Authorization: "Bearer " + user.access_token,
          },
        })
        .then(res => {
          setCars({
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
          setCars({
            data: null,
            get: false,
          })
        })
    if (!masterData.brands) {
      axios
        .get(`${host}/brands`)
        .then(res => {
          setMasterData({ ...masterData, brands: res.data.data })
        })
        .catch(err => {
          setMasterData({ ...masterData, brands: null })
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.response.data.message ?? "",
          })
        })
    }
    if (!masterData.types) {
      axios
        .get(`${host}/types`)
        .then(res => {
          setMasterData({ ...masterData, types: res.data.data })
        })
        .catch(err => {
          setMasterData({ ...masterData, types: null })
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.response.data.message ?? "",
          })
        })
    }
  }, [cars, masterData])

  return (
    <>
      <Show>
        <Show.When isTrue={cars.get === true || isLoading === true}>
          <div className="flex w-auto justify-center">
            <div className="flex items-center text-lg">
              <Image src={"/icons/loading.svg"} alt="" width={42} height={42} /> Loading
            </div>
          </div>
        </Show.When>
        <Show.Else>
          <Row>
            <Col span={12}>
              <div className="flex h-full w-auto items-center gap-4">
                <h4 className="text-lg ">Filter</h4>
                <div className=" relative">
                  <Button icon={<FaFilter />} onClick={handleOpenFilter}>
                    Sort by
                  </Button>
                  <Show>
                    <Show.When isTrue={openFilter === true}>
                      <div className=" absolute top-10 z-50 rounded-md bg-white p-4 shadow-lg shadow-gray-500">
                        <Row align="top">
                          <Space align="start" size={"middle"}>
                            <Col span={6}>
                              <Space direction="vertical" style={{ marginBottom: "8px" }}>
                                <Text>Urutkan berdasarkan</Text>
                                <Select
                                  showSearch
                                  value={filter.order_by}
                                  style={{
                                    width: 180,
                                  }}
                                  placeholder="Urutkan berdasarkan"
                                  optionFilterProp="children"
                                  onChange={onChangeOrderBy}
                                  filterOption={filterOption}
                                  options={[
                                    {
                                      value: "terbaru",
                                      label: "Terbaru",
                                    },
                                    {
                                      value: "terlama",
                                      label: "Terlama",
                                    },
                                  ]}
                                />
                              </Space>
                              <Space direction="vertical" style={{ marginBottom: "8px" }}>
                                <Text>Lokasi</Text>
                                <Select
                                  showSearch
                                  value={filter.location}
                                  style={{
                                    width: 180,
                                  }}
                                  placeholder="Lokasi"
                                  optionFilterProp="children"
                                  onChange={onChangeLocation}
                                  filterOption={filterOption}
                                  options={[
                                    { value: "jakarta", label: "Jakarta" },
                                    { value: "bogor", label: "Bogor" },
                                    { value: "depok", label: "Depok" },
                                    { value: "tangerang", label: "Tangerang" },
                                    { value: "bekasi", label: "Bekasi" },
                                  ]}
                                />
                              </Space>
                              <Space direction="vertical" style={{ marginBottom: "8px" }}>
                                <Text>Min Kilometer</Text>
                                <InputNumber
                                  value={filter.min_km}
                                  style={{
                                    width: 180,
                                  }}
                                  placeholder="Min Kilometer"
                                  onChange={onChangeMinKm}
                                />
                              </Space>
                              <Space direction="vertical" style={{ marginBottom: "8px" }}>
                                <Text>Min Harga</Text>
                                <InputNumber
                                  value={filter.min_price}
                                  style={{
                                    width: 180,
                                  }}
                                  placeholder="Min harga"
                                  onChange={onChangeMinPrice}
                                />
                              </Space>
                            </Col>
                            <Col span={6}>
                              <Space direction="vertical" style={{ marginBottom: "8px" }}>
                                <Text>Penjual</Text>
                                <Input
                                  size="small"
                                  className="!border-gray-300 !p-2"
                                  value={filter.user_name}
                                  style={{
                                    width: 180,
                                    borderRadius: "8px",
                                  }}
                                  placeholder="Penjual"
                                  onChange={onChangeUserName}
                                />
                              </Space>
                              <Space direction="vertical" style={{ marginBottom: "8px" }}>
                                <Text>Kondisi Mobil</Text>
                                <Select
                                  showSearch
                                  value={filter.condition}
                                  style={{
                                    width: 180,
                                  }}
                                  placeholder="Kondisi Mobil"
                                  optionFilterProp="children"
                                  onChange={onChangeCondition}
                                  filterOption={filterOption}
                                  options={[
                                    {
                                      value: "baru",
                                      label: "Baru",
                                    },
                                    {
                                      value: "bekas",
                                      label: "Bekas",
                                    },
                                  ]}
                                />
                              </Space>
                              <Space direction="vertical" style={{ marginBottom: "8px" }}>
                                <Text>Max Kilometer</Text>
                                <InputNumber
                                  value={filter.max_km}
                                  style={{
                                    width: 180,
                                  }}
                                  placeholder="Max Kilometer"
                                  onChange={onChangeMaxKm}
                                />
                              </Space>
                              <Space direction="vertical" style={{ marginBottom: "8px" }}>
                                <Text>Max Harga</Text>
                                <InputNumber
                                  value={filter.max_km}
                                  style={{
                                    width: 180,
                                  }}
                                  placeholder="Max harga"
                                  onChange={onChangeMaxPrice}
                                />
                              </Space>
                            </Col>
                            <Col span={6}>
                              <Space direction="vertical" style={{ marginBottom: "8px" }}>
                                <Text>Brand</Text>
                                <Select
                                  showSearch
                                  value={filter.brand_name}
                                  style={{
                                    width: 180,
                                  }}
                                  placeholder="Brand"
                                  optionFilterProp="children"
                                  onChange={onChangeBrand}
                                  filterOption={filterOption}
                                  options={masterData.brands?.map((item, index) => {
                                    return {
                                      value: `${item.name.toLowerCase()}`,
                                      label: `${item.name}`,
                                    }
                                  })}
                                />
                              </Space>
                              <Space direction="vertical" style={{ marginBottom: "8px" }}>
                                <Text>Transmisi</Text>
                                <Select
                                  showSearch
                                  value={filter.transmission}
                                  style={{
                                    width: 180,
                                  }}
                                  placeholder="Transmisi"
                                  optionFilterProp="children"
                                  onChange={onChangeTransmission}
                                  filterOption={filterOption}
                                  options={[
                                    {
                                      value: "manual",
                                      label: "Manual",
                                    },
                                    {
                                      value: "automatic",
                                      label: "Automatic",
                                    },
                                  ]}
                                />
                              </Space>
                              <Space direction="vertical" style={{ marginBottom: "8px" }}>
                                <Text>Min Tahun</Text>
                                <Select
                                  showSearch
                                  value={filter.min_year}
                                  style={{
                                    width: 180,
                                  }}
                                  placeholder="Min Tahun"
                                  optionFilterProp="children"
                                  onChange={onChangeMinYear}
                                  filterOption={filterOption}
                                  options={[
                                    { value: "2002", label: "2002" },
                                    { value: "2003", label: "2003" },
                                    { value: "2004", label: "2004" },
                                    { value: "2005", label: "2005" },
                                    { value: "2006", label: "2006" },
                                    { value: "2007", label: "2007" },
                                    { value: "2008", label: "2008" },
                                    { value: "2009", label: "2009" },
                                    { value: "2010", label: "2010" },
                                    { value: "2011", label: "2011" },
                                    { value: "2012", label: "2012" },
                                    { value: "2013", label: "2013" },
                                    { value: "2014", label: "2014" },
                                    { value: "2015", label: "2015" },
                                    { value: "2016", label: "2016" },
                                    { value: "2017", label: "2017" },
                                    { value: "2018", label: "2018" },
                                    { value: "2019", label: "2019" },
                                    { value: "2020", label: "2020" },
                                    { value: "2021", label: "2021" },
                                    { value: "2022", label: "2022" },
                                    { value: "2023", label: "2023" },
                                    { value: "2024", label: "2024" },
                                  ]}
                                />
                              </Space>
                              <Space direction="vertical" style={{ marginBottom: "8px" }}>
                                <Text>Warna</Text>
                                <Input
                                  size="small"
                                  className="!border-gray-300 !p-2"
                                  value={filter.color}
                                  style={{
                                    width: 180,
                                    borderRadius: "8px",
                                  }}
                                  placeholder="Warna"
                                  onChange={onChangeColor}
                                />
                              </Space>
                            </Col>
                            <Col span={6}>
                              <Space direction="vertical" style={{ marginBottom: "8px" }}>
                                <Text>Tipe Bahan Bakar</Text>
                                <Select
                                  showSearch
                                  value={filter.type_name}
                                  style={{
                                    width: 180,
                                  }}
                                  placeholder="Tipe bahan bakar"
                                  optionFilterProp="children"
                                  onChange={onChangeType}
                                  filterOption={filterOption}
                                  options={masterData.types?.map((item, index) => {
                                    return {
                                      value: `${item.name.toLowerCase()}`,
                                      label: `${item.name}`,
                                    }
                                  })}
                                />
                              </Space>
                              <Space direction="vertical" style={{ marginBottom: "8px" }}>
                                <Text>Price Range</Text>
                                <Select
                                  showSearch
                                  value={filter.price_range}
                                  style={{
                                    width: 180,
                                  }}
                                  placeholder="Price Range"
                                  optionFilterProp="children"
                                  onChange={onChangePriceRange}
                                  filterOption={filterOption}
                                  options={[
                                    {
                                      value: "termurah",
                                      label: "Termurah",
                                    },
                                    {
                                      value: "termahal",
                                      label: "Termahal",
                                    },
                                  ]}
                                />
                              </Space>
                              <Space direction="vertical" style={{ marginBottom: "8px" }}>
                                <Text>Max Tahun</Text>
                                <Select
                                  showSearch
                                  value={filter.max_year}
                                  style={{
                                    width: 180,
                                  }}
                                  placeholder="Max Tahun"
                                  optionFilterProp="children"
                                  onChange={onChangeMaxYear}
                                  filterOption={filterOption}
                                  options={[
                                    { value: "2002", label: "2002" },
                                    { value: "2003", label: "2003" },
                                    { value: "2004", label: "2004" },
                                    { value: "2005", label: "2005" },
                                    { value: "2006", label: "2006" },
                                    { value: "2007", label: "2007" },
                                    { value: "2008", label: "2008" },
                                    { value: "2009", label: "2009" },
                                    { value: "2010", label: "2010" },
                                    { value: "2011", label: "2011" },
                                    { value: "2012", label: "2012" },
                                    { value: "2013", label: "2013" },
                                    { value: "2014", label: "2014" },
                                    { value: "2015", label: "2015" },
                                    { value: "2016", label: "2016" },
                                    { value: "2017", label: "2017" },
                                    { value: "2018", label: "2018" },
                                    { value: "2019", label: "2019" },
                                    { value: "2020", label: "2020" },
                                    { value: "2021", label: "2021" },
                                    { value: "2022", label: "2022" },
                                    { value: "2023", label: "2023" },
                                    { value: "2024", label: "2024" },
                                  ]}
                                />
                              </Space>
                            </Col>
                          </Space>
                        </Row>
                        <Button
                          size="large"
                          type="primary"
                          icon={<FaSearch />}
                          className="!float-end"
                          onClick={handleSearchSort}
                        >
                          Search
                        </Button>
                      </div>
                    </Show.When>
                  </Show>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="!float-end !w-auto">
                <Search
                  style={{
                    width: 300,
                  }}
                  placeholder="input search text"
                  allowClear
                  enterButton="Search"
                  size="large"
                  onChange={onChangeSearch}
                  onSearch={onSearch}
                />
              </div>
            </Col>
          </Row>
          <div className="mt-4 overflow-x-auto">
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
                {cars.data?.data?.length ? (
                  cars.data?.data?.map((item, index) => (
                    <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {" "}
                        {item?.name}
                      </Table.Cell>
                      <Table.Cell>{limitString(item?.description, 30)}</Table.Cell>
                      <Table.Cell>{item?.price}</Table.Cell>
                      <Table.Cell>{item?.transmission}</Table.Cell>
                      <Table.Cell>{item?.condition}</Table.Cell>
                      <Table.Cell>{item?.year}</Table.Cell>
                      <Table.Cell>{item?.km}</Table.Cell>
                      <Table.Cell>{item?.stock}</Table.Cell>
                      <Table.Cell>{item?.color}</Table.Cell>
                      <Table.Cell>{item?.location}</Table.Cell>
                      <Table.Cell>{limitString(item?.image, 30)}</Table.Cell>
                      <Table.Cell>{item?.brand_name}</Table.Cell>
                      <Table.Cell>{item?.type_name}</Table.Cell>
                      <Table.Cell>{item?.user_name}</Table.Cell>
                      <Table.Cell>
                        <div className="flex justify-center">
                          <div
                            className="cursor-pointer font-medium text-cyan-600 hover:underline dark:text-cyan-500"
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
          <div className="float-end mt-8 w-auto">
            <Pagination
              current={current}
              onChange={onChangePage}
              total={cars.data?.total}
              pageSize={cars.data?.per_page}
            />
          </div>
        </Show.Else>
      </Show>
    </>
  )
}

export default Product
