# GitHub 版本控管設定指南

## ✅ 安全檢查清單

在推送到 GitHub 之前，請確認以下檔案**不會**被提交：

### 已排除的檔案（.gitignore）

- ✅ `.env.local` - 包含你的 API Key
- ✅ `.env` - 環境變數檔案
- ✅ `storage/outputs/*` - 生成的圖片
- ✅ `storage/jobs.json` - 資料庫檔案
- ✅ `node_modules/` - 依賴套件

### 檢查命令

在推送前執行：

```bash
# 檢查哪些檔案會被提交
git status

# 確認沒有敏感檔案
git status --ignored

# 檢查 .env.local 是否會被提交（應該顯示為 ignored）
git check-ignore .env.local
```

## 🚀 推送到 GitHub 的步驟

### 1. 初始化 Git（如果還沒有）

```bash
cd /Users/wudingxuan/Thumbnail_Generation
git init
```

### 2. 檢查要提交的檔案

```bash
# 查看會被提交的檔案
git status

# 應該看到：
# - 所有 .ts, .tsx, .json 等程式碼檔案
# - README.md, package.json 等
# - 不應該看到：.env.local, storage/outputs/, storage/jobs.json
```

### 3. 第一次提交

```bash
# 加入所有檔案（.gitignore 會自動排除敏感檔案）
git add .

# 檢查暫存區的檔案
git status

# 提交
git commit -m "Initial commit: YouTube thumbnail generator with OpenAI"
```

### 4. 連結到 GitHub

```bash
# 在 GitHub 建立新的 Repository（不要初始化 README）
# 然後執行：

git remote add origin https://github.com/你的用戶名/你的專案名.git

# 或使用 SSH
git remote add origin git@github.com:你的用戶名/你的專案名.git
```

### 5. 推送到 GitHub

```bash
# 推送到 main 分支
git branch -M main
git push -u origin main
```

## 🔐 環境變數設定

### 本地開發

使用 `.env.local`（不會被提交）：

```bash
OPENAI_API_KEY=sk-proj-你的API金鑰
NODE_ENV=development
```

### Zeabur 部署

在 Zeabur Dashboard 設定環境變數：

```
OPENAI_API_KEY=sk-proj-你的API金鑰
NODE_ENV=production
```

## ⚠️ 如果意外提交了敏感檔案

如果發現 `.env.local` 或其他敏感檔案被提交了：

```bash
# 1. 從 Git 歷史中移除（但保留本地檔案）
git rm --cached .env.local

# 2. 提交這個變更
git commit -m "Remove sensitive files from git"

# 3. 推送到 GitHub
git push origin main

# 4. ⚠️ 重要：如果已經推送到 GitHub，需要：
#    - 立即在 GitHub 上刪除該檔案
#    - 重新生成 API Key（因為舊的 Key 已經暴露）
#    - 更新 Zeabur 的環境變數
```

## 📝 後續更新

當你修改程式碼後：

```bash
# 檢查變更
git status

# 加入變更
git add .

# 提交
git commit -m "描述你的變更"

# 推送到 GitHub
git push origin main
```

## ✅ 驗證清單

推送前確認：

- [ ] `.env.local` 不在 `git status` 中
- [ ] `storage/jobs.json` 不在 `git status` 中
- [ ] `storage/outputs/` 中的圖片不在 `git status` 中
- [ ] 所有程式碼檔案都在 `git status` 中
- [ ] README.md 和 DEPLOYMENT.md 都在

## 🎯 下一步

完成 GitHub 推送後，參考 [DEPLOYMENT.md](./DEPLOYMENT.md) 進行 Zeabur 部署。
