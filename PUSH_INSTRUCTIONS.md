# 推送到 GitHub 的步驟

## 🎯 快速方式

執行以下命令：

```bash
./push-to-github.sh
```

腳本會引導你完成推送。

## 📝 手動方式

### 步驟 1: 建立 Personal Access Token

1. 前往：https://github.com/settings/tokens
2. 點擊 **「Generate new token (classic)」**
3. 設定：
   - **Note**: `thumbnail_generator`
   - **Expiration**: 選擇期限（建議 90 天）
   - **勾選權限**: `repo`（全部權限）
4. 點擊 **「Generate token」**
5. **複製 token**（只會顯示一次！）

### 步驟 2: 推送程式碼

執行以下命令（將 `YOUR_TOKEN` 替換為你的 token）：

```bash
git remote set-url origin https://YOUR_TOKEN@github.com/k0807wu-blip/thumbnail_generator.git
git push -u origin main
```

### 步驟 3: 驗證

前往 https://github.com/k0807wu-blip/thumbnail_generator 確認程式碼已上傳。

## 🔐 安全提醒

- ✅ Token 只會用於推送，不會儲存在專案中
- ✅ 推送完成後，remote URL 會自動恢復為不含 token 的版本
- ✅ 不要將 token 提交到 Git

## 🚀 後續更新

之後要更新程式碼時，直接執行：

```bash
git add .
git commit -m "描述你的更新"
git push origin main
```

## ❓ 遇到問題？

### 問題 1: 認證失敗

**解決**：確認 token 有 `repo` 權限，且未過期。

### 問題 2: 權限不足

**解決**：確認你是 repository 的擁有者或有寫入權限。

### 問題 3: 推送被拒絕

**解決**：如果 GitHub 上已有檔案，先執行：
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```
