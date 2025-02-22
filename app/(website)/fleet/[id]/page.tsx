"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import Fleet from "@/data/mock/Fleet.json"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Image from 'next/image'
import { Card } from '@/components/ui/card'

const Details = () => {
  const params = useParams();
  const TruckData = Fleet.find(i => i.id === Number(params.id));
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
          <Card className="w-[450px] p-5">

            <h1>Test</h1>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Details
