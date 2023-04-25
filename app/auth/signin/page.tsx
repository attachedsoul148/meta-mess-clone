import Image from 'next/image'
import React from 'react'
import { getProviders } from 'next-auth/react'
import SignIn from '@/app/SignIn'

type Props = {}

const signin = async (props: Props) => {
  const providers: Awaited<ReturnType<typeof getProviders>> = await getProviders()

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div>
        <Image
          className="rounded-full object-cover"
          src={'https://links.papareact.com/161'}
          alt="logo"
          width={700}
          height={700}
        />
      </div>

      <SignIn providers={providers} />
    </div>
  )
}

export default signin
