'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

type Props = {}

const LogoutButton = (props: Props) => {
  return (
    <button onClick={() => signOut()} className="blueBtn">
      Sign out
    </button>
  )
}

export default LogoutButton
