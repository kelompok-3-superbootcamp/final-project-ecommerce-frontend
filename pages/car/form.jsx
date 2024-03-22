"use client"

import { Label, TextInput, Select, Textarea, FileInput } from "flowbite-react"
import { Button } from "flowbite-react"
import useSWR from "swr"
import { useRef } from "react"
import { useAuthStore } from "@/stores/auth"
import { host } from "@/utils/constant"
import UploadButton from "@/components/uploadthing/UploadButton"
import { useState } from "react"
import axios from "axios"
import { generateReactHelpers } from "@uploadthing/react"
import { useRouter } from "next/router"
import Swal from "sweetalert2"

const { uploadFiles } = generateReactHelpers()

const fetcher = ([url, header]) => fetch(`${host}${url}`, { headers: header }).then(res => res.json())

export default function Form() {
  const router = useRouter()
  const [file, setFile] = useState([])
  const [beginUpload, setBeginUpload] = useState(false)

  const changeHandler = e => {
    if (e.target.files) {
      const file = e.target.files[0]

      // Max 4MB
      if (file.size > 1024 * 3000) {
        return alert("Ukuran file terlalu besar")
      }

      setFile(file)
    }
  }

  let formRef = useRef()
  const { user, logout } = useAuthStore()
  let header = { Authorization: `Bearer ${user?.access_token}` }
  const { data: brands, error: err1, isLoading: is1 } = useSWR(["/brands", header], fetcher)
  const { data: types, error: err2, isLoading: is2 } = useSWR(["/types", header], fetcher)
  const handleSubmit = async e => {
    e.preventDefault()
    if (!file) return alert("File kosong")

    const formData = new FormData()
    formData.append("file", file)

    setBeginUpload(true)

    try {
      const uploadResponse = await uploadFiles("imageUploader", {
        files: [file],
      })

      console.log(uploadResponse) // Array

      var url = uploadResponse[0].url

      let {
        brand_id: { value: brand_id },
        name: { value: name },
        year: { value: year },
        price: { value: price },
        transmission: { value: transmission },
        condition: { value: condition },
        km: { value: km },
        stock: { value: stock },
        description: { value: description },
        color: { value: color },
        location: { value: location },
        type_id: { value: type_id },
      } = formRef.current
      console.log(header)
      let body = {
        brand_id,
        name,
        year,
        price,
        transmission,
        condition,
        km,
        stock,
        description,
        color,
        location,
        type_id,
        image: url,
      }

      console.log("bodi", body)

      axios
        .post(`${host}/cars`, body, { headers: header })
        .then(res => {
          console.log("hai :", res)
          setBeginUpload(false)
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Selamat! Mobil mu berhasil di Post",
          });
          router.push("/home")
        })
        .catch(err => {
          console.log("erorny:", err)
        })

      // upload ke database, si `url` nya...
    } catch (err) {
      console.log("test :", err)
      alert("Gagal upload, mohon upload ulang")
    }
  }
  return (
    <form ref={formRef} onSubmit={handleSubmit} className="m-auto flex max-w-md flex-col gap-4 p-8">
      <div className="mb-2 block">
        <Label htmlFor="brand" value="Brand" />
      </div>
      <Select id="brand" name="brand_id" required>
        {brands?.data?.map((item, index) => (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Merk" />
        </div>
        <TextInput required id="base" type="text" sizing="md" name="name" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Tahun" />
        </div>
        <TextInput required id="base" type="number" sizing="md" name="year" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Harga" />
        </div>
        <TextInput required id="base" type="number" sizing="md" name="price" />
      </div>
      <div className="mb-2 block">
        <Label htmlFor="brand" value="Pilih Transmisi" />
      </div>
      <Select id="transmisi" name="transmission" required>
        <option value={"automatic"}>Automatic</option>
        <option value={"manual"}>Manual</option>
      </Select>
      <div className="mb-2 block">
        <Label htmlFor="condition" value="Pilih Kondisi Mobil" />
      </div>
      <Select id="condition" name="condition" required>
        <option value={"bekas"}>Bekas</option>
        <option value={"baru"}>Baru</option>
      </Select>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Kilometer" />
        </div>
        <TextInput required id="base" type="number" sizing="md" name="km" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Warna" />
        </div>
        <TextInput required id="base" type="text" sizing="md" name="color" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Lokasi Mobil" />
        </div>
        <TextInput required id="base" type="text" sizing="md" name="location" />
      </div>
      <div className="mb-2 block">
        <Label htmlFor="type" value="Pilih Tipe Mobil" />
      </div>
      <Select id="type" name="type_id" required>
        {types?.data?.map((item, index) => (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Stok" />
        </div>
        <TextInput required id="base" type="number" sizing="md" name="stock" />
      </div>
      <div className="mb-2 block">
        <Label htmlFor="description" value="Isi deskripsi mobil" />
      </div>
      <Textarea required id="description" placeholder="Isi deskripsi mobil" rows={4} name="description" />
      <div className="mb-2 block">
        <Label htmlFor="file" value="Upload Gambar Mobil" />
      </div>
      <div className="flex">
        <input required type="file" multiple={false} accept="image/*" onChange={changeHandler} />
      </div>

      <input
        disabled={beginUpload ? true : false}
        className="cursor-pointer rounded bg-slate-900 p-2 font-bold text-white"
        type="submit"
        value={beginUpload ? "Loading..." : "Jual Sekarang"}
      />
    </form>
  )
}
