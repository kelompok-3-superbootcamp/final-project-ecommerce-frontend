import { useAuthStore } from "@/stores/auth"
import { host } from "@/utils/constant"
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select } from "antd"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const AddVoucher = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { user } = useAuthStore()

  const onFinish = fieldsValue => {
    const values = {
      ...fieldsValue,
      expired_at: fieldsValue["expired_at"].format("YYYY-MM-DD HH:mm:ss"),
    }
    setIsLoading(true)
    axios
      .post(`${host}/vouchers`, values, {
        headers: {
          Authorization: "Bearer " + user.access_token,
        },
      })
      .then(res => {
        setIsLoading(false)
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Voucher berhasil ditambahkan. Beralih ke halaman list voucher dalam 5 detik",
          timer: 5000,
        }).then(response => {
          if (response.isConfirmed || response.isDismissed) {
            router.push("/dashboard/voucher")
          }
        })
        setTimeout(() => {
          router.push("/dashboard/voucher")
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
        {/* Kode Voucher */}
        <Form.Item
          hasFeedback
          validateFirst
          label="Kode Voucher"
          colon={false}
          name="voucher_code"
          rules={[
            {
              required: true,
              message: "Masukkan kode voucher",
            },
            {
              min: 5,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Diskon */}
        <Form.Item
          label="Diskon"
          colon={false}
          name="discount_value"
          rules={[
            {
              required: true,
              message: "Masukkan diskon",
            },
          ]}
        >
          <InputNumber className="!w-full" />
        </Form.Item>

        {/* Tipe Voucher */}
        <Form.Item
          label="Tipe Voucher"
          colon={false}
          name="discount_type"
          rules={[
            {
              required: true,
              message: "Pilih tipe voucher",
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
                label: "Pilih tipe voucher",
                disabled: true,
              },
              {
                value: "percentage",
                label: "Persen",
              },
              {
                value: "nominal",
                label: "Nominal",
              },
            ]}
          />
        </Form.Item>

        {/* Quota */}
        <Form.Item
          label="Quota"
          colon={false}
          name="quota"
          rules={[
            {
              required: true,
              message: "Masukkan quota",
            },
          ]}
        >
          <InputNumber className="!w-full" />
        </Form.Item>

        {/* Tanggal Expire */}
        <Form.Item
          label="Tanggal Expire"
          colon={false}
          name="expired_at"
          rules={[
            {
              type: "object",
              required: true,
              message: "Masukkan tanggal expire",
            },
          ]}
        >
          <DatePicker showTime />
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

export default AddVoucher
