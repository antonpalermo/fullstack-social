import React, { ReactElement, useEffect } from 'react'
import { Welcome, Layout } from '@components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@lib'
import { useRouter } from 'next/router'

export type HomeProps = {}

function User() {
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return <h1>loading</h1>
  }

  return <div>{JSON.stringify(user)}</div>
}

export default function Home({}: HomeProps) {
  const router = useRouter()

  const [user, loading] = useAuthState(auth)
  useEffect(() => {
    if (!user) {
      router.push({
        pathname: '/signin',
        query: { return: window.location.pathname }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading])

  async function signOut() {
    await auth.signOut()
  }

  return (
    <div className="sm:container">
      <Welcome name="Anton" />
      <User />
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}

Home.pageLayout = (page: ReactElement) => (
  <Layout title="Fullstack Social">{page}</Layout>
)
