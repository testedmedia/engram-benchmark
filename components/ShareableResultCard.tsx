'use client';

import { useState } from 'react';
import { Download, Share2 } from 'lucide-react';

interface ShareableResultCardProps {
  toolName: string;
  score: number;
  grade: string;
}

export default function ShareableResultCard({
  toolName,
  score,
  grade,
}: ShareableResultCardProps) {
  const [downloading, setDownloading] = useState(false);

  const downloadAsImage = async () => {
    setDownloading(true);
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      // Background
      const gradient = ctx.createLinearGradient(0, 0, 800, 400);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(1, '#1e293b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 400);

      // Border
      ctx.strokeStyle = '#a78bfa';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 20, 760, 360);

      // Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('AI Memory Benchmark Results', 400, 60);

      // Tool name
      ctx.fillStyle = '#a78bfa';
      ctx.font = 'bold 20px Inter, sans-serif';
      ctx.fillText(toolName, 400, 100);

      // Score circle (left)
      ctx.fillStyle = '#a78bfa';
      ctx.beginPath();
      ctx.arc(150, 220, 60, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(score.toString(), 150, 240);

      ctx.fillStyle = '#a78bfa';
      ctx.font = 'bold 24px Inter, sans-serif';
      ctx.fillText(grade, 150, 280);

      // Engram baseline (right)
      ctx.fillStyle = 'rgba(167, 139, 250, 0.2)';
      ctx.beginPath();
      ctx.arc(650, 220, 60, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#a78bfa';
      ctx.font = 'bold 48px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('87', 650, 240);

      ctx.fillStyle = '#a78bfa';
      ctx.font = 'bold 24px Inter, sans-serif';
      ctx.fillText('A+', 650, 280);

      // Bottom text
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Test your memory at getengram.dev/playground', 400, 360);

      // Download
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `engram-benchmark-${score}.png`;
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const shareText = `I scored ${score}/100 on the Engram Memory Benchmark for ${toolName}! ${score > 87 ? `I beat Engram's baseline (87) by ${score - 87} points!` : `Let me see how mine compares to Engram's 87.`} Test yours:`;

  return (
    <div className="space-y-4">
      {/* Card Preview */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl border border-slate-700 p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-6">Your Results Card</h3>

        <div className="bg-slate-800/50 rounded-lg p-6 mb-4 border border-slate-700">
          <p className="text-slate-400 text-sm mb-2">Score</p>
          <div className="flex justify-around items-center">
            <div>
              <p className="text-5xl font-bold text-purple-400">{score}</p>
              <p className="text-sm text-slate-400 mt-2">Your Score</p>
            </div>
            <div className="text-slate-500">vs</div>
            <div>
              <p className="text-5xl font-bold text-slate-500">87</p>
              <p className="text-sm text-slate-400 mt-2">Engram Baseline</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={downloadAsImage}
            disabled={downloading}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium disabled:opacity-50 transition"
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Downloading...' : 'Download Image'}
          </button>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
          >
            <Share2 className="w-4 h-4" />
            Share on X
          </a>
        </div>
      </div>
    </div>
  );
}
