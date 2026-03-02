'use client'

import { useState } from 'react'
import { Tab } from '@headlessui/react'
import NewsCard from '@/components/NewsCard'
import type { NewsItem } from '@/lib/articles'

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

interface HomeClientProps {
  initialArticles: NewsItem[]
  error?: string | null
}

export default function HomeClient({
  initialArticles,
  error,
}: HomeClientProps) {
  const [userName] = useState(() => getRandomUserName())
  const [selectedIndex, setSelectedIndex] = useState(0)
  const dateStr = getTodayDateString()

  return (
    <div className="space-y-8">
      <h1 className="text-4xl">
        <span className="font-bold">{userName}</span>
        <span className="font-normal"> 早安！以下是 {dateStr} 的精選新聞</span>
      </h1>

      {error && <p className="text-red-500">{error}</p>}

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
            const filtered = initialArticles.filter(
              (item) => item.source === cat.source
            )
            return (
              <Tab.Panel
                key={cat.id}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.length === 0 ? (
                  <p className="col-span-full text-gray-500">此分類尚無文章。</p>
                ) : (
                  filtered.map((item) => (
                    <NewsCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      description={item.description}
                      source={item.source}
                      date={
                        item.date
                          ? new Date(item.date).toLocaleDateString('zh-TW')
                          : ''
                      }
                      href={item.href}
                      image={item.image}
                      showFooterText={false}
                    />
                  ))
                )}
              </Tab.Panel>
            )
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
