import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import VehicleFilter from '@/components/VehicleFilter';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Mogistic | Fleet",
  description: "View Mogistic fleet",
};

const Fleet = () => {
  return (
    <div className="container mx-auto">
      <div className='pb-3'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Fleet</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <VehicleFilter />
    </div>
  )
}

export default Fleet
