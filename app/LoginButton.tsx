'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const LoginButton = (props: Props) => {
  const router = useRouter()
  return (
    <button onClick={() => router.push('/auth/signin')} className="blueBtn">
      Sign in
    </button>
  )
}

export default LoginButton
