import { generateBackground as openaiGenerateBackground } from '../openai';
import { StyleConfig } from '../types';
import sharp from 'sharp';

/**
 * 生成背景圖並轉換為 Buffer
 */
export async function generateBackground(style: StyleConfig): Promise<Buffer> {
  const b64Json = await openaiGenerateBackground(
    style.backgroundPrompt,
    style.size,
    style.visualElements
  );

  // 將 base64 轉換為 Buffer
  const buffer = Buffer.from(b64Json, 'base64');

  // 確保尺寸正確（OpenAI 可能返回不同尺寸）
  const resized = await sharp(buffer)
    .resize(style.size.width, style.size.height, {
      fit: 'cover',
    })
    .toBuffer();

  return resized;
}
