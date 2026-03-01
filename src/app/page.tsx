'use client'

import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import NewsCard from '@/components/NewsCard'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://active-trust-e46c30f868.strapiapp.com'

const categories = [
  { id: 'tech', name: '科技', source: 'yahoo 科技新聞' },
  { id: 'finance', name: '財經', source: '東森新聞雲 財經新聞' },
  { id: 'social', name: '社會', source: 'Google 社會新聞' },
  { id: 'discussion', name: '討論', source: 'Dcard 討論新聞' },
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

/** 將 Strapi 回傳的 article 轉成 NewsCard 格式 */
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
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [articles, setArticles] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`${STRAPI_URL}/api/articles?populate=image`)
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
      <h1 className="text-4xl font-bold">熱門新聞</h1>

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
          {categories.map((cat) => (
            <Tab.Panel
              key={cat.id}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {loading && <p className="col-span-full text-gray-500">載入中…</p>}
              {error && <p className="col-span-full text-red-500">{error}</p>}
              {!loading && !error && articles.length === 0 && (
                <p className="col-span-full text-gray-500">
                  尚無文章，請在 Strapi 後台新增 Article。
                </p>
              )}
              {!loading &&
                !error &&
                articles.map((item) => (
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
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
} 