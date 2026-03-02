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
}

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
    image: imageUrl
      ? imageUrl.startsWith('http')
        ? imageUrl
        : `${STRAPI_URL}${imageUrl}`
      : '',
  }
}

export async function fetchArticles(): Promise<NewsItem[]> {
  const res = await fetch(`${STRAPI_URL}/api/articles`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`API ${res.status}`)
  const json = await res.json()
  const rawList = Array.isArray(json.data) ? json.data : []
  return rawList.map((item: Record<string, unknown>) => toNewsItem(item))
}
