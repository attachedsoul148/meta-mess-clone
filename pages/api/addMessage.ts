import { serverPusher } from '@/pusher'
import redis from '../../redis'
import { Message } from '../../typed'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    messageObject: Message
}
type ErrorData = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Invalid request type' })
    }

    const { messageObject } = req.body

    const updatedMessage: Message = {
        ...messageObject, created_at: Date.now() // this will give it timestamp of server, not our one
    }

    await redis.hset('messages', updatedMessage.id, JSON.stringify(updatedMessage))

    serverPusher.trigger('messages', 'add-message', messageObject)

    res.status(200).json({ messageObject })
}