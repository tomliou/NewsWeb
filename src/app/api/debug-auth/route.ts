import { NextResponse } from 'next/server'

/**
 * 部署後打開 /api/debug-auth 可確認環境變數是否有設（不顯示實際值）
 * 確認完可刪除此檔或從 Vercel 移除
 */
export async function GET() {
  const hasUrl = Boolean(process.env.NEXTAUTH_URL)
  const hasSecret = Boolean(process.env.NEXTAUTH_SECRET)
  const hasGoogleId = Boolean(process.env.GOOGLE_ID)
  const hasGoogleSecret = Boolean(process.env.GOOGLE_SECRET)
  const ok = hasUrl && hasSecret && hasGoogleId && hasGoogleSecret

  return NextResponse.json({
    ok,
    message: ok
      ? '環境變數都有設定，若仍登入失敗請檢查 GOOGLE_ID 是否與 Google Console 有設重新導向 URI 的用戶端一致'
      : '有環境變數未設定',
    env: {
      NEXTAUTH_URL: hasUrl ? '已設定' : '未設定',
      NEXTAUTH_SECRET: hasSecret ? '已設定' : '未設定',
      GOOGLE_ID: hasGoogleId ? '已設定' : '未設定',
      GOOGLE_SECRET: hasGoogleSecret ? '已設定' : '未設定',
    },
  })
}
