import { SubmitButton } from "@/components/SubmitButton"
import { EmailInput, PasswordInput, TextInput2 } from "@/components/Forms"
import { useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { useRouter } from "next/router"
import Link from "next/link"
import axios from "axios"
import Swal from "sweetalert2"
import { host } from "@/utils/constant"

const Register = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
  })

  function handleChange(e) {
    const { value, name } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios
      .post(`${host}/auth/register`, formData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil Registrasi",
          text: "Silahkan login untuk melanjutkan",
        })
        router.push("/auth/login")
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: err?.response?.data?.message ?? "Registrasi Gagal",
        })
      })
  }

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-red-500 bg-gradient-to-tl from-blue-500 via-green-500">
      <Link href={"/"}>
        <div className="absolute left-5 top-5 flex items-center gap-2 text-white">
          <FaArrowLeft className="text-white" />
          <p className="text-xl">Home</p>
        </div>
      </Link>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-lg bg-white bg-opacity-50 p-10 shadow-lg shadow-gray-300 backdrop-blur-lg"
      >
        <h1 className="text-center text-3xl font-bold">Register</h1>
        <TextInput2
          name="name"
          className="w-96 border-b border-black bg-transparent px-2 pb-2 focus:outline-none"
          placeholder="Name"
          value={formData.name}
          required={true}
          onChange={handleChange}
        />
        <EmailInput
          name="email"
          className="w-96 border-b border-black bg-transparent px-2 pb-2 focus:outline-none"
          placeholder="Email"
          value={formData.email}
          required={true}
          onChange={handleChange}
        />
        <TextInput2
          label="Phone Number"
          name="phone_number"
          className="w-96 border-b border-black bg-transparent px-2 pb-2 focus:outline-none"
          placeholder="Phone Number"
          value={formData.phone_number}
          required={true}
          onChange={handleChange}
        />
        <PasswordInput
          name="password"
          className="w-96 border-b border-black bg-transparent px-2 pb-2 focus:outline-none"
          placeholder="Password"
          value={formData.password}
          required={true}
          onChange={handleChange}
        />
        <SubmitButton text="Register" className="w-full rounded-md bg-blue-600 p-2 text-white" />
        <p className="text-center text-sm text-black">
          Don&apos;t have an account{" "}
          <span className="cursor-pointer underline hover:text-blue-500">
            <Link href={"/auth/login"}>Login here</Link>
          </span>
          .
        </p>
      </form>
    </div>
  )
}

export default Register
