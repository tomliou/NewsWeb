# 新聞聚合平台

這是湯六用 vide coding 做的一個現代化的新聞聚合網站，匯集各大平台熱門新聞網站(其實也沒這麼厲害拉)
人生第一次做這個也是小小害羞

## 功能特點

- 🔄 實時聚合多個平台的熱門新聞
- 📱 響應式設計，完美支持移動端
- 🌓 支持暗黑模式
- 👤 用戶登錄和認證
- 🔖 新聞收藏功能
- 🔍 分類瀏覽

## 技術棧

- Next.js 14
- TypeScript
- Tailwind CSS
- NextAuth.js
- Zustand

## 開始使用

1. 克隆項目：

```bash
git clone [repository-url]
cd news-aggregator
```

2. 安裝依賴：

```bash
npm install
```

3. 配置環境變量：

複製 `.env.example` 到 `.env`，並填入相應的值：

```bash
cp .env.example .env
```

4. 運行開發服務器：

```bash
npm run dev
```

5. 訪問 [http://localhost:3000](http://localhost:3000)

## 環境變量

- `NEXTAUTH_URL`: 應用 URL
- `NEXTAUTH_SECRET`: NextAuth.js 密鑰
- `GITHUB_ID`: GitHub OAuth 應用 ID
- `GITHUB_SECRET`: GitHub OAuth 密鑰
- `GOOGLE_ID`: Google OAuth 應用 ID
- `GOOGLE_SECRET`: Google OAuth 密鑰

## 部署

本項目可以輕鬆部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=[repository-url])

## 貢獻

歡迎提交 Pull Request 或創建 Issue！

## 許可證

MIT 

#campaign的物流設定