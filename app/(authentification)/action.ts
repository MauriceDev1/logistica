'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}


export async function signup(formData: FormData) {
    const supabase = await createClient()
    const cookieStore = cookies()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Check if the email is already registered
    const { error: userFetchError } = await supabase.auth
      .signInWithPassword({ email, password })

    // If no error, user exists
    if (!userFetchError) {
      redirect('/login')
    }

    // If error is NOT "invalid credentials", it's a different error
    if (userFetchError.status !== 400) {
      console.error(userFetchError)
      redirect('/error')
    }

    // Proceed with signup
    const { data: newUser, error: signUpError } = await supabase.auth.signUp({
      email,
      password
    })

    if (signUpError || !newUser?.user?.id) {
      console.error(signUpError)
      redirect('/error')
    }

    // Set the cookie with proper options
    (await
        // Set the cookie with proper options
        cookieStore).set({
        name: 'user_id',
        value: newUser.user.id,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
    })

    revalidatePath('/', 'layout')
    redirect(`/create-profile/${newUser.user.id}`)
  }

