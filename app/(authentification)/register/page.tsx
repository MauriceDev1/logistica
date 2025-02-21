import { RegisterForm } from '@/components/register-form'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Mogistic | Register",
  description: "Register to Mogistic app",
};

const Register = () => {
  return (
    <>
        <RegisterForm />
    </>
  )
}

export default Register
