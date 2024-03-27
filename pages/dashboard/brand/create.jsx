import { useAuthStore } from "@/stores/auth"
import { host } from "@/utils/constant"
import { PlusOutlined } from "@ant-design/icons"
import { Button, Checkbox, DatePicker, Upload, Form, Input, InputNumber, Radio, Select } from "antd"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const AddBrand = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { user } = useAuthStore()

  const onFinish = values => {
    setIsLoading(true)
    axios
      .post(`${host}/brands`, values, {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      })
      .then(res => {
        setIsLoading(false)
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Brand berhasil ditambahkan. Beralih ke halaman list brand dalam 5 detik",
          timer: 5000,
        }).then(response => {
          if (response.isConfirmed || response.isDismissed) {
            router.push("/dashboard/brand")
          }
        })
        setTimeout(() => {
          router.push("/dashboard/brand")
        }, 5000)
      })
      .catch(err => {
        setIsLoading(false)
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: `${typeof err.response.data.message !== "object" ? err.response.data.message : ""} Voucher gagal ditambahkan.`,
        })
      })
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
        autoComplete="off"
      >
        {/* Nama Brand */}
        <Form.Item
          label="Nama Brand"
          colon={false}
          name="name"
          rules={[
            {
              required: true,
              message: "Masukkan nama brand",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Logo */}
        <Form.Item
          label="Logo"
          colon={false}
          name="logo_url"
          rules={[
            {
              required: true,
              message: "Masukkan Logo",
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
          <Button type="primary" loading={isLoading} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default AddBrand
