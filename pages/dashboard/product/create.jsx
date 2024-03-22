import { host } from "@/utils/constant"
import { Button, Checkbox, Form, Input, InputNumber, Radio, Select } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export async function getServerSideProps() {
  const props = {
    prebrands: null,
    pretypes: null,
  }
  try {
    const resBrand = await axios.get(`${host}/brands`)
    props.prebrands = resBrand.data.data
    const resType = await axios.get(`${host}/types`)
    props.pretypes = resType.data.data
  } catch (err) {
    props.prebrands = null
    props.pretypes = null
  }
  return { props }
}

const AddCar = props => {
  const [brands, setBrands] = useState(props.prebrands)
  const [types, setTypes] = useState(props.pretypes)

  useEffect(() => {
    if (!brands)
      axios
        .get(`${host}/brands`)
        .then(res => {
          setBrands(res.data.data)
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.response.data.message ?? "",
          })
        })

    if (!types)
      axios
        .get(`${host}/types`)
        .then(res => {
          setTypes(res.data.data)
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: err.response.data.message ?? "",
          })
        })
  }, [brands, types])
  const onFinish = values => {
    console.log("Success:", values)
  }
  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo)
  }
  return (
    <>
      <Form
        name="basic"
        labelAlign="left"
        labelWrap={true}
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 19,
        }}
        initialValues={{
          remember: true,
        }}
        size={"large"}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* Model */}
        <Form.Item
          label="Model"
          colon={false}
          name="name"
          rules={[
            {
              required: true,
              message: "Masukkan nama model mobil anda",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Desc */}
        <Form.Item
          label="Deskripsi"
          colon={false}
          name="description"
          rules={[
            {
              required: true,
              message: "Masukkan deskripsi mobil anda",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Price */}
        <Form.Item
          label="Harga"
          colon={false}
          name="Price"
          rules={[
            {
              required: true,
              message: "Masukkan harga mobil anda",
            },
          ]}
        >
          <InputNumber className="!w-full" />
        </Form.Item>

        {/* Warna */}
        <Form.Item
          label="Warna"
          colon={false}
          name="color"
          rules={[
            {
              required: true,
              message: "Masukkan warna mobil anda",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Transmisi */}
        <Form.Item
          label="Transmisi"
          colon={false}
          name="transmission"
          rules={[
            {
              required: true,
              message: "Masukkan jenis transmisi mobil anda",
            },
          ]}
        >
          <Select
            defaultValue="disabled"
            style={{
              width: 250,
            }}
            options={[
              {
                value: "disabled",
                label: "Pilih Transmisi",
                disabled: true,
              },
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
        </Form.Item>

        {/* Kondisi */}
        <Form.Item
          label="Kondisi"
          colon={false}
          name="condition"
          rules={[
            {
              required: true,
              message: "Masukkan kondisi mobil anda",
            },
          ]}
        >
          <Radio.Group>
            <Radio value="baru"> Baru </Radio>
            <Radio value="bekas"> Bekas </Radio>
          </Radio.Group>
        </Form.Item>

        {/* Tahun */}
        <Form.Item
          label="Tahun"
          colon={false}
          name="year"
          rules={[
            {
              required: true,
              message: "Masukkan tahun produksi mobil anda",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Kilometer */}
        <Form.Item
          label="Kilometer"
          colon={false}
          name="km"
          rules={[
            {
              required: true,
              message: "Masukkan total jarak tempuh mobil anda",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Stock */}
        <Form.Item
          label="Stock"
          colon={false}
          name="stock"
          rules={[
            {
              required: true,
              message: "Masukkan stok mobil anda",
            },
          ]}
        >
          <InputNumber className="!w-full" />
        </Form.Item>

        {/* Url Gambar */}
        <Form.Item
          label="Url Gambar"
          colon={false}
          name="image"
          rules={[
            {
              required: true,
              message: "Masukkan url gambar mobil anda",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Brand */}
        <Form.Item
          label="Brand"
          colon={false}
          name="brand_id"
          rules={[
            {
              required: true,
              message: "Masukkan brand mobil anda",
            },
          ]}
        >
          <Select
            placeholder={"Pilih merek mobil anda"}
            style={{
              width: 250,
            }}
            options={brands.map(item => {
              return {
                value: item.id,
                label: item.name,
              }
            })}
          />
        </Form.Item>

        {/* Tipe Bahan Bakar */}
        <Form.Item
          label="Tipe Bahan Bakar"
          colon={false}
          name="type_id"
          rules={[
            {
              required: true,
              message: "Masukkan tipe bahan bakar mobil anda",
            },
          ]}
        >
          <Select
            placeholder={"Pilih tipe bahan bakar mobil anda"}
            style={{
              width: 250,
            }}
            options={types.map(item => {
              return {
                value: item.id,
                label: item.name,
              }
            })}
          />
        </Form.Item>

        {/* Lokasi */}
        <Form.Item
          label="Lokasi"
          colon={false}
          name="location"
          rules={[
            {
              required: true,
              message: "Masukkan lokasi anda",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="!mt-10"
          wrapperCol={{
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default AddCar
