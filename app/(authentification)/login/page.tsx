import { LoginForm } from '@/components/login-form'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Mogistic | Login",
  description: "Login to Mogistic app",
};

const Login = () => {
  return (
    <>
        <LoginForm />
    </>
  )
}

export default Login
