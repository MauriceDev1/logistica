"use client"

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Fleet from "@/data/mock/Fleet.json"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { ChartSpline, Minus, Plus } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

const Details = () => {
  const [count, setCount] = useState(1);
  const params = useParams();
  const TruckData = Fleet.find(i => i.id === Number(params.id));

  const increment = () => {
    setCount(prv => prv + 1);
  };

  const decrement = () => {
    if(count === 1) return;
    setCount(prv => prv - 1);
  }

  return (
    <div className='w-full'>
    <div className='pb-3'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/fleet">Fleet</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{TruckData?.make}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
      <div className='w-full flex justify-between text-3xl pb-4'>
        <h1 className='text-gray-600'>
          {`${TruckData?.year} ${TruckData?.make} ${TruckData?.model}`}
        </h1>
        <h1 className='text-customBlue font-semibold'>
          ZAR {TruckData?.price}
        </h1>
      </div>
      <div className='w-full flex gap-5'>
        <div className='w-2/3'>
          <Image
            src={TruckData?.image ?? "/fallback-image.jpg"}
            alt={`${TruckData?.make ?? "Unknown"} ${TruckData?.model ?? "Truck"}`}
            width={1000}
            height={1000}
            className='w-full pb-5'
          />
        </div>
        <div className='w-1/3 sticky top-20 h-36'>
          <Card className="w-[450px] p-5 rounded-sm">
            <div className='w-full flex justify-between text-xl'>
              <h1 className='flex gap-2'><ChartSpline className='text-green-600' /> Price per Block:</h1>
              <h1 className='text-green-600 font-semibold'>R 1000.00</h1>
            </div>
            <Separator className='my-3 bg-gray-300'/>
            <div className=''>
              <p>How many blocks would you like to purchase:</p>
            </div>
            <div className='w-full flex gap-3 py-3'>
                <Button onClick={decrement} className='bg-black'>
                  <Minus />
                </Button>
                <div className='w-28 border border-gray-300 rounded-sm text-xl flex h-9'>
                  <p className='m-auto'>{count}</p>
                </div>
                <Button onClick={increment} className='bg-black'>
                  <Plus />
                </Button>
            </div>
            <div className='flex justify-between text-xl'>
              <h2>Total:</h2>
              <h2 className='text-green-600 font-semibold'>R {count * 1000}.00</h2>
            </div>
            <div className='mt-3 flex items-center gap-2'>
              <Checkbox />
              <p>Click to accept terms and conditions</p>
            </div>
            <Button disabled={true} className='w-full bg-customBlue hover:bg-customBlueHover mt-3'>
              Purchase
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Details
