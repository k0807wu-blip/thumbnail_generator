'use client';

import { useState, useEffect } from 'react';
import { styles } from '@/lib/styles';
import { GenerateParams } from '@/lib/types';

export default function Home() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [styleId, setStyleId] = useState('styleA');
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Polling job status
  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/generate/${jobId}`);
        const data = await res.json();
        setJobStatus(data);

        if (data.status === 'completed' || data.status === 'failed') {
          clearInterval(interval);
          setLoading(false);
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [jobId]);

  const handleGenerate = async () => {
    if (!title.trim()) {
      setError('請輸入主標題');
      return;
    }

    setLoading(true);
    setError(null);
    setJobStatus(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          subtitle: subtitle.trim() || undefined,
          styleId,
          count,
        } as GenerateParams),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || '生成失敗');
      }

      setJobId(data.jobId);
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失敗');
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    setJobId(null);
    setJobStatus(null);
    handleGenerate();
  };

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `thumbnail-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            AI YouTube 封面產生器
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            輸入標題，AI 自動生成風格一致的封面圖
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                主標題 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="例如：5 分鐘學會 React Hooks"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                副標題（選填）
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="例如：從零到一完整教學"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  風格
                </label>
                <select
                  value={styleId}
                  onChange={(e) => setStyleId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  disabled={loading}
                >
                  {Object.values(styles).map((style) => (
                    <option key={style.id} value={style.id}>
                      {style.name} {style.description ? `- ${style.description}` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  生成張數
                </label>
                <select
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  disabled={loading}
                >
                  <option value={1}>1 張</option>
                  <option value={2}>2 張</option>
                  <option value={4}>4 張</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading || !title.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? 'AI 正在設計封面...' : '生成封面'}
            </button>
          </div>
        </div>

        {/* 結果顯示 */}
        {jobStatus && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                生成結果
              </h2>
              {jobStatus.status === 'completed' && (
                <button
                  onClick={handleRegenerate}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                >
                  重新生成
                </button>
              )}
            </div>

            {jobStatus.status === 'generating' && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  AI 正在設計封面...
                </p>
              </div>
            )}

            {jobStatus.status === 'failed' && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-600 dark:text-red-400">
                  生成失敗：{jobStatus.error || '未知錯誤'}
                </p>
              </div>
            )}

            {jobStatus.status === 'completed' && jobStatus.outputPath && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.isArray(jobStatus.outputPath) ? (
                  jobStatus.outputPath.map((path: string, index: number) => (
                    <div key={index} className="relative group">
                      <img
                        src={path}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full rounded-lg shadow-md"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg flex items-center justify-center">
                        <button
                          onClick={() => handleDownload(path)}
                          className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transition-opacity"
                        >
                          下載
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="relative group">
                    <img
                      src={jobStatus.outputPath}
                      alt="Thumbnail"
                      className="w-full rounded-lg shadow-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg flex items-center justify-center">
                      <button
                        onClick={() => handleDownload(jobStatus.outputPath)}
                        className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium transition-opacity"
                      >
                        下載
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
