'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import NewsCard from '@/components/NewsCard'

interface Bookmark {
  id: string
  title: string
  description: string
  source: string
  date: string
  url: string
}

export default function BookmarksPage() {
  const { data: session } = useSession()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      fetchBookmarks()
    }
  }, [session])

  const fetchBookmarks = async () => {
    try {
      const response = await fetch('/api/bookmarks')
      if (response.ok) {
        const data = await response.json()
        setBookmarks(data)
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">請先登錄</h1>
        <p className="text-muted-foreground">登錄後即可查看收藏的新聞</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>加載中...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">我的收藏</h1>
      
      {bookmarks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">暫無收藏的新聞</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((bookmark) => (
            <NewsCard
              key={bookmark.id}
              title={bookmark.title}
              description={bookmark.description}
              source={bookmark.source}
              date={bookmark.date}
              href={bookmark.url}
            />
          ))}
        </div>
      )}
    </div>
  )
} 