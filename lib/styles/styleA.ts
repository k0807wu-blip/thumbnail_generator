import { StyleConfig } from '../types';

export const styleA: StyleConfig = {
  id: 'styleA',
  name: 'Dark Tech',
  description: '深色科技風格，適合科技、程式設計、AI 相關內容',
  size: { width: 1280, height: 720 },

  backgroundPrompt: `
professional youtube thumbnail background,
dark tech aesthetic, deep gradient from dark blue to black,
subtle neon blue and cyan accent lights,
minimal geometric shapes and tech patterns in background,
high contrast, cinematic lighting,
modern digital workspace atmosphere,
space for text overlay on left side,
no text, no letters, no watermark, no people
  `.trim(),

  visualElements: 'Tech icons, geometric patterns, neon accents, digital grid',

  colorScheme: {
    primary: '#1E3A8A', // 深藍
    secondary: '#0F172A', // 深灰黑
    accent: '#00D9FF', // 青色
    background: '#0A0E27', // 深色背景
  },

  text: {
    font: 'NotoSansTC-Bold',
    mainSize: 96,
    subSize: 52,
    color: '#FFFFFF',
    shadow: true,
    shadowColor: '#000000',
    shadowBlur: 8,
    x: 80,
    y: 160,
    maxWidth: 720,
    lineGap: 16,
    fontWeight: 'bold',
  },

  layout: {
    titlePosition: 'top',
    visualFocus: 'right',
  },
};
