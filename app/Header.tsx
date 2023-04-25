'use client'

import Image from 'next/image'
import React from 'react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'

type Props = {}

const Header = (props: Props) => {
  const { data: session } = useSession()

  return (
    <header
      className={`p-10 flex bg-white  ${
        session ? 'justify-between' : 'justify-center'
      } border-b shadow items-center sticky top-0`}>
      {session ? (
        <>
          <div className="flex items-center space-x-2">
            <div>
              <Image
                src={session.user?.image!}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>

            <div>
              <p className="text-sm text-blue-400">Logged in as:</p>
              <p className="font-medium">{session.user?.name}</p>
            </div>
          </div>

          <div>
            <LogoutButton />
          </div>
        </>
      ) : (
        <div className="flex flex-col space-y-2 items-center">
          <div className="flex items-center space-x-2">
            <div>
              <Image src="https://links.papareact.com/jne" alt="avatar" width={40} height={40} />
            </div>

            <p className="text-sm text-blue-400">Welcome to messenger</p>
          </div>

          <div>
            <LoginButton />
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
