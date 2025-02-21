import Image from 'next/image'
import React from 'react'
import Logo from "@/public/images/logo_abstract.png"
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <div className='w-full py-16 bg-gray-900'>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 text-white'>
            <div className='mb-5'>
                <Image
                    src={Logo}
                    alt="Mogistic Logo"
                    width={100}
                    height={100}
                />
            </div>
            <div className='w-full flex px-4'>
                <div className='w-1/4'>
                    <h1 className='mb-3'>
                        Company
                    </h1>
                    <ul className='flex flex-col gap-1'>
                        <Link href="/">
                            <li>Home</li>
                        </Link>
                        <Link href="/fleet">
                            <li>Fleet</li>
                        </Link>
                        <Link href="/how-we-work">
                            <li>How We Work</li>
                        </Link>
                        <Link href="/about">
                            <li>About us</li>
                        </Link>
                        <Link href="/projects">
                            <li>Projects</li>
                        </Link>
                        <Link href="/contact">
                            <li>Contact us</li>
                        </Link>
                    </ul>
                </div>
                <div className='w-1/4'>
                    <h1 className='mb-3'>
                        More
                    </h1>
                    <ul className='flex flex-col gap-1'>
                        <Link href="/affiliation">
                            <li>Affiliation</li>
                        </Link>
                        <Link href="/business">
                            <li>Business</li>
                        </Link>
                        <Link href="/investment">
                            <li>Investment</li>
                        </Link>
                        <Link href="/support">
                            <li>Support</li>
                        </Link>
                    </ul>
                </div>
                <div className='w-1/4'>
                    <h1 className='mb-3'>
                        Terms
                    </h1>
                    <ul className='flex flex-col gap-1'>
                        <Link href="/terms-conditions">
                            <li>Terms & Conditions</li>
                        </Link>
                        <Link href="/privacy-policy">
                            <li>Privacy Policy</li>
                        </Link>
                        <Link href='/refund-policy'>
                            <li>Refund Policy</li>
                        </Link>
                    </ul>
                </div>
                <div className='w-1/4'>
                    <h1 className='mb-5'>Social</h1>
                    <div className='flex gap-10'>
                        <Facebook />
                        <Linkedin />
                        <Twitter />
                        <Instagram />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer
