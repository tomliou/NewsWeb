import { NextResponse } from 'next/server'
import { fetchArticleById } from '@/lib/articles'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const article = await fetchArticleById(id)
    if (!article) {
      return NextResponse.json(
        { error: '找不到該文章' },
        { status: 404 }
      )
    }
    return NextResponse.json(article)
  } catch (e) {
    console.error('article API error:', e)
    return NextResponse.json(
      { error: '無法取得文章', detail: e instanceof Error ? e.message : '' },
      { status: 500 }
    )
  }
}
