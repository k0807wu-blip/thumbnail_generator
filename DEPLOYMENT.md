# Zeabur 部署指南

## 📋 部署前準備

### 1. GitHub Repository 設定

確保以下檔案**不會**被提交到 GitHub（已在 `.gitignore` 中）：

- ✅ `.env.local` - 本地環境變數
- ✅ `.env` - 環境變數檔案
- ✅ `storage/outputs/*` - 生成的圖片
- ✅ `storage/jobs.json` - 資料庫檔案
- ✅ `node_modules/` - 依賴套件

### 2. 推送到 GitHub

```bash
# 初始化 Git（如果還沒有）
git init

# 檢查哪些檔案會被提交
git status

# 確認沒有敏感檔案
git add .

# 提交
git commit -m "Initial commit: YouTube thumbnail generator"

# 連結到 GitHub（替換成你的 repo URL）
git remote add origin https://github.com/你的用戶名/你的專案名.git

# 推送到 GitHub
git push -u origin main
```

## 🚀 Zeabur 部署步驟

### 步驟 1: 在 Zeabur 建立服務

1. 登入 [Zeabur Dashboard](https://dash.zeabur.com)
2. 點擊 **「New Project」** 或選擇現有專案
3. 選擇 **「Import from GitHub」**
4. 選擇你的 Repository
5. Zeabur 會自動偵測為 Next.js 專案

### 步驟 2: 設定環境變數

在 Zeabur Dashboard 中：

1. 進入你的服務頁面
2. 點擊 **「Environment Variables」** 標籤
3. 新增以下環境變數：

```
OPENAI_API_KEY=sk-proj-你的實際API金鑰
NODE_ENV=production
```

⚠️ **重要**：不要將 API Key 提交到 GitHub！

### 步驟 3: 部署設定

Zeabur 會自動偵測 Next.js，但你可以確認以下設定：

- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start`
- **Port**: `3000`（Next.js 預設）

### 步驟 4: 部署

1. 點擊 **「Deploy」** 按鈕
2. 等待建置完成（約 2-5 分鐘）
3. Zeabur 會提供一個 URL，例如：`https://your-app.zeabur.app`

## ⚠️ 重要注意事項

### 檔案儲存限制

**Zeabur 容器是暫存的**，重啟後本地檔案會消失：

- ✅ **可以接受**：測試階段，資料可以暫時消失
- ❌ **正式環境**：建議使用 S3 / Cloudflare R2 儲存圖片

### 目前的行為

- 生成的圖片會存在容器內的 `/storage/outputs/`
- 資料庫檔案存在 `/storage/jobs.json`
- **容器重啟後這些檔案會消失**

### 未來升級建議

如果需要持久化儲存，可以：

1. 使用 **Cloudflare R2**（推薦，免費額度較大）
2. 使用 **AWS S3**
3. 使用 **Zeabur 的 Volume**（付費功能）

## 🔍 驗證部署

部署完成後，測試以下功能：

1. ✅ 訪問首頁，確認 UI 正常顯示
2. ✅ 輸入標題，生成一張縮圖
3. ✅ 檢查圖片是否能正常顯示和下載
4. ✅ 查看歷史紀錄頁面

## 🐛 常見問題

### 問題 1: 環境變數未設定

**症狀**：生成時出現 API 錯誤

**解決**：確認 Zeabur Dashboard 中已設定 `OPENAI_API_KEY`

### 問題 2: 圖片無法顯示

**症狀**：生成成功但圖片顯示不出來

**解決**：
- 檢查 `/api/storage/[...path]/route.ts` 是否正常
- 確認圖片路徑格式為 `/api/storage/outputs/xxx.png`

### 問題 3: 建置失敗

**症狀**：Zeabur 建置時出錯

**解決**：
- 檢查 `package.json` 中的依賴是否正確
- 確認 Node.js 版本（Zeabur 通常使用 Node 18+）

## 📝 更新部署

當你更新程式碼後：

```bash
# 本地提交
git add .
git commit -m "Update: 描述你的更新"
git push origin main
```

Zeabur 會自動偵測 GitHub 的更新並重新部署。

## 🔐 安全建議

1. ✅ **永遠不要**將 API Key 提交到 GitHub
2. ✅ 使用 Zeabur 的環境變數功能
3. ✅ 定期更新依賴套件
4. ✅ 監控 API 使用量，避免超額

## 📞 需要幫助？

- Zeabur 文件：https://zeabur.com/docs
- GitHub Issues：在專案中開 Issue
