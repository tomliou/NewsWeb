import HomeClient from '@/components/HomeClient'
import { fetchArticles } from '@/lib/articles'

export default async function Page() {
  let articles: Awaited<ReturnType<typeof fetchArticles>> = []
  let error: string | null = null
  try {
    articles = await fetchArticles()
  } catch (e) {
    error = e instanceof Error ? e.message : '無法載入新聞，請稍後再試'
  }

  return <HomeClient initialArticles={articles} error={error} />
}
