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
  image?: string
}

export default function BookmarksPage() {
  const { data: session } = useSession()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  useEffect(() => {
    console.log('我的收藏頁面 useEffect 執行');
    // 在組件載入時，從 localStorage 讀取收藏列表
    // 只有在瀏覽器環境下執行
    if (typeof window !== 'undefined') {
      const storedBookmarks = localStorage.getItem('bookmarks');
      if (storedBookmarks) {
        console.log('從 localStorage 讀取到收藏數據', JSON.parse(storedBookmarks));
        setBookmarks(JSON.parse(storedBookmarks));
      } else {
        console.log('localStorage 沒有收藏數據');
      }
    }
  }, []); // 空依賴陣列，只在組件掛載時執行一次

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">我的收藏</h1>
      
      {bookmarks.length === 0 ? (
        <div className="text-center py-12 flex flex-col items-center justify-center">
          <p className="text-muted-foreground mb-4">暫無收藏的新聞</p>
          <img src="https://placehold.co/400x200?text=No+Bookmark" alt="暫無收藏" className="mx-auto rounded-md shadow w-80 h-40 object-contain opacity-70" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((bookmark) => (
            <NewsCard
              key={bookmark.id}
              id={bookmark.id}
              title={bookmark.title}
              description={bookmark.description}
              source={bookmark.source}
              date={bookmark.date}
              href={bookmark.url}
              image={bookmark.image || "https://source.unsplash.com/random/400x200?sig=2"}
              showFooterText={false}
            />
          ))}
        </div>
      )}
    </div>
  )
} 