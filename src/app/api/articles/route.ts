import { NextResponse } from 'next/server'

const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'https://active-trust-e46c30f868.strapiapp.com'

export async function GET() {
  try {
    const res = await fetch(`${STRAPI_URL}/api/articles?populate=image`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error(`Strapi ${res.status}`)
    const json = await res.json()
    return NextResponse.json(json)
  } catch (e) {
    console.error('articles API error:', e)
    return NextResponse.json(
      { error: '無法取得文章', detail: e instanceof Error ? e.message : '' },
      { status: 500 }
    )
  }
}
