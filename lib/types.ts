export interface StyleConfig {
  id: string;
  name: string;
  description: string; // 風格描述
  size: { width: number; height: number };
  backgroundPrompt: string;
  visualElements?: string; // 視覺元素描述（用於 prompt）
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  text: {
    font: string;
    mainSize: number;
    subSize: number;
    color: string;
    shadow: boolean;
    shadowColor?: string;
    shadowBlur?: number;
    x: number;
    y: number;
    maxWidth: number;
    lineGap: number;
    fontWeight?: string;
  };
  layout?: {
    titlePosition: 'top' | 'center' | 'bottom';
    visualFocus?: 'left' | 'center' | 'right';
  };
}

export interface GenerateParams {
  title: string;
  subtitle?: string;
  styleId: string;
  count: number;
}

export interface JobStatus {
  id: string;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  params: GenerateParams;
  outputPath?: string | string[];
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}
