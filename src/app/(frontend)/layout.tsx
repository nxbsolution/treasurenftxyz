import { AuthProvider } from '@/provider/Auth'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

export const metadata = {
  title: 'Ninja Team | Treasure NFT',
  description: 'A project of Nexusberry',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Toaster />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
