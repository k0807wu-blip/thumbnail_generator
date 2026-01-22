import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { JobStatus } from '@/lib/types';

const DB_FILE = join(process.cwd(), 'storage', 'jobs.json');

// 確保目錄存在
async function ensureDir() {
  const dir = join(process.cwd(), 'storage');
  await mkdir(dir, { recursive: true });
}

// 讀取資料
export async function getJobs(): Promise<JobStatus[]> {
  try {
    await ensureDir();
    const data = await readFile(DB_FILE, 'utf-8');
    const jobs = JSON.parse(data);
    // 將字串日期轉換為 Date 物件
    return jobs.map((job: any) => ({
      ...job,
      createdAt: new Date(job.createdAt),
      updatedAt: new Date(job.updatedAt),
    }));
  } catch {
    return [];
  }
}

// 取得單一 Job
export async function getJob(id: string): Promise<JobStatus | null> {
  const jobs = await getJobs();
  const job = jobs.find((job) => job.id === id);
  return job || null;
}

// 新增或更新 Job
export async function saveJob(job: JobStatus): Promise<void> {
  await ensureDir();
  const jobs = await getJobs();
  const index = jobs.findIndex((j) => j.id === job.id);
  
  if (index >= 0) {
    jobs[index] = job;
  } else {
    jobs.push(job);
  }
  
  await writeFile(DB_FILE, JSON.stringify(jobs, null, 2), 'utf-8');
}

// 取得所有 Jobs（按時間排序）
export async function getAllJobs(): Promise<JobStatus[]> {
  const jobs = await getJobs();
  return jobs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
