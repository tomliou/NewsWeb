'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { UserCircleIcon } from '@heroicons/react/24/solid'

const CARD_CLOSE_DELAY_MS = 150

export default function Navbar() {
  const { data: session } = useSession()
  const [cardOpen, setCardOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const handleEnter = () => {
    clearCloseTimer()
    setCardOpen(true)
  }

  const handleLeave = () => {
    closeTimerRef.current = setTimeout(() => setCardOpen(false), CARD_CLOSE_DELAY_MS)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 min-h-16 max-h-16 shrink-0 overflow-hidden border-b bg-blue-600 text-white">
      <div className="container mx-auto flex h-full min-h-0 items-center px-4">
        <div className="flex min-h-0 flex-1 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white hover:text-blue-100">
            湯姆的新聞網站測試
          </Link>

          <div
            className="relative flex items-center"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="group flex items-center gap-2 py-1 cursor-pointer">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user?.name ?? ''}
                  className="h-6 w-6 rounded-full border border-white object-cover transition-opacity group-hover:opacity-50"
                />
              ) : (
                <UserCircleIcon className="h-6 w-6 shrink-0 text-white transition-opacity group-hover:opacity-50" aria-hidden />
              )}
              {session ? (
                <span className="text-sm font-medium text-white truncate max-w-[120px] transition-opacity group-hover:opacity-50">
                  {session.user?.name ?? '使用者'}
                </span>
              ) : (
                <span className="text-sm font-medium text-white whitespace-nowrap transition-opacity group-hover:opacity-50">請登入</span>
              )}
            </div>
            {cardOpen && (
              <div
                className="absolute right-0 top-full z-50 mt-1 w-72 rounded-xl bg-white shadow-xl text-gray-800 overflow-hidden border border-gray-100"
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
              >
                {session ? (
                  <>
                    <div className="p-4 border-b border-gray-100">
                      <p className="text-sm font-medium truncate">{session.user?.name ?? '使用者'}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/bookmarks"
                        className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setCardOpen(false)}
                      >
                        我的收藏
                      </Link>
                      <button
                        type="button"
                        onClick={() => { signOut(); setCardOpen(false) }}
                        className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        登出
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 text-center">
                      <p className="text-sm font-medium text-gray-800">登入才能收藏新聞</p>
                    </div>
                    <div className="px-4 pb-4 pt-0">
                      <button
                        type="button"
                        onClick={() => signIn('google', { callbackUrl: '/' })}
                        className="w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white hover:opacity-90"
                    style={{ backgroundColor: '#ff5353' }}
                      >
                        立即登入
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 