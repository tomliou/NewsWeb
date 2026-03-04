'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

function SignInContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const callbackUrl = searchParams.get('callbackUrl') ?? '/'

  const isFailed = Boolean(error)

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8 text-center">
        {isFailed ? (
          <>
            <h2 className="text-3xl font-bold">登入失敗</h2>
            <button
              onClick={() => signIn('google', { callbackUrl })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 hover:bg-gray-50"
            >
              重新登入
            </button>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold">歡迎登入</h2>
            <p className="mt-2 text-gray-600">使用以下方式繼續</p>
            <button
              onClick={() => signIn('google', { callbackUrl })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 hover:bg-gray-50"
            >
              使用 Google 帳號登入
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default function SignIn() {
  return (
    <Suspense fallback={<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center text-gray-500">載入中...</div>}>
      <SignInContent />
    </Suspense>
  )
} 