# AI YouTube 封面產生器

使用 OpenAI DALL-E 3 生成背景圖，並透過 Sharp 疊加文字，確保風格一致的 YouTube 封面圖產生系統。

## 功能特色

- ✅ 使用 OpenAI Images API 生成無文字背景圖
- ✅ 自動疊加主標題與副標題（字體一致、版型固定）
- ✅ 支援多種風格（Style A/B/C）
- ✅ 可一次生成 1/2/4 張封面
- ✅ 非同步處理，前端即時顯示進度
- ✅ 歷史紀錄查詢
- ✅ 支援 Zeabur 雲端部署

## 技術架構

- **Framework**: Next.js 14 (App Router)
- **Image Processing**: Sharp
- **Database**: SQLite (可升級至 Postgres)
- **AI Model**: OpenAI DALL-E 3
- **Styling**: Tailwind CSS

## 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 設定環境變數

複製 `.env.local.example` 為 `.env.local` 並填入你的 OpenAI API Key：

```bash
cp .env.local.example .env.local
```

編輯 `.env.local`：

```
OPENAI_API_KEY=sk-your-api-key-here
```

### 3. 執行開發伺服器

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 即可使用。

## 專案結構

```
/app
  page.tsx                 # 封面生成 UI
  /history/page.tsx        # 歷史紀錄
/api
  /generate/route.ts       # POST 建立任務
  /generate/[id]/route.ts  # GET 查狀態
  /jobs/route.ts           # GET 歷史紀錄
  /storage/[...path]       # 靜態檔案服務
/lib
  /openai.ts               # OpenAI client
  /image
    generateBackground.ts  # 生背景
    overlayText.ts         # 疊字
  /styles
    styleA.ts              # 風格 A
    styleB.ts              # 風格 B
    styleC.ts              # 風格 C
/db
  index.ts                 # 資料庫設定
  schema.ts                # 資料表定義
/storage
  /outputs                 # 生成的圖片
```

## Zeabur 部署

詳細部署步驟請參考 [DEPLOYMENT.md](./DEPLOYMENT.md)

### 快速部署步驟

1. **推送到 GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin <你的GitHub repo URL>
   git push -u origin main
   ```

2. **在 Zeabur 設定環境變數**
   - 進入 Zeabur Dashboard
   - 選擇你的服務 → Environment Variables
   - 新增 `OPENAI_API_KEY`（你的實際 API Key）
   - 新增 `NODE_ENV=production`

3. **部署**
   - Zeabur 會自動偵測 Next.js 並開始部署

⚠️ **重要提醒**：
- 不要將 `.env.local` 或 API Key 提交到 GitHub
- Zeabur 容器是暫存的，重啟後本地檔案會消失（適合測試階段）

## 風格系統

每個風格（Style）包含：

- `backgroundPrompt`: 背景圖的 AI 提示詞
- `text`: 文字樣式設定（字體、大小、位置、顏色）

新增風格：在 `/lib/styles/` 建立新的 style 檔案，並在 `index.ts` 中匯出。

## 開發注意事項

### 字體檔案

如需使用自訂字體，將 `.ttf` 檔案放在 `/public/fonts/` 目錄，並在 style 設定中指定字體名稱。

### 圖片尺寸

預設輸出尺寸為 **1280x720**（YouTube 封面標準尺寸），可在 style 設定中調整。

## License

MIT
