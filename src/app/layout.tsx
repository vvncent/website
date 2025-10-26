import '../styles/globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vincent\'s Personal Website',
  description: 'Personal website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="icons/favicon.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
