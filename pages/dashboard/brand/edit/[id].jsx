import { useAuthStore } from "@/stores/auth"
import { Show } from "@/utils/Show"
import { host } from "@/utils/constant"
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select } from "antd"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import moment from "moment"

export async function getServerSideProps(context) {
  const props = {
    id: context.query.id,
  }
  return { props }
}

const EditBrand = props => {
  const { id } = props
  const [isLoading, setIsLoading] = useState(false)
  const [initialValue, setInitialValue] = useState({
    get: true,
    name: "",
    logo_url: "",
  })
  const router = useRouter()

  const { user } = useAuthStore()

  const onFinish = values => {
    setIsLoading(true)
    axios
      .put(`${host}/brands/${id}`, values, {
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
          text: `${typeof err.response.data.message !== "object" ? err.response.data.message : ""} Brand gagal ditambahkan.`,
        })
      })
  }

  useEffect(() => {
    if (initialValue.get)
      axios
        .get(`${host}/brands/${id}`)
        .then(res => {
          const data = res.data.data
          setInitialValue({
            get: false,
            name: data.name,
            logo_url: data.logo_url,
          })
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: `${typeof err.response.data.message !== "object" ? err.response.data.message : ""} Brand gagal ditambahkan.`,
          })
        })
  }, [id, initialValue.get])
  return (
    <>
      <Show>
        <Show.When isTrue={initialValue.get === true}>
          <div className="flex w-auto justify-center">
            <div className="flex items-center text-lg">
              <Image src={"/icons/loading.svg"} alt="" width={42} height={42} /> Loading
            </div>
          </div>
        </Show.When>
        <Show.Else>
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
            size={"large"}
            onFinish={onFinish}
            autoComplete="off"
            initialValues={{
              name: initialValue.name,
              logo_url: initialValue.logo_url,
              discount_type: initialValue.discount_type,
              quota: initialValue.quota,
              expired_at: initialValue.expired_at,
            }}
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
            <Form.Item label="Logo" colon={false} name="logo_url">
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
        </Show.Else>
      </Show>
    </>
  )
}

export default EditBrand
