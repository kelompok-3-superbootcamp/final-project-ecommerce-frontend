import { SubmitButton } from "@/components/buttons"
import { EmailInput, PasswordInput } from "@/components/forms"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import Swal from "sweetalert2"
import { useAuthStore } from "@/stores/auth"
import { host } from "@/utils/constant"

const Login = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  function handleChange(e) {
    const { value, name } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const { login } = useAuthStore()

  function handleSubmit(e) {
    e.preventDefault()
    axios
      .post(`${host}/auth/login`, formData)
      .then(res => {
        const { email } = formData
        const { access_token, user } = res.data.data
        const { name, role } = res.data.data.user
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Berhasil Login",
        })
        console.log("respon", res.data)
        login({ access_token, email, name, role, user })
        router.push("/home")
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: err?.response.data.message ?? "Login Gagal",
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
        className="flex flex-col gap-6 rounded-lg bg-white bg-opacity-50 p-10 shadow-lg shadow-gray-300 backdrop-blur-lg"
      >
        <h1 className="text-center text-3xl font-bold">Login</h1>
        <EmailInput
          name="email"
          className="w-96 border-b border-black bg-transparent px-2 pb-2 focus:outline-none"
          placeholder="Email"
          value={formData.email}
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
        <SubmitButton text="Login" className="w-full rounded-md bg-blue-600 p-2 text-white" />
        <p className="text-center text-sm text-black">
          Don&apos;t have an account{" "}
          <span className="cursor-pointer underline hover:text-blue-500">
            <Link href={"/auth/register"}>Register here</Link>
          </span>
          .
        </p>
      </form>
    </div>
  )
}

export default Login
