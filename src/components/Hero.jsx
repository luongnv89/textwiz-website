import { useRef } from 'react';
import { Maximize2 } from 'lucide-react';
import MacAppStoreBadge from './MacAppStoreBadge';
import { publicUrl } from '../lib/publicUrl';

export default function Hero() {
  const videoRef = useRef(null);

  const handleFullscreen = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.webkitEnterFullscreen) {
      // iOS Safari
      el.webkitEnterFullscreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-12 bg-gradient-to-b from-primary-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-black transition-colors duration-300">
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center">
        <p className="text-sm font-semibold tracking-wide text-primary-700 dark:text-primary-300 uppercase mb-3">
          macOS AI writing assistant
        </p>
        <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 text-sm font-medium mb-5">
          <span className="font-semibold">Free &amp; local:</span> Apple Foundation Model on supported Macs — no API key
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-slate-100 mb-6 leading-tight">
          Select. Click. Perfect.
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 dark:text-slate-300 mb-10 leading-relaxed max-w-3xl">
          Run proofread, rewrite, and custom AI shortcuts on any text—copy with ⌘C, invoke with ⌘⇧Space, or use Services to replace your selection in place. Start with{' '}
          <strong className="text-gray-800 dark:text-slate-200">Apple Intelligence on-device</strong> for a free local engine, or plug in cloud APIs—without leaving the app you are in.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-4">
          <MacAppStoreBadge height={48} />
          <a
            href="#features"
            className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold text-primary-600 bg-primary-100 hover:bg-primary-200 dark:text-primary-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition duration-200"
          >
            Explore Features
          </a>
        </div>

        <p className="text-sm text-gray-500 dark:text-slate-400 mb-12">
          Free download • Apple Intelligence on macOS 15.2+ • Cloud &amp; other local engines on macOS 14+
        </p>

        <div className="w-full">
          <div className="relative group w-full rounded-2xl overflow-hidden border border-white/25 dark:border-primary-400/30 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.4)] dark:shadow-[0_30px_90px_-20px_rgba(21,95,44,0.5)] bg-white dark:bg-slate-900">
            <video
              ref={videoRef}
              className="w-full h-auto block cursor-pointer"
              src={publicUrl('/demo-1.0.0.mp4')}
              poster={publicUrl('/shortcuts-preview/1.0.0/appstore-overview.png')}
              autoPlay
              loop
              muted
              playsInline
              controls
              preload="metadata"
              onClick={handleFullscreen}
              aria-label="TextWiz demo video — click to view fullscreen"
            >
              Your browser does not support the video tag.
            </video>

            <button
              type="button"
              onClick={handleFullscreen}
              className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-black/60 hover:bg-black/80 text-white text-sm font-medium backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 focus-visible:opacity-100"
              aria-label="View video in fullscreen"
            >
              <Maximize2 className="h-4 w-4" />
              Fullscreen
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-600 dark:text-slate-300 text-center">
            See TextWiz in action — copy text, invoke with ⌘⇧Space, and transform anywhere on macOS. Click the video to go fullscreen.
          </p>
        </div>
      </div>
    </section>
  );
}
