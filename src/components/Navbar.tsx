'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="border-b bg-blue-600 dark:bg-blue-700 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white hover:text-blue-100">
            湯姆的新聞網站測試
          </Link>

          <div className="flex items-center space-x-4">
            
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 hover:bg-blue-500 dark:hover:bg-blue-600 rounded-lg text-white"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            <Link href="/bookmarks" className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg">
              我的收藏
            </Link>

            {session ? (
              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
              >
                登出
              </button>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                登入
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 