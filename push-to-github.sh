#!/bin/bash

# GitHub 推送腳本
# 使用方式：./push-to-github.sh

echo "🚀 準備推送到 GitHub..."
echo ""

# 檢查 remote 是否已設定
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ 錯誤：GitHub remote 尚未設定"
    exit 1
fi

echo "✅ Remote 已設定：$(git remote get-url origin)"
echo ""

# 檢查是否有未提交的變更
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  發現未提交的變更，先提交..."
    git add .
    git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"
fi

echo "📤 推送到 GitHub..."
echo ""
echo "請選擇認證方式："
echo "1. 使用 Personal Access Token（推薦）"
echo "2. 使用 SSH（如果已設定 SSH key）"
echo ""
read -p "請輸入選項 (1 或 2): " choice

case $choice in
    1)
        echo ""
        echo "請前往以下網址建立 Personal Access Token："
        echo "https://github.com/settings/tokens"
        echo ""
        echo "建立 token 時請勾選 'repo' 權限"
        echo ""
        read -p "請輸入你的 Personal Access Token: " token
        
        if [ -z "$token" ]; then
            echo "❌ Token 不能為空"
            exit 1
        fi
        
        # 設定 remote URL 包含 token
        git remote set-url origin https://${token}@github.com/k0807wu-blip/thumbnail_generator.git
        
        echo ""
        echo "📤 正在推送..."
        git push -u origin main
        
        # 推送完成後，移除 URL 中的 token（安全考量）
        git remote set-url origin https://github.com/k0807wu-blip/thumbnail_generator.git
        
        echo ""
        echo "✅ 推送完成！"
        ;;
    2)
        # 改用 SSH
        git remote set-url origin git@github.com:k0807wu-blip/thumbnail_generator.git
        echo ""
        echo "📤 正在推送（使用 SSH）..."
        git push -u origin main
        echo ""
        echo "✅ 推送完成！"
        ;;
    *)
        echo "❌ 無效的選項"
        exit 1
        ;;
esac

echo ""
echo "🎉 完成！請前往以下網址查看："
echo "https://github.com/k0807wu-blip/thumbnail_generator"
