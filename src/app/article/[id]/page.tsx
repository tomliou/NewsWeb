import Link from 'next/link'
import { fetchArticleById } from '@/lib/articles'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const article = await fetchArticleById(id)

  if (!article) {
    return (
      <div className="rounded-lg bg-white p-8 shadow-sm border border-gray-100">
        <p className="text-gray-500">找不到 id 為 {id} 的文章。</p>
        <Link href="/" className="mt-4 inline-flex items-center gap-1 text-blue-600 hover:underline">
          <ArrowLeftIcon className="h-4 w-4" /> 返回首頁
        </Link>
      </div>
    )
  }

  const dateStr = article.date
    ? new Date(article.date).toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : ''

  return (
    <article className="rounded-lg bg-white shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 md:p-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4" /> 返回首頁
        </Link>
        {article.image && (
          <div className="mb-6 rounded-md overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full max-h-80 object-cover object-top"
            />
          </div>
        )}
        <header className="mb-4">
          <p className="text-sm text-gray-500 mb-1">
            {article.source}
            {dateStr && ` · ${dateStr}`}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            {article.title}
          </h1>
        </header>
        <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
          {article.description}
        </p>
        {article.href && article.href !== '#' && (
          <a
            href={article.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-blue-600 hover:underline font-medium"
          >
            閱讀原文 →
          </a>
        )}
      </div>
    </article>
  )
}
