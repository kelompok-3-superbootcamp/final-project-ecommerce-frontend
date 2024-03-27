import { Button, Form, Input, Space } from "antd"
import { host } from "@/utils/constant"
import axios from "axios"
import Swal from "sweetalert2"
import { useState } from "react"
import { useAuthStore } from "@/stores/auth"
import { useRouter } from "next/router"

const CreateType = () => {
  const user = useAuthStore(state => state.user)
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const onFinish = async values => {
    setIsLoading(true)

    try {
      const response = await axios.post(
        `${host}/types`,
        {
          name: values.name,
          description: values.description,
        },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        },
      )

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil create type, Redirect ke halaman type dalam 2 detik",
      })
      console.log(response)

      setTimeout(() => {
        router.push("/dashboard/type")
      }, 2000)
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err?.response.data.message.name[0] ?? "Create Gagal",
      })
    }

    setIsLoading(false)
  }

  return (
    <Form form={form} layout="vertical" name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button disabled={isLoading} type="primary" htmlType="submit">
            {isLoading ? "Loading.." : "Create"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default CreateType
