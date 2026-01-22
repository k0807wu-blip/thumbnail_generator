# 風格系統設計指南

## 概述

本專案的風格系統參考了專業 YouTube 縮圖設計最佳實踐，確保每個風格都有：
- **固定的視覺規範**：配色、字體、版型
- **詳細的 Prompt 描述**：讓 AI 生成更一致的背景
- **明確的使用場景**：每個風格適合的內容類型

## 風格列表

### Style A: Dark Tech（深色科技）
- **適用場景**：科技、程式設計、AI、數位工具
- **配色**：深藍、黑色、青色霓虹
- **特色**：科技感、未來感、專業

### Style B: Bright Minimal（明亮簡約）
- **適用場景**：教學、生活、知識分享、教育
- **配色**：白色、淺灰藍、藍色
- **特色**：簡潔、專業、易讀

### Style C: Vibrant Energy（鮮豔活力）
- **適用場景**：娛樂、遊戲、挑戰、運動
- **配色**：紅、橙、黃
- **特色**：高能量、吸引眼球、動感

### Style D: YouTube Classic（經典 YouTube）
- **適用場景**：通用、各種類型內容
- **配色**：YouTube 紅、白色、黑色
- **特色**：經典、高辨識度、平台風格

## 設計原則

### 1. 背景 Prompt 結構

每個風格的 `backgroundPrompt` 都遵循以下結構：

```
[風格描述] youtube thumbnail background,
[主要視覺元素],
[配色方案],
[設計特色],
[文字區域預留],
[禁止元素]
```

### 2. 文字疊加規範

- **主標題**：大、粗、高對比
- **副標題**：稍小、可選、輔助說明
- **陰影**：確保文字在任何背景下都清晰可讀
- **位置**：通常在左側，預留視覺焦點區域

### 3. 配色系統

每個風格定義了完整的配色方案：
- `primary`: 主色
- `secondary`: 次色
- `accent`: 強調色
- `background`: 背景色

### 4. 視覺元素

`visualElements` 欄位描述背景中應包含的視覺元素，幫助 AI 生成更符合風格的背景。

## 新增風格

要新增風格，請：

1. 在 `/lib/styles/` 建立新檔案（如 `styleE.ts`）
2. 參考現有風格結構，定義：
   - `id`, `name`, `description`
   - `backgroundPrompt`（詳細描述）
   - `visualElements`（視覺元素）
   - `colorScheme`（配色）
   - `text`（文字設定）
   - `layout`（版型設定）
3. 在 `index.ts` 中匯出並註冊

## Prompt 撰寫技巧

### ✅ 好的 Prompt 範例

```
professional youtube thumbnail background,
dark tech aesthetic, deep gradient from dark blue to black,
subtle neon blue and cyan accent lights,
minimal geometric shapes and tech patterns in background,
high contrast, cinematic lighting,
modern digital workspace atmosphere,
space for text overlay on left side,
no text, no letters, no watermark, no people
```

### ❌ 不好的 Prompt 範例

```
dark background, tech style
```

**問題**：太簡略，AI 無法理解具體需求

## 最佳實踐

1. **保持一致性**：同一頻道使用相同風格
2. **高對比度**：確保文字清晰可讀
3. **預留空間**：背景要為文字預留足夠空間
4. **視覺焦點**：重要元素放在右側（避開文字區）
5. **禁止文字**：背景中絕對不能有文字（由程式疊加）

## 參考資源

- YouTube Creator Academy: Thumbnail Best Practices
- Design Principles: Contrast, Hierarchy, Balance
- Color Theory: Color Psychology in Marketing
