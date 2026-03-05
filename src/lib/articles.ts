const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  'https://active-trust-e46c30f868.strapiapp.com'

export interface NewsItem {
  id: string
  title: string
  description: string
  source: string
  date: string
  href: string
  image: string
  /** Strapi category 名稱，用於 tab 篩選（對應後台 category (1)*） */
  category: string
}

function getCategoryName(raw: Record<string, unknown>): string {
  const attrs = (raw.attributes as Record<string, unknown>) || raw
  const cat = (attrs.category as Record<string, unknown>) || (raw.category as Record<string, unknown>)
  if (!cat) return ''
  const data = cat.data as Record<string, unknown> | undefined
  const inner = data?.attributes as Record<string, unknown> | undefined
  if (inner && typeof inner?.name === 'string') return inner.name
  if (data && typeof (data as Record<string, unknown>).name === 'string') return (data as Record<string, unknown>).name as string
  if (typeof cat.name === 'string') return cat.name
  return ''
}

function toNewsItem(raw: Record<string, unknown>): NewsItem {
  // 支援新 API 扁平格式（documentId, url, publishedAt）或舊 Strapi attributes
  const attrs = (raw.attributes as Record<string, unknown>) || raw
  const image = attrs.image as Record<string, unknown> | undefined
  const imageData = image?.data as Record<string, unknown> | undefined
  const imageAttrs = imageData?.attributes as Record<string, unknown> | undefined
  const imageUrl = (imageAttrs?.url as string) || (image?.url as string) || (attrs.image as string) || ''
  return {
    id: String(raw.documentId ?? raw.id ?? ''),
    title: (attrs.title as string) || (raw.title as string) || '',
    description: (attrs.description as string) || (raw.description as string) || '',
    source: (attrs.source as string) || (raw.source as string) || 'Strapi',
    date: (attrs.publishedAt as string) || (attrs.createdAt as string) || (raw.publishedAt as string) || (raw.createdAt as string) || '',
    href: (attrs.url as string) || (raw.url as string) || '#',
    image: imageUrl
      ? imageUrl.startsWith('http')
        ? imageUrl
        : `${STRAPI_URL}${imageUrl}`
      : '',
    category: getCategoryName(raw),
  }
}

export async function fetchArticles(): Promise<NewsItem[]> {
  const res = await fetch(`${STRAPI_URL}/api/articles?populate=image&populate=category`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`API ${res.status}`)
  const json = await res.json()
  // 支援直接陣列或 { data: [...] }
  const rawList = Array.isArray(json) ? json : (Array.isArray(json.data) ? json.data : [])
  return rawList.map((item: Record<string, unknown>) => toNewsItem(item))
}

export async function fetchArticleById(id: string): Promise<NewsItem | null> {
  const res = await fetch(`${STRAPI_URL}/api/articles/${id}?populate=image&populate=category`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) return null
  const json = await res.json()
  const raw = json.data ?? json
  if (!raw) return null
  return toNewsItem(raw as Record<string, unknown>)
}
