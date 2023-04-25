'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

type Props = {
  session: Session | null | undefined
  children: React.ReactNode
}

const Providers = ({ session, children }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default Providers
