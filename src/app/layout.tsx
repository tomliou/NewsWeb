import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/components/AuthProvider'
import Navbar from '@/components/Navbar'
import WelcomeToast from '@/components/WelcomeToast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tom_的玩具哈哈',
  description: '一個現代化的新聞聚合平台，匯集各大平台熱門新聞',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={`${inter.className} bg-gray-100 min-h-screen`}>
        <AuthProvider>
          <Navbar />
          <WelcomeToast />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
} 