
'use client';

import { Label, TextInput, Select, Textarea, FileInput } from 'flowbite-react';
import { Button } from 'flowbite-react';
export default function Form() {
  return (
    <div className="flex max-w-md flex-col gap-4 m-auto p-8">
      <div className="mb-2 block">
        <Label htmlFor="brand" value="Pilih Brand" />
      </div>
      <Select id="brand" required>
        <option>Daihatsu</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </Select>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Merk" />
        </div>
        <TextInput id="base" type="text" sizing="md" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Tahun" />
        </div>
        <TextInput id="base" type="number" sizing="md" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Harga" />
        </div>
        <TextInput id="base" type="number" sizing="md" />
      </div><div className="mb-2 block">
        <Label htmlFor="brand" value="Pilih Transmisi" />
      </div>
      <Select id="transmisi" required>
        <option>Matic</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </Select><div className="mb-2 block">
        <Label htmlFor="condition" value="Pilih Kondisi Mobil" />
      </div>
      <Select id="condition" required>
        <option>Bekas</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </Select><div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Kilometer" />
        </div>
        <TextInput id="base" type="number" sizing="md" />
      </div><div className="mb-2 block">
        <Label htmlFor="type" value="Pilih Tipe Mobil" />
      </div>
      <Select id="type" required>
        <option>Listrik</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </Select><div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Stok" />
        </div>
        <TextInput id="base" type="number" sizing="md" />
      </div>
      <div className="mb-2 block">
        <Label htmlFor="description" value="Isi deskripsi mobil" />
      </div>
      <Textarea id="description" placeholder="Isi deskripsi mobil" required rows={4} />
      <div className="mb-2 block">
        <Label htmlFor="file" value="Upload Gambar Mobil" />
      </div>
      <FileInput id="file" helperText="A profile picture is useful to confirm your are logged into your account" />
    

      <Button>Jual Sekarang</Button>
    </div>
  );
}
