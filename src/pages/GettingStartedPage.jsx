import { Link } from 'react-router-dom';
import {
  BookOpen,
  Cpu,
  Cloud,
  Zap,
  Shield,
  Terminal,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Callout, Code, Pre, Step, Table } from '../components/guide/GuideBlocks';
import ApiKeysSection from '../components/guide/ApiKeysSection';

export default function GettingStartedPage() {
  return (
    <section className="py-24 sm:py-32 px-4 bg-gradient-to-b from-primary-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-black transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <BookOpen className="h-4 w-4" />
            Setup guide
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            Setup &amp; API keys
          </h1>
          <p className="text-xl text-gray-600 dark:text-slate-300 leading-relaxed">
            Connect TextWiz to an LLM, configure providers in Settings, and look up free-tier API keys—all in one
            place.
          </p>
        </div>

        <Callout icon={Sparkles} tone="ok" title="Fastest free path on a supported Mac">
          If your Mac has <strong>Apple Intelligence</strong> enabled (macOS 15.2+, supported Apple Silicon), open TextWiz →{' '}
          <strong>Settings</strong> → choose <strong>Apple Intelligence</strong> as Primary Provider. No API key, no extra
          install—proofread and rewrite runs on the on-device <strong>Apple Foundation Model</strong>.
        </Callout>

        <Table
          headers={['Path', 'Provider', 'Cost', 'Privacy', 'Setup']}
          rows={[
            [
              <span className="font-semibold text-gray-900 dark:text-slate-100">On-device</span>,
              'Apple Intelligence',
              'Free (built into macOS)',
              'Fully on-device — no network',
              '~1 min',
            ],
            [
              <span className="font-semibold text-gray-900 dark:text-slate-100">Local</span>,
              <a href="https://ollama.ai" target="_blank" rel="noreferrer" className="text-primary-600 dark:text-primary-300 hover:underline">Ollama</a>,
              'Free',
              'Fully offline — text never leaves your Mac',
              '~5 min',
            ],
            [
              <span className="font-semibold text-gray-900 dark:text-slate-100">Cloud</span>,
              <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="text-primary-600 dark:text-primary-300 hover:underline">Google Gemini</a>,
              'Free tier',
              "Text is sent to Google's API",
              '~2 min',
            ],
          ]}
        />

        <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
          TextWiz also supports Claude, OpenAI, Mistral, Groq, OpenRouter, LM Studio, and MLX-LM — they follow the same
          Settings pattern. Signup links and free-tier limits for Gemini, Groq, OpenRouter, and Mistral are in the{' '}
          <a href="#gemini" className="text-primary-600 dark:text-primary-300 hover:underline font-medium">
            API keys reference
          </a>{' '}
          below.
        </p>

        <Callout icon={Zap} tone="info" title="TL;DR">
          Install or get an API key → open TextWiz Dashboard → <strong>Settings</strong> → pick a{' '}
          <strong>Primary Provider</strong> → configure the key or server → press{' '}
          <strong>Test Connection</strong> → copy any text (<Code>⌘C</Code>) → press{' '}
          <Code>⌘⇧Space</Code> → pick a wizard. That&rsquo;s it.
        </Callout>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mt-16 mb-4">
          Before you start
        </h2>
        <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
          You&rsquo;ll need TextWiz installed and running. Launch the app — you should see the TextWiz
          icon in the macOS menu bar.
        </p>
        <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
          TextWiz does not request Accessibility or any other system permissions. To capture
          text, either copy it with <Code>⌘C</Code> and press <Code>⌘⇧Space</Code>, or
          right-click the selection → <em>Services → Process with TextWiz</em> to replace it
          in place. Both flows work out of the box.
        </p>

        <Callout icon={AlertTriangle} tone="warn" title="One thing to know up front">
          In TextWiz, <strong>wizards do not carry their own provider or model</strong>. You pick
          one <strong>Primary Provider</strong> and one <strong>Model</strong> in Settings, and every
          wizard you run uses those. You only configure an LLM once — not per-wizard.
        </Callout>

        <div className="mt-16 pt-10 border-t border-gray-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-4">
            <Cpu className="h-4 w-4" />
            Track A — Local
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">
            Local with Ollama
          </h2>
          <p className="text-lg text-gray-600 dark:text-slate-300 mb-8">
            Private, offline, free. Everything runs on your Mac.
          </p>

          <Step n="1" title="Install Ollama">
            <Pre>{`# macOS (Homebrew)
brew install ollama

# Or download the installer from https://ollama.ai`}</Pre>
          </Step>

          <Step n="2" title="Start the Ollama server">
            <Pre>ollama serve</Pre>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              Leave this running in a terminal (or install it as a launch agent — see Ollama&rsquo;s
              docs). Verify it&rsquo;s listening:
            </p>
            <Pre>curl http://localhost:11434/api/tags</Pre>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              You should get a JSON response. If you get &ldquo;connection refused&rdquo;, Ollama
              isn&rsquo;t running — start it and try again.
            </p>
          </Step>

          <Step n="3" title="Pull at least one model">
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-2">
              Pick a model that fits your Mac&rsquo;s RAM. Good starting points:
            </p>
            <Table
              headers={['Model', 'RAM', 'Speed', 'Notes']}
              rows={[
                [<Code>gemma3:1b</Code>, '~2 GB', 'Fastest', 'Good for quick rewrites'],
                [<Code>llama3.2:3b</Code>, '~4 GB', 'Fast', 'Balanced quality/speed'],
                [<Code>mistral:7b</Code>, '~8 GB', 'Medium', 'Better reasoning'],
                [<Code>gpt-oss:20b</Code>, '~16 GB', 'Slower', 'Highest quality, Apple Silicon recommended'],
              ]}
            />
            <Pre>ollama pull llama3.2:3b</Pre>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              The first pull downloads the weights (a few GB) — subsequent runs are instant. You can
              pull several models and switch between them in TextWiz.
            </p>
          </Step>

          <Step n="4" title="Open TextWiz Settings">
            <ul className="list-disc ml-5 text-gray-700 dark:text-slate-300 space-y-1 leading-relaxed">
              <li>Click the TextWiz icon in the menu bar → <strong>Dashboard…</strong></li>
              <li>In the left sidebar of the Dashboard, click <strong>Settings</strong></li>
            </ul>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed mt-3">
              You&rsquo;ll see five cards: <em>Default Wizard</em>, <em>Provider &amp; Model</em>,{' '}
              <em>API Key</em> (or <em>Server Configuration</em> for local engines),{' '}
              <em>Global Hotkey</em>, and <em>System Integration</em>.
            </p>
          </Step>

          <Step n="5" title="Select Ollama as your Primary Provider">
            <ol className="list-decimal ml-5 text-gray-700 dark:text-slate-300 space-y-2 leading-relaxed">
              <li>
                Click the <strong>Primary Provider</strong> dropdown → select <strong>Ollama</strong>.
              </li>
              <li>
                Below it, a <strong>Server Configuration</strong> card replaces the API Key card.
                It shows the current server URL (default:{' '}
                <Code>http://localhost:11434</Code>).
              </li>
              <li>
                If Ollama is running on a different host or port, click <strong>Change</strong>,
                edit the URL, and click <strong>Update URL</strong>.
              </li>
            </ol>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed mt-3">
              Just below the Model dropdown you&rsquo;ll see one of these status banners:
            </p>
            <ul className="list-disc ml-5 text-gray-700 dark:text-slate-300 space-y-1 mt-2 leading-relaxed">
              <li>
                <strong>&ldquo;Ollama running — N model(s) available&rdquo;</strong> (green
                checkmark) — all good.
              </li>
              <li>
                <strong>&ldquo;Ollama running, but no models loaded&rdquo;</strong> — go back to
                step 3 and <Code>ollama pull</Code> a model.
              </li>
              <li>
                <strong>&ldquo;Ollama is not running — start it and refresh&rdquo;</strong> — run{' '}
                <Code>ollama serve</Code>, then click <strong>Refresh</strong>.
              </li>
            </ul>
          </Step>

          <Step n="6" title="Pick your model">
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              Once the status shows &ldquo;Ollama running&rdquo;, open the <strong>Model</strong>{' '}
              dropdown. It will be populated with the models TextWiz detected on your running Ollama
              server. The &ldquo;Active: Ollama / llama3.2:3b&rdquo; badge below the dropdown
              confirms your selection.
            </p>
            <Callout icon={AlertTriangle} tone="warn" title="Dropdown empty?">
              If you just finished <Code>ollama pull</Code> and the dropdown is empty or stale,
              click <strong>Refresh</strong> in the Server Configuration banner. TextWiz re-queries
              Ollama and repopulates the picker.
            </Callout>
          </Step>

          <Step n="7" title="Test the connection">
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              In the <strong>Server Configuration</strong> card, click <strong>Test Connection</strong>.
              On success: a green &ldquo;Connection successful&rdquo; message. On failure: a red
              message with the reason — fix and retry.
            </p>
          </Step>

          <Step n="8" title="Run your first wizard">
            <ol className="list-decimal ml-5 text-gray-700 dark:text-slate-300 space-y-2 leading-relaxed">
              <li>Open any app. Select a sentence or paragraph of text and copy it with <Code>⌘C</Code>.</li>
              <li>
                Press <Code>⌘⇧Space</Code> (the default global hotkey — remap it in the{' '}
                <strong>Global Hotkey</strong> card if you prefer). The floating panel opens with
                your clipboard text as input.
              </li>
              <li>
                The floating panel appears. Pick a built-in wizard (Rewrite, Concise, Professional…)
                or create your own from <em>Dashboard → Wizards → New Wizard</em>.
              </li>
              <li>
                Watch the right side of the panel stream the AI response token-by-token. The inline
                diff highlights exactly what changed.
              </li>
            </ol>
            <Callout icon={CheckCircle2} tone="ok" title="That's it">
              You&rsquo;re now running fully offline with a local LLM.
            </Callout>
          </Step>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mt-8 mb-3">
            Ollama troubleshooting
          </h3>
          <Table
            headers={['Symptom', 'Cause / fix']}
            rows={[
              ['"Ollama is not running" banner', <>Run <Code>ollama serve</Code> in a terminal.</>],
              ['Banner stays on "Detecting Ollama…"', <>Wrong URL in Server Configuration, or a firewall. Check <Code>curl http://localhost:11434/api/tags</Code>.</>],
              ['Model dropdown is empty', <>You haven&rsquo;t pulled any models. Run <Code>ollama pull &lt;model&gt;</Code>, then click <strong>Refresh</strong>.</>],
              ['Model you pulled doesn\'t appear', <>Click <strong>Refresh</strong> in the Server Configuration banner. The dropdown is cached until refreshed.</>],
              ['Panel streams extremely slowly', <>Your Mac may not have enough RAM for the model. Try a smaller one (<Code>gemma3:1b</Code> or <Code>llama3.2:3b</Code>).</>],
              ['Port 11434 conflict', 'Start Ollama on a different port and update the server URL in TextWiz Settings.'],
              ['"Connection reset" errors', <>Restart Ollama (<Code>pkill ollama &amp;&amp; ollama serve</Code>) and click <strong>Refresh</strong>.</>],
            ]}
          />
        </div>

        <div className="mt-16 pt-10 border-t border-gray-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 text-sm font-medium mb-4">
            <Cloud className="h-4 w-4" />
            Track B — Cloud
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">
            Cloud with Google Gemini
          </h2>
          <p className="text-lg text-gray-600 dark:text-slate-300 mb-8">
            Fastest path to a working wizard. Free tier available.
          </p>

          <Step n="1" title="Get a Gemini API key">
            <ol className="list-decimal ml-5 text-gray-700 dark:text-slate-300 space-y-2 leading-relaxed">
              <li>
                Go to{' '}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-600 dark:text-primary-300 hover:underline"
                >
                  Google AI Studio
                </a>
                .
              </li>
              <li>Sign in with a Google account.</li>
              <li>
                Click <strong>Create API key</strong> → choose or create a Google Cloud project.
              </li>
              <li>
                Copy the key (starts with <Code>AIza…</Code>). Treat it like a password.
              </li>
            </ol>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed mt-3">
              Google&rsquo;s free tier is enough to experiment with TextWiz. See{' '}
              <a
                href="https://ai.google.dev/pricing"
                target="_blank"
                rel="noreferrer"
                className="text-primary-600 dark:text-primary-300 hover:underline"
              >
                Gemini pricing
              </a>{' '}
              for current limits.
            </p>
          </Step>

          <Step n="2" title="Open TextWiz Settings">
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              Menu bar icon → <strong>Dashboard…</strong> → left sidebar → <strong>Settings</strong>.
            </p>
          </Step>

          <Step n="3" title="Select Gemini as your Primary Provider">
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              In the <strong>Provider &amp; Model</strong> card, open the{' '}
              <strong>Primary Provider</strong> dropdown and select <strong>Gemini</strong>. Below
              it, the <strong>API Key</strong> card appears.
            </p>
          </Step>

          <Step n="4" title="Paste your API key">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">
              Option 1 — Paste in-app (recommended)
            </h3>
            <ol className="list-decimal ml-5 text-gray-700 dark:text-slate-300 space-y-1 leading-relaxed">
              <li>In the <strong>API Key</strong> card, click <strong>Configure</strong>.</li>
              <li>A secure field appears. Paste your key.</li>
              <li>Click <strong>Save Key</strong>.</li>
              <li>
                You&rsquo;ll see &ldquo;✓ API key saved securely&rdquo;. The key is written to the
                macOS Keychain — encrypted by the OS and never logged.
              </li>
            </ol>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mt-5 mb-2">
              Option 2 — Environment variable (fallback only)
            </h3>
            <Pre>{`export GEMINI_API_KEY="AIza…"`}</Pre>
            <Callout icon={AlertTriangle} tone="warn" title="Not a standalone setup path">
              At launch, TextWiz reads the Keychain first. <Code>GEMINI_API_KEY</Code> is only
              consulted if the Keychain call <strong>throws an error</strong> — an empty Keychain
              returns <Code>nil</Code> without throwing, so the env var is ignored in that case.
              Always use Option 1; treat the env var as a defensive fallback, not a substitute.
            </Callout>
          </Step>

          <Step n="5" title="Pick a model">
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              In the <strong>Provider &amp; Model</strong> card, open the <strong>Model</strong>{' '}
              dropdown. For Gemini, TextWiz ships with the latest flash preview, which is fast and
              inexpensive. Leave it selected unless you have a reason to change.
            </p>
          </Step>

          <Step n="6" title="Test the connection">
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              Click <strong>Test Connection</strong> in the API Key card. TextWiz sends a tiny{' '}
              <Code>Hello</Code> prompt to Gemini&rsquo;s <Code>generateContent</Code> endpoint with
              your key and model. Common failure causes: wrong key, expired key, quota exceeded,
              region restriction, no network.
            </p>
          </Step>

          <Step n="7" title="Run your first wizard">
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              Exactly as in Track A, step 8 — copy text with <Code>⌘C</Code>, press <Code>⌘⇧Space</Code>,
              pick a wizard. The floating panel streams Gemini&rsquo;s response inline.
              {/* wizard = the AI action; ⌘⇧Space is the keyboard shortcut/hotkey */}
            </p>
            <Callout icon={CheckCircle2} tone="ok">
              You should see results in 1–3 seconds for typical paragraphs.
            </Callout>
          </Step>

          <Step n="8" title="Check usage">
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              Open <em>Dashboard → Analytics</em> to see token counts, latency, and success rate per
              provider and per wizard. This helps you keep an eye on your free tier spend.
            </p>
          </Step>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mt-8 mb-3">
            Gemini troubleshooting
          </h3>
          <Table
            headers={['Symptom', 'Cause / fix']}
            rows={[
              ['"API key not configured"', <>Paste it in Settings or export <Code>GEMINI_API_KEY</Code> and restart.</>],
              ['"Failed: 401" / "invalid API key"', 'Wrong key, or key was revoked. Regenerate in AI Studio and update.'],
              ['"Failed: 429" / "quota exceeded"', 'Free tier rate limit. Wait a minute or upgrade.'],
              ['"Failed: 400 model not found"', <>The model name changed upstream. Check the <strong>Model</strong> dropdown.</>],
              ['"Failed: network"', 'Offline or firewall. Gemini is cloud-only — use Ollama if you need offline.'],
              ['Blank response / long wait', <>Check <em>Dashboard → Logs</em> for a provider error.</>],
            ]}
          />
        </div>

        <ApiKeysSection />

        <div className="mt-16 pt-10 border-t border-gray-200 dark:border-slate-800">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            Create your own wizard
          </h2>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
            TextWiz ships built-in wizards grouped into collections — Everyday Edits (Proofread,
            Rewrite, Concise, Friendly, Professional) and Social (X Post, LinkedIn Post), with the
            new Analyst &amp; Coach collection arriving in the next update. To add your own:
          </p>
          <ol className="list-decimal ml-5 text-gray-700 dark:text-slate-300 space-y-2 leading-relaxed">
            <li>
              <em>Dashboard → Wizards → New Wizard</em>.
            </li>
            <li>
              <strong>Name</strong> — e.g., &ldquo;Translate to French&rdquo;
            </li>
            <li>
              <strong>Prompt</strong> — use <Code>{'{{input}}'}</Code> anywhere to mark where the
              captured text should be inserted.
            </li>
            <li>
              Click <strong>Save</strong>.
            </li>
          </ol>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed mt-4">
            The wizard immediately appears in the floating panel&rsquo;s wizard list. It uses{' '}
            <strong>whichever provider and model you selected in Settings</strong> — switch
            providers and all wizards follow.
          </p>
        </div>

        <div className="mt-16 pt-10 border-t border-gray-200 dark:border-slate-800">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            Switching providers mid-session
          </h2>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">
            Open <em>Dashboard → Settings</em>, pick a different <strong>Primary Provider</strong>,
            and either configure its key or point it at its local server. The change is saved
            immediately — you don&rsquo;t need to restart the app. The next wizard you run uses
            the new provider.
          </p>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed">This is handy for:</p>
          <ul className="list-disc ml-5 text-gray-700 dark:text-slate-300 space-y-1 mt-2 leading-relaxed">
            <li>
              Drafting sensitive text locally with Ollama, then switching to Gemini for a one-off
              cloud-quality pass.
            </li>
            <li>Comparing outputs across providers on the same input.</li>
          </ul>
        </div>

        <div className="mt-16 pt-10 border-t border-gray-200 dark:border-slate-800">
          <h2 className="flex items-center gap-2 text-3xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            <Shield className="h-7 w-7 text-primary-600" />
            Where your data goes
          </h2>
          <Table
            headers={['Provider', 'What leaves your Mac']}
            rows={[
              [<strong>Ollama (Local)</strong>, 'Nothing. Prompts and completions stay on-device.'],
              [<strong>LM Studio / MLX-LM (Local)</strong>, 'Nothing. Same story as Ollama.'],
              [
                <strong>Gemini / OpenAI / Claude / Mistral / Groq / OpenRouter</strong>,
                "Your prompt (including the captured text) is sent to the provider's API over HTTPS. The provider's terms apply.",
              ],
            ]}
          />
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed mt-4">
            Regardless of provider:
          </p>
          <ul className="list-disc ml-5 text-gray-700 dark:text-slate-300 space-y-1 mt-2 leading-relaxed">
            <li>
              <strong>API keys</strong> are stored in the macOS Keychain (encrypted at rest).
            </li>
            <li>
              <strong>Usage logs and analytics</strong> stay local in a SQLite database at{' '}
              <Code>~/Library/Application Support/TextWiz/</Code>.
            </li>
            <li>
              TextWiz itself performs <strong>no telemetry</strong> — nothing is sent to any TextWiz
              server (there is no TextWiz server).
            </li>
          </ul>
        </div>

        <div className="mt-16 pt-10 border-t border-gray-200 dark:border-slate-800">
          <h2 className="flex items-center gap-2 text-3xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            <Terminal className="h-7 w-7 text-primary-600" />
            When things break
          </h2>
          <ol className="list-decimal ml-5 text-gray-700 dark:text-slate-300 space-y-3 leading-relaxed">
            <li>
              <strong>In-app logs</strong> — <em>Dashboard → Settings → System Integration → View Logs</em>.
              Opens the live log stream.
            </li>
            <li>
              <strong>Log file</strong> —{' '}
              <Code>~/Library/Application Support/TextWiz/Logs/textwiz.log</Code>. Tail it:
              <Pre>tail -f ~/Library/Application\ Support/TextWiz/Logs/textwiz.log</Pre>
            </li>
            <li>
              <strong>Console.app</strong> — filter by subsystem <Code>com.textwiz.app</Code> to see
              the same logs in macOS&rsquo;s native viewer.
            </li>
          </ol>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed mt-4">
            Logs never contain your API keys or the text you captured — they capture metadata
            (provider, model, latency, error codes) for debugging.
          </p>
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-white dark:from-primary-500/10 dark:to-slate-900 border border-primary-100 dark:border-primary-500/20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">Next steps</h2>
          <ul className="space-y-3 text-gray-700 dark:text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <ArrowRight className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
              Browse the Dashboard&rsquo;s <strong>Analytics</strong> section to track your usage.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
              Bind a <strong>custom global hotkey</strong> in{' '}
              <em>Settings → Global Hotkey → Record New</em> if <Code>⌘⇧Space</Code> conflicts with
              another app.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
              Read the{' '}
              <Link to="/changelog" className="text-primary-600 dark:text-primary-300 hover:underline">
                changelog
              </Link>{' '}
              for the full feature list of the current build.
            </li>
          </ul>

          <div className="mt-6 pt-6 border-t border-primary-200 dark:border-primary-500/20">
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
              <strong>Stuck?</strong> Open an issue at{' '}
              <a
                href="https://github.com/luongnv89/textwiz/issues"
                target="_blank"
                rel="noreferrer"
                className="text-primary-600 dark:text-primary-300 hover:underline"
              >
                github.com/luongnv89/textwiz/issues
              </a>{' '}
              and include the relevant lines from <Code>textwiz.log</Code>. Never paste your API key.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
