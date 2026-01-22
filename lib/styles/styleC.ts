import { StyleConfig } from '../types';

export const styleC: StyleConfig = {
  id: 'styleC',
  name: 'Vibrant Energy',
  description: '鮮豔活力風格，適合娛樂、遊戲、挑戰類內容',
  size: { width: 1280, height: 720 },

  backgroundPrompt: `
vibrant energetic youtube thumbnail background,
bold gradient from red to orange to yellow,
dynamic composition with exciting visual elements,
bright colors, high saturation,
eye-catching design, energetic atmosphere,
space for large text on left side,
dramatic lighting, action-oriented,
no text, no letters, no watermark, no people
  `.trim(),

  visualElements: 'Bold shapes, dynamic lines, vibrant colors, energy bursts',

  colorScheme: {
    primary: '#EF4444', // 紅色
    secondary: '#F97316', // 橙色
    accent: '#FBBF24', // 黃色
    background: '#DC2626', // 深紅
  },

  text: {
    font: 'NotoSansTC-Bold',
    mainSize: 100,
    subSize: 56,
    color: '#FFFFFF',
    shadow: true,
    shadowColor: '#000000',
    shadowBlur: 10,
    x: 60,
    y: 140,
    maxWidth: 680,
    lineGap: 18,
    fontWeight: 'bold',
  },

  layout: {
    titlePosition: 'top',
    visualFocus: 'right',
  },
};
