import OpenAI from 'openai';

// 延遲初始化，避免建置時檢查環境變數
function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set');
  }
  return new OpenAI({
    apiKey,
  });
}

// 使用 lazy initialization
let _openai: OpenAI | null = null;

export function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = getOpenAIClient();
  }
  return _openai;
}

/**
 * 生成背景圖（無文字）
 */
export async function generateBackground(
  prompt: string,
  size: { width: number; height: number },
  visualElements?: string
): Promise<string> {
  try {
    // DALL-E 3 只支援特定尺寸，使用最接近的橫向尺寸
    // 之後會用 sharp 調整到目標尺寸
    const dalleSize: '1024x1024' | '1792x1024' | '1024x1792' = '1792x1024';
    
    // 組合完整的 prompt，加入視覺元素描述
    let fullPrompt = prompt;
    if (visualElements) {
      fullPrompt += `, ${visualElements}`;
    }
    fullPrompt += ', no text, no letters, no watermark, no words, professional youtube thumbnail design';
    
    const openai = getOpenAI();
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: fullPrompt,
      size: dalleSize,
      quality: 'hd',
      response_format: 'b64_json',
      n: 1,
    });

    if (!response.data || !response.data[0]?.b64_json) {
      throw new Error('No image data returned from OpenAI');
    }

    return response.data[0].b64_json;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}
