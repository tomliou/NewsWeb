'use client'

import { useState } from 'react'
import { Tab } from '@headlessui/react'
import NewsCard from '@/components/NewsCard'

const categories = [
  { id: 'tech', name: '科技', source: 'yahoo 科技新聞' },
  { id: 'finance', name: '財經', source: '東森新聞雲 財經新聞' },
  { id: 'social', name: '社會', source: 'Google 社會新聞' },
  { id: 'discussion', name: '討論', source: 'Dcard 討論新聞' },
]

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">熱門新聞</h1>
      
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-4 border-b">
          {categories.map((category) => (
            <Tab
              key={category.id}
              className={({ selected }) =>
                `py-2 px-4 text-sm font-medium leading-5 ${
                  selected
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`
              }
            >
              {category.name}
            </Tab>
          ))}
        </Tab.List>
        
        <Tab.Panels className="mt-4">
          {categories.map((category) => (
            <Tab.Panel
              key={category.id}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {[...Array(6)].map((_, idx) => (
                <NewsCard
                  key={idx + 1}
                  id={`fake-news-${idx + 1}`}
                  title={`湯姆的新聞標題 ${idx + 1}`}
                  description="這是一條湯姆的描述文字，實際使用時會替換為真實的新聞內容。"
                  source={category.source}
                  date="2024-04-14"
                  href="#"
                  image={`https://source.unsplash.com/random/400x200?sig=${idx + 1}`}
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