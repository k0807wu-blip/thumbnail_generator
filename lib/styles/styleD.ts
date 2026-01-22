import { StyleConfig } from '../types';

export const styleD: StyleConfig = {
  id: 'styleD',
  name: 'YouTube Classic',
  description: '經典 YouTube 風格，紅白配色，適合各種類型的內容',
  size: { width: 1280, height: 720 },

  backgroundPrompt: `
professional youtube thumbnail background,
classic red and white color scheme,
bright red gradient background with white accents,
clean modern design, high contrast,
space for large bold text on left side,
subtle play button icon suggestion in background,
YouTube-style aesthetic, eye-catching,
no text, no letters, no watermark, no people
  `.trim(),

  visualElements: 'Play button icon, video camera, YouTube red accent, clean design',

  colorScheme: {
    primary: '#FF0000', // YouTube 紅
    secondary: '#FFFFFF', // 白色
    accent: '#000000', // 黑色
    background: '#CC0000', // 深紅
  },

  text: {
    font: 'NotoSansTC-Bold',
    mainSize: 92,
    subSize: 50,
    color: '#FFFFFF',
    shadow: true,
    shadowColor: '#000000',
    shadowBlur: 6,
    x: 70,
    y: 150,
    maxWidth: 750,
    lineGap: 17,
    fontWeight: 'bold',
  },

  layout: {
    titlePosition: 'top',
    visualFocus: 'right',
  },
};
