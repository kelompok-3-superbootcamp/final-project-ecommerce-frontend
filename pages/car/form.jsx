
'use client';

import { Label, TextInput, Select, Textarea, FileInput } from 'flowbite-react';
import { Button } from 'flowbite-react';
import useSWR from 'swr';
import { useRef } from 'react';
import {useAuthStore} from "@/stores/auth"
import { host } from '@/utils/constant';

const fetcher = ([url, header]) => fetch(`${host}${url}`, {headers: header}).then(res => res.json())

export default function Form() {
  let formRef = useRef()
  const {user, logout} = useAuthStore()
  let header = {Authorization: `Bearer ${user?.access_Token}`}
  // console.log(user?.access_token)
  const { data:brands, error:err1, isLoading:is1 } = useSWR(['/brands', header], fetcher)
  const { data:types, error:err2, isLoading:is2 } = useSWR(['/types', header], fetcher)
  console.log(brands?.data)
  const handleSubmit = async(e) => {
    e.preventDefault()
    let {mahasiswa_id:{value:mahasiswa_id}, dosen_id:{value:dosen_id}, hari:{value:hari}, jam_mulai:{value:jam_mulai}, jam_selesai:{value:jam_selesai}} = formRef.current
  }
  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4 m-auto p-8">
      <div className="mb-2 block">
        <Label htmlFor="brand" value="Brand" />
      </div>
      <Select id="brand" name='brand_id' required>
        {brands?.data?.map((item, index) => (<option key={index} value={item.id}>{item.name}</option>))}
      </Select>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Merk" />
        </div>
        <TextInput id="base" type="text" sizing="md" name='name'/>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Tahun" />
        </div>
        <TextInput id="base" type="number" sizing="md" name='year'/>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Harga" />
        </div>
        <TextInput id="base" type="number" sizing="md" name='price'/>
      </div><div className="mb-2 block">
        <Label htmlFor="brand" value="Pilih Transmisi" />
      </div>
      <Select id="transmisi" name='transmission' required>
        <option value={'Automatic'}>Automatic</option>
        <option value={'Manual'}>Manual</option>
      </Select><div className="mb-2 block">
        <Label htmlFor="condition" value="Pilih Kondisi Mobil" />
      </div>
      <Select id="condition" name='condition' required>
        <option value={'Bekas'}>Bekas</option>
        <option value={'Baru'}>Baru</option>
      </Select><div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Kilometer" />
        </div>
        <TextInput id="base" type="number" sizing="md" name='km'/>
      </div><div className="mb-2 block">
        <Label htmlFor="type" value="Pilih Tipe Mobil" />
      </div>
      <Select id="type" required>
        {types?.data?.map((item, index) => (<option key={index} value={item.id}>{item.name}</option>))}
      </Select><div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Stok" />
        </div>
        <TextInput id="base" type="number" sizing="md" name='stock'/>
      </div>
      <div className="mb-2 block">
        <Label htmlFor="description" value="Isi deskripsi mobil" />
      </div>
      <Textarea id="description" placeholder="Isi deskripsi mobil" required rows={4} name='description'/>
      <div className="mb-2 block">
        <Label htmlFor="file" value="Upload Gambar Mobil" />
      </div>
      <FileInput id="file" helperText="A profile picture is useful to confirm your are logged into your account" />
    

      <Button>Jual Sekarang</Button>
    </form>
  );
}
