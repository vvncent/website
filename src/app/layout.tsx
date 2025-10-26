import '@/styles/globals.css'
import NERDTree from './NERDTree'
import Statusline from './Statusline'
import LineNumbers from './LineNumbers'
import { ModeProvider } from './ModeContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/favicon.png" />
      </head>
      <body className="bg-bg text-fg flex min-h-screen transition-colors duration-300">
        <ModeProvider>
          <NERDTree />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 w-full animate-fade-in flex max-w-4xl mx-auto relative">
              <LineNumbers />
              <div className="py-12 pl-16 flex-1">{children}</div>
            </main>
            <Statusline />
          </div>
        </ModeProvider>
      </body>
    </html>
  )
}
