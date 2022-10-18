import React from 'react'
import { Welcome } from '@components'

export type HomeProps = {}

export default function Home({}: HomeProps) {
  return <Welcome name="Anton" />
}
