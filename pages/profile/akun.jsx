import { useAuthStore } from "@/stores/auth"
import { useState } from "react"
import Swal from "sweetalert2"
import axios from "axios"
import { host } from "@/utils/constant"
import { useRouter } from "next/router"

const AkunPage = () => {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [data, setData] = useState({
    old_password: "",
    new_password: "",
    password_confirmation: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [confirmationErrorMessage, setConfirmationErrorMessage] = useState(null)

  const handleChangePassword = async e => {
    e.preventDefault()

    setIsLoading(true)

    try {
      const response = await axios.post(`${host}/auth/change-password`, data, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      })

      console.log(response.data)

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Berhasil ganti password, Silahkan login ulang dalam 2 detik",
      })

      setTimeout(() => {
        logout()
        router.push("/auth/login")
      }, 2000)
    } catch (err) {
      if (err.response.data.message.password_confirmation) {
        setConfirmationErrorMessage(err.response.data.message.password_confirmation[0])
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Cek kredensial mu",
        })
      }
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold">Autentikasi Akun</h1>
        <p className="text-sm">Ubah password</p>

        <form onSubmit={handleChangePassword} className="mt-4 w-max">
          <div className=" space-y-2">
            <div className="flex flex-col space-y-2">
              <label htmlFor="old_password" className="text-base font-bold text-black/80">
                Password Lama
              </label>
              <input
                onChange={e =>
                  setData({
                    ...data,
                    old_password: e.target.value,
                  })
                }
                id="old_password"
                type="password"
                className="rounded-md border px-1.5 py-1 outline-none"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="new_password" className="text-base font-bold text-black/80">
                Password Baru
              </label>
              <input
                onChange={e =>
                  setData({
                    ...data,
                    new_password: e.target.value,
                  })
                }
                id="new_password"
                type="password"
                className="rounded-md border px-1.5 py-1 outline-none"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="new_password" className="text-base font-bold text-black/80">
                Konfirmasi Password Baru
              </label>
              <input
                onChange={e =>
                  setData({
                    ...data,
                    password_confirmation: e.target.value,
                  })
                }
                id="new_password"
                type="password"
                className="rounded-md border px-1.5 py-1 outline-none"
              />
              {confirmationErrorMessage && <p className="text-red-600">{confirmationErrorMessage}</p>}
            </div>
          </div>

          <button disabled={isLoading} type="submit" className="mt-4 rounded-md bg-sky-600 px-4 py-2 text-white">
            {isLoading ? "Proses.." : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AkunPage
