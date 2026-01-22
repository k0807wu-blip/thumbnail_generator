# 快速開始指南

## 1. 安裝依賴

```bash
npm install
```

## 2. 設定環境變數

複製環境變數範例檔案：

```bash
cp .env.local.example .env.local
```

編輯 `.env.local`，填入你的 OpenAI API Key：

```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

## 3. 啟動開發伺服器

```bash
npm run dev
```

開啟瀏覽器訪問：http://localhost:3000

## 4. 使用方式

1. 輸入主標題（必填）
2. 輸入副標題（選填）
3. 選擇風格（Style A/B/C）
4. 選擇生成張數（1/2/4）
5. 點擊「生成封面」
6. 等待 AI 生成完成
7. 下載或重新生成

## 5. 查看歷史紀錄

訪問：http://localhost:3000/history

## 注意事項

- 首次使用需要 OpenAI API Key（DALL-E 3）
- 生成的圖片會儲存在 `/storage/outputs/` 目錄
- 資料庫檔案為 `thumbnail.db`（SQLite）

## Zeabur 部署

1. 將專案推送到 GitHub
2. 在 Zeabur 連結 Repository
3. 設定環境變數 `OPENAI_API_KEY`
4. 部署完成！

⚠️ **重要**：Zeabur 容器是暫存的，正式環境建議使用 S3/R2 儲存圖片。
