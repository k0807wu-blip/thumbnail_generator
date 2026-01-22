import { StyleConfig } from '../types';

export const styleB: StyleConfig = {
  id: 'styleB',
  name: 'Bright Minimal',
  description: '明亮簡約風格，適合教學、生活、知識分享內容',
  size: { width: 1280, height: 720 },

  backgroundPrompt: `
clean bright youtube thumbnail background,
light pastel gradient from white to soft blue,
minimal design with subtle geometric shapes,
plenty of whitespace on left side for text,
soft shadows and gentle lighting,
modern clean aesthetic, professional,
high quality, eye-catching but not overwhelming,
no text, no letters, no watermark, no people
  `.trim(),

  visualElements: 'Minimal icons, soft shapes, clean lines, light accents',

  colorScheme: {
    primary: '#FFFFFF', // 白色
    secondary: '#F0F4F8', // 淺灰藍
    accent: '#3B82F6', // 藍色
    background: '#F8FAFC', // 淺灰白
  },

  text: {
    font: 'NotoSansTC-Bold',
    mainSize: 88,
    subSize: 48,
    color: '#1A1A1A',
    shadow: false,
    x: 100,
    y: 180,
    maxWidth: 800,
    lineGap: 20,
    fontWeight: 'bold',
  },

  layout: {
    titlePosition: 'top',
    visualFocus: 'center',
  },
};
