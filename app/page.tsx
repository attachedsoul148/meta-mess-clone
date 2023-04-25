import { Message } from '@/typed'
import ChatInput from './ChatInput'
import MessageList from './MessageList'
import { getServerSession } from 'next-auth'
import Providers from './Providers'
import Header from './Header'

export default async function Home() {
  //because we are on server we can't do relative url
  const session = await getServerSession()

  const data = await fetch(
    `${process.env.VERCEL_URL! || 'http://localhost:3000'}/api/getMessages`,
  ).then((res) => res.json())

  const messages: Message[] = data.messages
  return (
    <Providers session={session}>
      <Header />
      <main className="mx-auto">
        <MessageList initialMessages={messages} />
        <ChatInput />
      </main>
    </Providers>
  )
}
