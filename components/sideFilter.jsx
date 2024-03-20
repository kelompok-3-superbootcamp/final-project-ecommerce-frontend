
'use client';

import { Label, Select } from 'flowbite-react';

export default function SideFilter() {
  return (
    <div className='sticky top-0 mt-4'>
    <div className='mx-6 text-white py-2 px-8' style={{backgroundColor: "#01253D"}}>Cari Mobil</div>
    <div className="max-w-md bg-white mx-6 px-8 pb-8">
      <div className="mb-2 block">
        <Label htmlFor="countries" value="Brand" />
      </div>
      <Select id="Brand" required>
        <option>Daihatsu</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </Select>
      <div className="mb-2 block">
        <Label htmlFor="countries" value="Merk" />
      </div>
      <Select id="countries" required>
        <option>Sigra</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </Select><div className="mb-2 block">
        <Label htmlFor="countries" value="Transmisi" />
      </div>
      <Select id="countries" required>
        <option>Matic</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </Select><div className="mb-2 block">
        <Label htmlFor="countries" value="Harga" />
      </div>
      <Select id="countries" required>
        <option>0 - 100.000.000</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </Select><div className="mb-2 block">
        <Label htmlFor="countries" value="Kilometer" />
      </div>
      <Select id="countries" required>
        <option>0 - 5000</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </Select><div className="mb-2 block">
        <Label htmlFor="countries" value="Kondisi" />
      </div>
      <Select id="countries" required>
        <option>Bekas</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </Select>
    </div>
    </div>
  );
}
