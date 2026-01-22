import { NextRequest, NextResponse } from 'next/server';
import { saveJob, getJob } from '@/db';
import { generateBackground } from '@/lib/image/generateBackground';
import { overlayText } from '@/lib/image/overlayText';
import { getStyle } from '@/lib/styles';
import { GenerateParams, JobStatus } from '@/lib/types';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, subtitle, styleId, count = 1 }: GenerateParams = body;

    // 驗證輸入
    if (!title || !styleId) {
      return NextResponse.json(
        { error: 'Title and styleId are required' },
        { status: 400 }
      );
    }

    // 建立 Job
    const jobId = randomUUID();
    const params: GenerateParams = { title, subtitle, styleId, count };

    const newJob: JobStatus = {
      id: jobId,
      status: 'pending',
      params,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await saveJob(newJob);

    // 非同步處理生成任務
    processGeneration(jobId, params).catch((error) => {
      console.error('Generation error:', error);
    });

    return NextResponse.json({ jobId, status: 'pending' });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function processGeneration(jobId: string, params: GenerateParams) {
  try {
    // 更新狀態為 generating
    const job = await getJob(jobId);
    if (!job) return;
    
    job.status = 'generating';
    job.updatedAt = new Date();
    await saveJob(job);

    const style = getStyle(params.styleId);
    const outputPaths: string[] = [];

    // 確保輸出目錄存在
    const outputDir = join(process.cwd(), 'storage', 'outputs');
    await mkdir(outputDir, { recursive: true });

    // 生成指定數量的圖片
    for (let i = 0; i < params.count; i++) {
      // 1. 生成背景
      const backgroundBuffer = await generateBackground(style);

      // 2. 疊加文字
      const finalImage = await overlayText({
        backgroundBuffer,
        title: params.title,
        subtitle: params.subtitle,
        style,
      });

      // 3. 儲存檔案
      const filename = `${jobId}_${i + 1}.png`;
      const filepath = join(outputDir, filename);
      await writeFile(filepath, finalImage);

      outputPaths.push(`/api/storage/outputs/${filename}`);
    }

    // 更新狀態為 completed
    job.status = 'completed';
    job.outputPath = outputPaths;
    job.updatedAt = new Date();
    await saveJob(job);
  } catch (error) {
    console.error('Generation failed:', error);
    const job = await getJob(jobId);
    if (job) {
      job.status = 'failed';
      job.error = error instanceof Error ? error.message : 'Unknown error';
      job.updatedAt = new Date();
      await saveJob(job);
    }
  }
}
