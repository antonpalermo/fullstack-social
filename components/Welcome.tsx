import React from 'react'

export type WelcomeProps = { name: string }

export function Welcome({ name }: WelcomeProps) {
  return <h1 className='font-medium'>Welcome {name}!</h1>
}
