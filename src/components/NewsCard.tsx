'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookmarkIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'

interface NewsCardProps {
  title: string
  description: string
  source: string
  date: string
  href: string
}

export default function NewsCard({
  title,
  description,
  source,
  date,
  href,
}: NewsCardProps) {
  const { data: session } = useSession()
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleBookmark = () => {
    if (!session) {
      // 提示用戶登錄
      return
    }
    setIsBookmarked(!isBookmarked)
    // TODO: 調用 API 保存收藏狀態
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {description}
      </p>
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>{source}</span>
        <span>{date}</span>
      </div>
    </a>
  )
} 