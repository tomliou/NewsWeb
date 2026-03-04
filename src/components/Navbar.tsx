'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="border-b bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white hover:text-blue-100">
            湯姆的新聞網站測試
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/bookmarks" className="px-4 py-2 text-sm font-medium text-white border border-white rounded-lg hover:bg-white/10 transition-colors">
              我的收藏
            </Link>

            {session ? (
              <div className="flex items-center gap-3">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt={session.user?.name ?? ''}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                )}
                <span className="text-sm font-medium text-white/95">
                  {session.user?.name ?? '使用者'}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium text-white/90 hover:text-white underline underline-offset-2"
                >
                  登出
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('google', { callbackUrl: '/?welcome' })}
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