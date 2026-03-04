'use client'

import { useEffect, useState, useRef } from 'react'
import { useSession } from 'next-auth/react'

export default function LoginSuccessToast() {
  const { data: session, status } = useSession()
  const [show, setShow] = useState(false)
  const hasShownRef = useRef(false)

  useEffect(() => {
    if (status !== 'authenticated' || !session?.user) return
    if (hasShownRef.current) return

    hasShownRef.current = true
    setShow(true)
    const timer = setTimeout(() => setShow(false), 2500)
    return () => clearTimeout(timer)
  }, [session, status])

  if (!show || !session?.user?.name) return null

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg text-sm animate-fade-in-out">
      {session.user.name} 登入成功
    </div>
  )
}
