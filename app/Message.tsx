import { Message } from '@/typed'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'
import TimeAgo from 'react-timeago'

type Props = {
  msg: Message
  isPublisher: boolean
}

const Message = ({ msg, isPublisher }: Props) => {
  return (
    <div className={`flex flex-row w-full space-x-2 ${isPublisher && 'flex-row-reverse'}`}>
      <div>
        <Image
          src={msg.profilePic}
          width={40}
          height={40}
          className={`rounded-full ${isPublisher ? 'ml-2' : 'mr-2'}`}
          alt="profilePic"
        />
      </div>

      <div className={`flex flex-col ${isPublisher ? 'items-end' : 'items-start'}`}>
        <p className={`text-[0.65rem] ${isPublisher ? 'text-blue-400' : 'text-red-400'}`}>
          {msg.username}
        </p>
        <p
          className={`px-4 py-2 w-fit max-w-[400px] ${isPublisher ? 'bg-blue-400' : 'bg-red-400'}
           rounded-md text-white`}>
          {msg.message}
        </p>
      </div>

      <div className="flex text-gray-300 text-[0.65rem] self-end italic pb-[2px]">
        <TimeAgo date={new Date(msg.created_at)} />
      </div>
    </div>
  )
}

export default Message
