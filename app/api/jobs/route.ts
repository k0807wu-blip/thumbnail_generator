import { NextRequest, NextResponse } from 'next/server';
import { getAllJobs } from '@/db';

export async function GET(request: NextRequest) {
  try {
    const jobs = await getAllJobs();
    return NextResponse.json(jobs.slice(0, 50));
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
