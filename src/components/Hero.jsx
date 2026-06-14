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
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: message */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 text-sm font-medium mb-5">
            <span className="font-semibold">Pay once, run free</span> — local AI, no token bills
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-slate-100 mb-4 leading-tight">
            Select. Click. Perfect.
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-slate-200 mb-6">
            Private by default. Your text stays on your Mac.
          </p>

          <p className="text-lg md:text-xl text-gray-600 dark:text-slate-300 mb-8 leading-relaxed max-w-xl">
            Proofread, rewrite, and run custom AI wizards on any text—right where you&rsquo;re working. Runs on{' '}
            <strong className="text-gray-800 dark:text-slate-200">on-device AI</strong> by default, or your own cloud provider. No servers, no data collection.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5 mb-4">
            <MacAppStoreBadge height={48} />
            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold text-primary-600 bg-primary-100 hover:bg-primary-200 dark:text-primary-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition duration-200"
            >
              Explore Features
            </a>
          </div>

          <p className="text-sm text-gray-500 dark:text-slate-400">
            One-time purchase • Free local AI on macOS 15.2+ • Cloud &amp; local engines on macOS 14+
          </p>
        </div>

        {/* Right: demo */}
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
            Copy text, press ⌘⇧Space, and transform it anywhere on macOS.
          </p>
        </div>
      </div>
    </section>
  );
}
