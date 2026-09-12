import { useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import MacAppStoreBadge from './MacAppStoreBadge';
import MacWindow from './MacWindow';
import { Shortcut } from './Kbd';
import { publicUrl } from '../lib/publicUrl';

export default function Hero() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28 px-6">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.045),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="max-w-3xl mx-auto text-center">
        <p
          className="rise text-sm font-semibold uppercase tracking-[0.14em] text-primary-700 dark:text-primary-400"
          style={{ animationDelay: '0ms' }}
        >
          Free on the Mac App Store
        </p>

        <h1
          className="rise mt-5 text-5xl md:text-6xl lg:text-7xl leading-[1.05] font-semibold tracking-tight text-gray-950 dark:text-white"
          style={{ animationDelay: '80ms' }}
        >
          Fix any sentence in 2 seconds — without leaving your Mac.
        </h1>

        <p
          className="rise mt-6 text-xl md:text-2xl text-gray-600 dark:text-slate-400 leading-relaxed"
          style={{ animationDelay: '160ms' }}
        >
          Select text, press <Shortcut />, and get a private AI rewrite back. On-device by default. No servers. No token bills.
        </p>

        <div
          className="rise mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
          style={{ animationDelay: '240ms' }}
        >
          <MacAppStoreBadge height={52} />
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-slate-100 underline underline-offset-4 decoration-gray-300 dark:decoration-slate-600 hover:decoration-current transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            See how it works
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <p className="mt-6 text-sm text-gray-500 dark:text-slate-500">
          Free download · Demo provider free forever · TextWiz Pro unlocks real providers
        </p>
      </div>

      <div className="rise mt-16 md:mt-20 max-w-5xl mx-auto" style={{ animationDelay: '360ms' }}>
        <MacWindow title="TextWiz">
          <div className="relative group">
            <video
              ref={videoRef}
              className="w-full h-auto block"
              src={publicUrl('/demo-1.0.0.mp4')}
              poster={publicUrl('/shortcuts-preview/1.0.0/appstore-x-post-shortcut.png')}
              controls
              muted
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              aria-label="TextWiz demo video"
            >
              Your browser does not support the video tag.
            </video>
            {!isPlaying && (
              <button
                type="button"
                onClick={() => videoRef.current?.play()}
                className="absolute inset-x-0 top-0 bottom-16 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                aria-label="Play the 40-second demo"
              >
                <span className="h-16 w-16 rounded-full bg-white/95 text-gray-950 shadow-lg flex items-center justify-center">
                  <Play className="h-7 w-7 ml-1" aria-hidden="true" />
                </span>
              </button>
            )}
          </div>
        </MacWindow>
        <p className="text-sm text-gray-500 dark:text-slate-500 text-center mt-4">
          Copy text, press ⌘⇧Space, pick a wizard. That's the whole workflow.
        </p>
      </div>
    </section>
  );
}
