'use client'

import { fetchMessages } from '@/lib/fetcher'
import Image from 'next/image'
import React, { useEffect } from 'react'
import useSWR from 'swr'
import Message from './Message'
import { clientPusher } from '@/pusher'
import { Message as MessageType } from '@/typed'
import { useSession } from 'next-auth/react'

type Props = {
  initialMessages: MessageType[]
}

const MessageList = ({ initialMessages }: Props) => {
  const { data: messages, mutate } = useSWR('/api/getMessages', fetchMessages)
  const session = useSession()

  useEffect(() => {
    const client = clientPusher.subscribe('messages')

    client.bind('add-message', async (data: Message) => {
      //if message is yours don't add it second time
      if (messages?.find((el) => el.id === data.id)) return
      await mutate(fetchMessages)
    })

    return () => {
      clientPusher.unsubscribe('messages')
      client.unbind_all()
    }
  }, [mutate, messages])

  return (
    <div className="mx-auto max-w-6xl flex flex-col space-y-5 p-5 pb-32 overflow-scroll scrollbar-hide">
      {(messages || initialMessages).map((msg) => (
        <Message key={msg.id} msg={msg} isPublisher={session.data?.user?.email === msg.email} />
      ))}
    </div>
  )
}

export default MessageList
