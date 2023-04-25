import Header from './Header'
import './globals.css'

export const metadata = {
  title: 'Meta messenger',
  description: 'Created by Pavlo Kozak',
  icons: {
    shortcut: { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/1200px-Facebook_Messenger_logo_2020.svg.png', type: 'image/png' }
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="scrollbar-hide">
        <div>{children}</div>
      </body>
    </html>
  )
}
