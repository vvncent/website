import './globals.css'

export const metadata = {
  title: 'Vincent\'s Personal Website',
  description: 'Personal website',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
