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
          <LineNumbers />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 w-full animate-fade-in max-w-4xl mx-auto">
              <div className="py-12 px-12">{children}</div>
            </main>
            <Statusline />
          </div>
        </ModeProvider>
      </body>
    </html>
  )
}
