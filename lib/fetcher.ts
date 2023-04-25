import { Message } from "@/typed"

export const fetchMessages = async () => {
    const data = await fetch('/api/getMessages').then(res => res.json())

    const messages: Message[] = data.messages

    return messages
}