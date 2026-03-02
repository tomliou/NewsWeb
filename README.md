# NewsWeb

這是湯六學習 Vibe Coding 的網站，我以 Strapi 為後端、Next.js 為前端的學習專案，人生第一次做還是有點小小害羞 >///<

## 功能特點

- **首屏即時內容**：首頁以 Server Component 在伺服器端取得文章（SSR），進入網站即可看到精選新聞，無需等待「載入中」
- **個人化問候**：每日精選標題含隨機稱謂與當日日期（例：`{userName} 早安！以下是 YYYY-MM-DD 的精選新聞`）
- **分類 Tab**：依 API 的 `source` 篩選 — 科技、財經、社會、娛樂
- **響應式設計**：支援桌面與行動裝置
- **暗黑模式**：使用 next-themes 切換亮/暗主題
- **用戶登入**：NextAuth.js（支援 GitHub、Google OAuth）
- **收藏功能**：可收藏新聞（書籤 API）

## 技術棧

- **框架**：Next.js 14（App Router）
- **語言**：TypeScript
- **樣式**：Tailwind CSS
- **認證**：NextAuth.js
- **UI**：Headless UI（Tab）、Heroicons、next-themes

## 資料來源

- 文章由 **Strapi** API 提供（預設：`https://active-trust-e46c30f868.strapiapp.com/api/articles`）
- 前端透過 `src/lib/articles.ts` 的 `fetchArticles()` 在伺服器端請求，並將結果傳給客戶端元件 `HomeClient` 渲染

## 開始使用

1. **克隆專案**

```bash
git clone https://github.com/tomliou/NewsWeb.git
cd NewsWeb
```

2. **安裝依賴**

```bash
npm install
```

3. **環境變數**

複製 `.env.example` 為 `.env`（若無範例檔可手動建立 `.env`），並填入所需變數：

```bash
cp .env.example .env
```

4. **啟動開發伺服器**

```bash
npm run dev
```

5. 在瀏覽器開啟 [http://localhost:3000](http://localhost:3000)（若 3000 被佔用會改用 3001）

## 環境變數

| 變數 | 說明 |
|------|------|
| `NEXT_PUBLIC_STRAPI_URL` | Strapi API 基底網址（選填，有預設） |
| `NEXTAUTH_URL` | 應用對外 URL |
| `NEXTAUTH_SECRET` | NextAuth.js 密鑰 |
| `GITHUB_ID` / `GITHUB_SECRET` | GitHub OAuth |
| `GOOGLE_ID` / `GOOGLE_SECRET` | Google OAuth |

## 專案結構（摘要）

- `src/app/page.tsx` — 首頁（Server Component，伺服器端 fetch 文章）
- `src/components/HomeClient.tsx` — 首頁客戶端 UI（標題、Tab、新聞卡片）
- `src/lib/articles.ts` — 文章型別與 `fetchArticles()`（供伺服器使用）
- `src/app/api/articles/route.ts` — 可選的 Next.js API 轉發 Strapi 文章

## 部署

可部署至 Vercel 等支援 Next.js 的環境：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tomliou/NewsWeb)

部署時請在平台設定上述環境變數。

## 貢獻

歡迎提交 Issue 或 Pull Request。

## 許可證

MIT
