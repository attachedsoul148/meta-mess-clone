import redis from '../../redis'
import { Message } from '../../typed'
import type { NextApiRequest, NextApiResponse } from 'next'

type ErrorData = {
    message: string
}
type Data = {
    messages: Message[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data | ErrorData>) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Invalid request type' })
    }

    const messagesRes = await redis.hvals('messages')
    //hvals turns the hashes into the array with their values in string format 
    const messages: Message[] = messagesRes.map((msg) => JSON.parse(msg))
        .sort((a: Message, b: Message) => a.created_at - b.created_at)
    //coz messages are stored as JSON strings

    res.status(200).json({ messages })
}