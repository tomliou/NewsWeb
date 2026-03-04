'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function WelcomeToast() {
  const { data: session, status } = useSession()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (status !== 'authenticated' || !session) return
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    if (!params.has('welcome')) return

    setShow(true)
    // 移除網址上的 ?welcome，避免重新整理又跳 toast
    const url = new URL(window.location.href)
    url.searchParams.delete('welcome')
    window.history.replaceState({}, '', url.pathname + (url.search || ''))

    const timer = setTimeout(() => setShow(false), 2000)
    return () => clearTimeout(timer)
  }, [session, status])

  if (!show) return null

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg text-sm animate-fade-in-out">
      歡迎登入
    </div>
  )
}
