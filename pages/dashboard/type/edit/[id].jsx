import { Button, Form, Input, Select, Space } from "antd"
import { host } from "@/utils/constant"
import axios from "axios"
import Swal from "sweetalert2"
import { useState } from "react"
import { useAuthStore } from "../../../../stores/auth"
import { useRouter } from "next/router"

export async function getServerSideProps(ctx) {
  const props = {
    perdata: null,
  }

  try {
    const res = await axios.get(`${host}/types/${ctx.query.id}`)
    props.perdata = res.data.data
  } catch (err) {
    props.perdata = null
  }

  console.log(props, `${host}/types/${ctx.query.id}`)

  return {
    props,
  }
}

const EditType = ({ perdata }) => {
  const user = useAuthStore(state => state.user)
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const onFinish = async values => {
    setIsLoading(true)

    try {
      const response = await axios.put(
        `${host}/types/${perdata.id}`,
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
        text: "Berhasil edit type, Redirect ke halama type dalam 2 detik",
      })
      console.log(response)

      setTimeout(() => {
        router.push("/dashboard/type")
      }, 2000)
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err?.response.data.message.name[0] ?? "Edit Gagal",
      })
    }

    setIsLoading(false)
  }

  return (
    <Form
      form={form}
      initialValues={{
        name: perdata.name,
        description: perdata.description,
      }}
      layout="vertical"
      name="control-hooks"
      onFinish={onFinish}
    >
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
            {isLoading ? "Loading.." : "Edit"}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default EditType
