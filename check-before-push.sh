#!/bin/bash

# GitHub 推送前安全檢查腳本

echo "🔍 檢查專案是否準備好推送到 GitHub..."
echo ""

# 檢查 .env.local
if [ -f ".env.local" ]; then
    echo "✅ .env.local 存在（會被 .gitignore 排除）"
    if git check-ignore .env.local > /dev/null 2>&1; then
        echo "   ✅ 確認：.env.local 已被 .gitignore 排除"
    else
        echo "   ⚠️  警告：.env.local 沒有被 .gitignore 排除！"
    fi
else
    echo "ℹ️  .env.local 不存在（正常，會在 Zeabur 設定）"
fi

# 檢查 storage/jobs.json
if [ -f "storage/jobs.json" ]; then
    echo "✅ storage/jobs.json 存在（會被 .gitignore 排除）"
    if git check-ignore storage/jobs.json > /dev/null 2>&1; then
        echo "   ✅ 確認：storage/jobs.json 已被 .gitignore 排除"
    else
        echo "   ⚠️  警告：storage/jobs.json 沒有被 .gitignore 排除！"
    fi
fi

# 檢查 storage/outputs
if [ -d "storage/outputs" ]; then
    file_count=$(find storage/outputs -type f ! -name ".gitkeep" | wc -l | tr -d ' ')
    echo "✅ storage/outputs/ 目錄存在（包含 $file_count 個檔案，會被 .gitignore 排除）"
fi

# 檢查必要的檔案是否存在
echo ""
echo "📋 檢查必要的檔案："

required_files=(
    "package.json"
    "README.md"
    "DEPLOYMENT.md"
    "GITHUB_SETUP.md"
    ".gitignore"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file"
    else
        echo "   ❌ $file (缺少)"
    fi
done

echo ""
echo "📝 如果所有檢查都通過，你可以安全地推送到 GitHub"
echo ""
echo "下一步："
echo "1. git init (如果還沒有)"
echo "2. git add ."
echo "3. git commit -m 'Initial commit'"
echo "4. git remote add origin <你的GitHub repo URL>"
echo "5. git push -u origin main"
