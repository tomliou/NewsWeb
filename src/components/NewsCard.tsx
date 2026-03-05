'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HeartIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'

interface NewsCardProps {
  id: string
  title: string
  description: string
  source: string
  date: string
  href: string
  showFooterText: boolean
  image: string
}

export default function NewsCard({
  id,
  title,
  description,
  source,
  date,
  href,
  image,
}: NewsCardProps) {
  const { data: session } = useSession()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    // 只有在瀏覽器環境下執行
    if (typeof window !== 'undefined') {
      const storedBookmarks = localStorage.getItem('bookmarks');
      if (storedBookmarks) {
        const bookmarks = JSON.parse(storedBookmarks);
        const found = bookmarks.some((bookmark: any) => bookmark.id === id);
        setIsBookmarked(found);
      }
    }
  }, [id]); // 依賴 id

  const handleBookmark = () => {
    if (!session) {
      setToastMessage('先登入才能收藏新聞');
      setShowToast(true);
      return;
    }

    const newsData = {
      id,
      title,
      description,
      source,
      date,
      url: href, // 使用 href 作為 url
      image,
    };

    // 從 localStorage 獲取當前收藏列表
    const storedBookmarks = typeof window !== 'undefined' ? localStorage.getItem('bookmarks') : null;
    let bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
    let message = '';

    if (isBookmarked) {
      // 如果已經收藏，就移除收藏
      bookmarks = bookmarks.filter((bookmark: any) => bookmark.id !== id);
      message = '已移除收藏';
    } else {
      // 如果未收藏，就加入收藏
      // 避免重複加入
      if (!bookmarks.some((bookmark: any) => bookmark.id === id)) {
        bookmarks.push(newsData);
        message = '已加入收藏';
      }
    }

    // 將更新後的收藏列表保存到 localStorage
    if (typeof window !== 'undefined') {
      console.log('準備寫入 localStorage', bookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      console.log('已寫入 localStorage');
    }

    // 切換本地的收藏狀態
    setIsBookmarked(!isBookmarked);
    console.log('isBookmarked 已切換為', !isBookmarked);

    // 顯示 toast
    if (message) {
      setToastMessage(message);
      setShowToast(true);
    }
  }

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  return (
    <>
      {/* Toast 提示，固定在畫面頂部（navbar 下方） */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-6 py-2 rounded shadow text-sm animate-fade-in-out">
          {toastMessage}
        </div>
      )}
      <div className="relative">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow transition-shadow"
        >
          <div className="relative mb-4">
            <img
              src={image || "https://picsum.photos/400/200"}
              alt={title}
              className="w-full h-40 object-cover object-top rounded-md"
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/400/200"
              }}
            />
          </div>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 min-h-[3em] leading-snug">{title}</h3>
          <p className="text-[0.9rem] font-normal text-gray-500 mb-4 line-clamp-3">
            {description}
          </p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{date} · {source}</span>
            <span className="flex items-center gap-2">
              <HeartIcon
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleBookmark();
                }}
                className={`h-5 w-5 cursor-pointer transition-colors ${isBookmarked ? 'text-pink-500 fill-pink-500' : 'text-gray-400'}`}
                title={isBookmarked ? '移除收藏' : '加入收藏'}
                aria-pressed={isBookmarked}
              />
            </span>
          </div>
        </a>
      </div>
    </>
  )
} 