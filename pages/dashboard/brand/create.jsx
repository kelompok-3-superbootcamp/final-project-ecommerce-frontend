import { useAuthStore } from "@/stores/auth"
import { host } from "@/utils/constant"
import { PlusOutlined, UploadOutlined } from "@ant-design/icons"
import { Button, Checkbox, DatePicker, Upload, Form, Input, InputNumber, Radio, Select } from "antd"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { generateReactHelpers } from "@uploadthing/react"

const { uploadFiles } = generateReactHelpers()

const AddBrand = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const router = useRouter()
  const [file, setFile] = useState(null)
  const [beginUpload, setBeginUpload] = useState(false)
  const props = {
    name: "file",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log("info", info.file, info.fileList)
      }
      if (info.file.status === "done") {
        console.log(`${info.file.name} file uploaded successfully`)
        const data = info.file

        // Max 4MB
        if (data.size > 1024 * 3000) {
          return alert("Ukuran file terlalu besar")
        }

        setFile(data)
      } else if (info.file.status === "error") {
        console.log(`${info.file.name} file upload failed.`)
      }
    },
    // onchange(e) {
    //   if (e.target.files) {
    //     const data = e.target.files[0]

    //     // Max 4MB
    //     if (data.size > 1024 * 3000) {
    //       return alert("Ukuran file terlalu besar")
    //     }

    //     setFile(data)
    //   }
    // },
  }

  const changeHandler = e => {
    console.log("e.target.files[0]", e.target.files[0])
    if (e.target.files) {
      const file = e.target.files[0]

      // Max 4MB
      if (file.size > 1024 * 3000) {
        return alert("Ukuran file terlalu besar")
      } else {
        setFile(file)
      }
    }
  }

  const { user } = useAuthStore()

  console.log("file", file)

  const onFinish = async values => {
    // const formData = new FormData()
    // formData.append("file", file)
    // setMessage("Uploading...")

    // try {
    // let uploadResponse = []
    // try {
    //   if (file != 0) {
    //     console.log("filenya", file.length)
    //     uploadResponse = await uploadFiles("imageUploader", {
    //       files: [file],
    //     })
    //   }

    //   console.log(uploadResponse) // Array

    //   const url = uploadResponse[0]?.url

    //   console.log("resnya", uploadResponse) // Array
    // } catch (error) {
    //   alert(error)
    // }

    // if (url) {
    // setMessage("File berhasil diupload")
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
  // } catch (err) {}
  // }

  // useEffect(() => {
  //   if (file) {
  //     setIsLoading(true)
  //     setMessage("Uploading...")
  //     uploadFiles("imageUploader", {
  //       files: [file],
  //     })
  //       .then(res => {
  //         // setIsLoading(false)
  //         // setImageUrl(res[0]?.url)
  //         // setMessage("File berhasil diupload")
  //         console.log("res", res)
  //       })
  //       .catch(err => {
  //         setIsLoading(false)
  //         Swal.fire({
  //           icon: "error",
  //           title: "Gagal Upload",
  //           text: `Gambar gagal di upload. Coba lagi`,
  //         })
  //         console.log("err", err)
  //       })
  //   }
  // }, [file])
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
        <Form.Item label="Logo" colon={false} name="logo_url">
          <Input />
        </Form.Item>
        {/* <div className="flex">
          <label htmlFor="logo_url" className="w-[60px]">
            <span className="text-lg text-red-600">* </span>Logo
          </label>
          <input type="file" name="logo_url" multiple={false} accept="image/*" onChange={changeHandler} />
          {message && (
            <p className={`${message.includes("Uploading...") ? "text-gray-500" : "text-green-500"}`}>{message}</p>
          )}
          <Button type="primary" onClick={handleUpload} disabled={file ? false : true}>
            Upload
          </Button>
        </div> */}

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
