import '@/styles/globals.css'
import NERDTree from './NERDTree'
import Statusline from './Statusline'
import LineNumbers from './LineNumbers'
import CommandLine from './CommandLine'
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
      <body className="bg-bg text-fg flex flex-col min-h-screen transition-colors duration-300">
        <ModeProvider>
          <div className="flex flex-1">
            <NERDTree />
            <LineNumbers />
            <main className="flex-1 w-full animate-fade-in max-w-4xl mx-auto">
              <div className="py-12 px-12">{children}</div>
            </main>
          </div>
          <div className="fixed bottom-0 left-0 right-0 z-50">
            <Statusline />
            <CommandLine />
          </div>
        </ModeProvider>
      </body>
    </html>
  )
}
