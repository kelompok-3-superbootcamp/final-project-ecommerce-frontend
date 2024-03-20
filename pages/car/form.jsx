
'use client';

import { Label, TextInput } from 'flowbite-react';
import { Button } from 'flowbite-react';
export default function Form() {
  return (
    <div className="flex max-w-md flex-col gap-4 m-auto p-8">
      <div>
        <div className="mb-2 block"> 
          <Label htmlFor="small" value="Small input" />
        </div>
        <TextInput id="small" type="text" sizing="sm" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Base input" />
        </div>
        <TextInput id="base" type="text" sizing="md" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="large" value="Large input" />
        </div>
        <TextInput id="large" type="text" sizing="lg" />
      </div>
      <Button>Jual Sekarang</Button>
    </div>
  );
}
