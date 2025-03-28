import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Mogistic | About",
  description: "Generated by create next app",
};

const About = () => {
  return (
    <>
      <div className='pb-3'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>About us</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='w-full flex'>
        <div className='w-1/2 py-5'>
          <h1 className='text-2xl'>
            Company Overview
          </h1>
          <p className='py-5'>
              Mogistic is a logistics company with a transformative approach
              to operations. We have redefined traditional business structures
              by creating a model that allows individuals to own a stake in our
              logistics network. Our mission is to revolutionize the transportation
              of goods by fostering a more inclusive and dynamic ecosystem.
              <br></br>
              <br />
              By adopting this innovative structure, we are paving the way for expansion
              across multiple transportation sectors, including land, sea, and air.
              Leveraging cutting-edge technology, we optimize delivery mechanisms,
              minimize delays, and enhance efficiency—ensuring a seamless experience
              for both our clients and investors.
          </p>
        </div>
        <div className='w-1/2 bg-gray-300 h-96'>

        </div>
      </div>
      <div className='w-full flex'>
        <div className='w-1/2 bg-gray-300 h-96'>

        </div>
        <div className='w-1/2 py-5'>
          <h1 className='text-2xl'>
            Company Overview
          </h1>
          <p className='py-5'>
              Mogistic is a logistics company with a transformative approach
              to operations. We have redefined traditional business structures
              by creating a model that allows individuals to own a stake in our
              logistics network. Our mission is to revolutionize the transportation
              of goods by fostering a more inclusive and dynamic ecosystem.
              <br></br>
              <br />
              By adopting this innovative structure, we are paving the way for expansion
              across multiple transportation sectors, including land, sea, and air.
              Leveraging cutting-edge technology, we optimize delivery mechanisms,
              minimize delays, and enhance efficiency—ensuring a seamless experience
              for both our clients and investors.
          </p>
        </div>
      </div>
    </>
  )
}

export default About
