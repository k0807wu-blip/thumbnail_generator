import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join, resolve, normalize } from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // 確保路徑安全，避免路徑遍歷攻擊
    const safePath = params.path.map(p => p.replace(/\.\./g, '')).join('/');
    const storageDir = resolve(process.cwd(), 'storage');
    const filePath = resolve(storageDir, safePath);
    
    // 確保檔案路徑在 storage 目錄內（安全性檢查）
    if (!filePath.startsWith(storageDir)) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const file = await readFile(filePath);

    return new NextResponse(file, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': file.length.toString(),
      },
    });
  } catch (error) {
    console.error('Storage API error:', error);
    return NextResponse.json(
      { error: 'File not found', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 404 }
    );
  }
}
