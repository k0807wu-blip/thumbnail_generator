import sharp from 'sharp';
import { StyleConfig } from '../types';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * 將文字疊加到背景圖上
 */
export async function overlayText({
  backgroundBuffer,
  title,
  subtitle,
  style,
}: {
  backgroundBuffer: Buffer;
  title: string;
  subtitle?: string;
  style: StyleConfig;
}): Promise<Buffer> {
  const { text: textConfig } = style;

  // 讀取字體（如果有的話，否則使用系統字體）
  let fontPath: string | undefined;
  try {
    fontPath = join(process.cwd(), 'public', 'fonts', `${textConfig.font}.ttf`);
    readFileSync(fontPath); // 檢查檔案是否存在
  } catch {
    fontPath = undefined; // 使用系統預設字體
  }

  // 處理主標題換行（最多 2 行）
  const titleLines = wrapText(title, textConfig.maxWidth, textConfig.mainSize);
  const titleHeight = titleLines.length * (textConfig.mainSize + textConfig.lineGap);

  // 建立 SVG 文字層
  const svgParts: string[] = [];

  // 陰影設定
  const shadowColor = textConfig.shadowColor || '#000000';
  const shadowBlur = textConfig.shadowBlur || 6;
  const shadowOpacity = 0.6;

  // 主標題
  titleLines.forEach((line, index) => {
    const y = textConfig.y + index * (textConfig.mainSize + textConfig.lineGap);
    const fontWeight = textConfig.fontWeight || 'bold';
    
    if (textConfig.shadow) {
      // 先繪製陰影（偏移位置）
      svgParts.push(
        `<text x="${textConfig.x + 2}" y="${y + 2}" font-size="${textConfig.mainSize}" fill="${shadowColor}" font-weight="${fontWeight}" opacity="${shadowOpacity}">${escapeXml(line)}</text>`
      );
    }
    
    // 再繪製文字本身
    svgParts.push(
      `<text x="${textConfig.x}" y="${y}" font-size="${textConfig.mainSize}" fill="${textConfig.color}" font-weight="${fontWeight}">${escapeXml(line)}</text>`
    );
  });

  // 副標題（如果有）
  if (subtitle) {
    const subtitleY = textConfig.y + titleHeight + textConfig.lineGap * 2;
    const fontWeight = textConfig.fontWeight || 'bold';
    
    if (textConfig.shadow) {
      // 先繪製陰影（偏移位置）
      svgParts.push(
        `<text x="${textConfig.x + 2}" y="${subtitleY + 2}" font-size="${textConfig.subSize}" fill="${shadowColor}" font-weight="${fontWeight}" opacity="${shadowOpacity * 0.8}">${escapeXml(subtitle)}</text>`
      );
    }
    
    // 再繪製文字本身
    svgParts.push(
      `<text x="${textConfig.x}" y="${subtitleY}" font-size="${textConfig.subSize}" fill="${textConfig.color}" font-weight="${fontWeight}" opacity="0.95">${escapeXml(subtitle)}</text>`
    );
  }

  // 完整的 SVG
  const svg = `
    <svg width="${style.size.width}" height="${style.size.height}" xmlns="http://www.w3.org/2000/svg">
      ${svgParts.join('\n')}
    </svg>
  `.trim();

  // 使用 sharp 合成
  const result = await sharp(backgroundBuffer)
    .composite([
      {
        input: Buffer.from(svg),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toBuffer();

  return result;
}

/**
 * 簡單的文字換行（基於字元數估算）
 */
function wrapText(text: string, maxWidth: number, fontSize: number): string[] {
  // 簡化版：根據字體大小和最大寬度估算每行字數
  // 中文字約等於字體大小，英文字約等於字體大小的 0.6 倍
  const avgCharWidth = fontSize * 0.8; // 混合中英文的平均值
  const maxCharsPerLine = Math.floor(maxWidth / avgCharWidth);
  
  if (text.length <= maxCharsPerLine) {
    return [text];
  }

  // 嘗試在空格或標點處斷行
  const lines: string[] = [];
  let remaining = text;

  while (remaining.length > maxCharsPerLine) {
    let breakPoint = maxCharsPerLine;
    
    // 尋找最近的空格或標點
    for (let i = maxCharsPerLine; i > maxCharsPerLine * 0.6; i--) {
      const char = remaining[i];
      if (char === ' ' || char === '，' || char === '。' || char === '、') {
        breakPoint = i + 1;
        break;
      }
    }

    lines.push(remaining.substring(0, breakPoint).trim());
    remaining = remaining.substring(breakPoint).trim();
  }

  if (remaining) {
    lines.push(remaining);
  }

  // 最多 2 行
  if (lines.length > 2) {
    return [lines[0], lines.slice(1).join('')];
  }

  return lines;
}

/**
 * 轉義 XML 特殊字元
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
