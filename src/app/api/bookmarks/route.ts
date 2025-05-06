import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

// 模擬數據庫
let bookmarks = new Map()

export async function GET(request: Request) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: '未登錄' },
      { status: 401 }
    )
  }

  const userBookmarks = bookmarks.get(session.user.email) || []
  return NextResponse.json(userBookmarks)
}

export async function POST(request: Request) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: '未登錄' },
      { status: 401 }
    )
  }

  try {
    const data = await request.json()
    const userBookmarks = bookmarks.get(session.user.email) || []
    
    // 檢查是否已經收藏
    const exists = userBookmarks.some((b: any) => b.id === data.id)
    if (!exists) {
      userBookmarks.push(data)
      bookmarks.set(session.user.email, userBookmarks)
    }

    return NextResponse.json(userBookmarks)
  } catch (error) {
    return NextResponse.json(
      { error: '收藏失敗' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: '未登錄' },
      { status: 401 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: '缺少 ID 參數' },
        { status: 400 }
      )
    }

    const userBookmarks = bookmarks.get(session.user.email) || []
    const newBookmarks = userBookmarks.filter((b: any) => b.id !== id)
    bookmarks.set(session.user.email, newBookmarks)

    return NextResponse.json(newBookmarks)
  } catch (error) {
    return NextResponse.json(
      { error: '取消收藏失敗' },
      { status: 500 }
    )
  }
} 