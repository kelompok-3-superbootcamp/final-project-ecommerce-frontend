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

export default function Form({id}) {
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
  const { data: car, error: err3, isLoading: is3 } = useSWR([`/cars/${id}`, header], fetcher)
  const handleSubmit = async e => {
    e.preventDefault()
    if (!file && !id) return alert("File kosong")

    const formData = new FormData()
    formData.append("file", file)

    setBeginUpload(true)

    try {
      let uploadResponse = []
      if (file != 0) {
        console.log("filenya", file.length)
        uploadResponse = await uploadFiles("imageUploader", {
          files: [file],
        }) 
      }

      console.log(uploadResponse) // Array

      const url = uploadResponse[0]?.url


      console.log('resnya',uploadResponse) // Array

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
        image: url ? url : car.data.image,
      }

      console.log("bodi", body)

      let res

      if (id) {
        console.log("update ya")
        axios
        .put(`${host}/cars/${id}`, body, { headers: header })
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
          alert("erorny:", err)
        })
      } else {
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
      }

      // upload ke database, si `url` nya...
    } catch (err) {
      console.log("test :", err)
      alert("Gagal upload, mohon upload ulang")
      setBeginUpload(false)
      id ? router.push(`/car/edit/${car.data.id}`) : router.push(`/car/create`)
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
        <TextInput required id="base" type="text" sizing="md" name="name" defaultValue={car?.data?.name} placeholder={car?.data?.name}/>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Tahun" />
        </div>
        <TextInput required id="base" type="number" sizing="md" name="year" defaultValue={car?.data?.year} placeholder={car?.data?.year}/>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Harga" />
        </div>
        <TextInput required id="base" type="number" sizing="md" name="price" defaultValue={car?.data?.price} placeholder={car?.data?.price}/>
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
        <TextInput required id="base" type="number" sizing="md" name="km" defaultValue={car?.data?.km} placeholder={car?.data?.km}/>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Warna" />
        </div>
        <TextInput required id="base" type="text" sizing="md" name="color" defaultValue={car?.data?.color} placeholder={car?.data?.color}/>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Lokasi Mobil" />
        </div>
        <TextInput required id="base" type="text" sizing="md" name="location" defaultValue={car?.data?.location} placeholder={car?.data?.location}/>
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
        <TextInput required id="base" type="number" sizing="md" name="stock" defaultValue={car?.data?.stock} placeholder={car?.data?.stock}/>
      </div>
      <div className="mb-2 block">
        <Label htmlFor="description" value="Isi deskripsi mobil" />
      </div>
      <Textarea required id="description" rows={4} name="description" defaultValue={car?.data?.image} placeholder={car ? car?.data?.name : "Isi Deskripsi Mobil..."}/>
      <div className="mb-2 block">
        <Label htmlFor="file" value="Upload Gambar Mobil" />
      </div>
      {car ? 
      <div className="flex">
      <input type="file" multiple={false} accept="image/*" onChange={changeHandler} />
    </div> :
      <div className="flex">
        <input type="file" multiple={false} accept="image/*" onChange={changeHandler} />
      </div>}

      <input
        disabled={beginUpload ? true : false}
        className="cursor-pointer rounded bg-slate-900 p-2 font-bold text-white"
        type="submit"
        value={beginUpload ? "Loading..." : (id ? "Update" : "Jual Sekarang")}
      />
    </form>
  )
}
