import React from 'react'
import Head from 'next/head'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@lib'
import { useRouter } from 'next/router'

export type SignInProps = {}

export default function SignIn({}: SignInProps) {
  const router = useRouter()

  function navigate() {
    const returnUrl = router.query.return
    const decodedUrl = decodeURIComponent(`${router.query.return}`)
    return returnUrl ? router.push(decodedUrl) : '/'
  }

  const googleProvider = new GoogleAuthProvider()
  async function signInWithGooglePopup() {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      if (result) {
        navigate()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>Fullstack Social - Sign In</title>
        <meta
          name="description"
          content="Sign in to see what other fullstack devs are currenty into."
        />
      </Head>
      <div>
        <h1>Sign In</h1>
        <button onClick={signInWithGooglePopup}>Sign In with Google</button>
      </div>
    </>
  )
}
