'use client'

import { Message } from '@/typed'
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import useSWR from 'swr'
import { fetchMessages } from '@/lib/fetcher'
import { useSession } from 'next-auth/react'

type Props = {}

const ChatInput = (props: Props) => {
  const [value, setValue] = useState('')
  const { data: messages, mutate } = useSWR('/api/getMessages', fetchMessages)
  const session = useSession()
  //first arg is key, it could be anything, not only the path
  //this is just a key for cache from this fetcher

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const messageObject: Message = {
      id: uuid(),
      username: session.data?.user?.name!,
      email: session.data?.user?.email!,
      profilePic: session.data?.user?.image!,
      message: value,
      created_at: Date.now(),
    }

    setValue('')

    const uploadMessage = async () => {
      const data = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageObject }),
        // to take the entire message from body, not all the fields by themselves
      }).then((res) => res.json())

      const message: Message = data.messageObject
      const newMessages = [...messages!, message]

      return newMessages
    }

    await mutate(uploadMessage, {
      optimisticData: [...messages!, messageObject],
      rollbackOnError: true,
    })
    //it sends request to receive the actual data, but we don't want to wait and try to predict the new data,
    //if our prediction and the real data from request aren't equal, mutate will roll it back
  }
  return (
    <form
      className="fixed bottom-0 z-10 bg-white flex space-x-2 items-center p-5 border-t w-full"
      onSubmit={onSubmit}>
      <input
        className="outline-none border flex-1 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 "
        type="text"
        value={value}
        placeholder="Enter the message..."
        onChange={(e) => setValue(e.target.value)}
      />
      <button disabled={!value} className="blueBtn disabled:opacity-50 disabled:cursor-not-allowed">
        Send
      </button>
    </form>
  )
}

export default ChatInput
