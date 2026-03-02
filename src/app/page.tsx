'use client'

import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import NewsCard from '@/components/NewsCard'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://active-trust-e46c30f868.strapiapp.com'

const USER_NAMES = ['豬大哥', '劉獻隆是大帥哥'] as const

function getRandomUserName() {
  return USER_NAMES[Math.floor(Math.random() * USER_NAMES.length)]
}

function getTodayDateString() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const categories = [
  { id: 'tech', name: '科技', source: 'yahoo 科技新聞' },
  { id: 'finance', name: '財經', source: '東森新聞雲 財經新聞' },
  { id: 'social', name: '社會', source: 'Google 社會新聞' },
  { id: 'entertainment', name: '娛樂', source: '娛樂' },
]

interface NewsItem {
  id: string
  title: string
  description: string
  source: string
  date: string
  href: string
  image: string
}

/** 將 Strapi API 回傳的 article 轉成 NewsCard 格式（支援扁平結構） */
function toNewsItem(raw: Record<string, unknown>): NewsItem {
  const attrs = (raw.attributes as Record<string, unknown>) || raw
  const image = attrs.image as Record<string, unknown> | undefined
  const imageData = image?.data as Record<string, unknown> | undefined
  const imageAttrs = imageData?.attributes as Record<string, unknown> | undefined
  const imageUrl = (imageAttrs?.url as string) || (image?.url as string) || ''
  return {
    id: String(raw.id ?? raw.documentId ?? ''),
    title: (attrs.title as string) || '',
    description: (attrs.description as string) || '',
    source: (attrs.source as string) || 'Strapi',
    date: (attrs.publishedAt as string) || (attrs.createdAt as string) || '',
    href: (attrs.url as string) || '#',
    image: imageUrl ? (imageUrl.startsWith('http') ? imageUrl : `${STRAPI_URL}${imageUrl}`) : '',
  }
}

export default function Home() {
  const [userName] = useState(() => getRandomUserName())
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [articles, setArticles] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const dateStr = getTodayDateString()

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`${STRAPI_URL}/api/articles`)
      .then(async (res) => {
        const json = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(json.error?.message || `HTTP ${res.status}`)
        return json
      })
      .then((json) => {
        const rawList = Array.isArray(json.data) ? json.data : []
        setArticles(rawList.map((item: Record<string, unknown>) => toNewsItem(item)))
      })
      .catch((err) => setError(err instanceof Error ? err.message : '無法載入新聞，請稍後再試'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-4xl">
        <span className="font-bold">{userName}</span>
        <span className="font-normal"> 早安！以下是 {dateStr} 的精選新聞</span>
      </h1>

      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-4 border-b">
          {categories.map((cat) => (
            <Tab
              key={cat.id}
              className={({ selected }) =>
                `py-2 px-4 text-sm font-medium leading-5 ${
                  selected
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`
              }
            >
              {cat.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-4">
          {categories.map((cat) => {
            const filtered = articles.filter((item) => item.source === cat.source)
            return (
              <Tab.Panel
                key={cat.id}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {loading && <p className="col-span-full text-gray-500">載入中…</p>}
                {error && <p className="col-span-full text-red-500">{error}</p>}
                {!loading && !error && filtered.length === 0 && (
                  <p className="col-span-full text-gray-500">
                    此分類尚無文章。
                  </p>
                )}
                {!loading &&
                  !error &&
                  filtered.map((item) => (
                    <NewsCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      description={item.description}
                      source={item.source}
                      date={item.date ? new Date(item.date).toLocaleDateString('zh-TW') : ''}
                      href={item.href}
                      image={item.image}
                      showFooterText={false}
                    />
                  ))}
              </Tab.Panel>
            )
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
} 