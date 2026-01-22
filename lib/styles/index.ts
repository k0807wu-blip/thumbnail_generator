import { styleA } from './styleA';
import { styleB } from './styleB';
import { styleC } from './styleC';
import { styleD } from './styleD';
import { StyleConfig } from '../types';

export const styles: Record<string, StyleConfig> = {
  styleA,
  styleB,
  styleC,
  styleD,
};

export function getStyle(styleId: string): StyleConfig {
  const style = styles[styleId];
  if (!style) {
    throw new Error(`Style ${styleId} not found`);
  }
  return style;
}

export { styleA, styleB, styleC, styleD };
