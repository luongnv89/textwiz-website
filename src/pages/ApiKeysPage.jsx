import { Link } from 'react-router-dom';
import { KeyRound, Cloud, Cpu, Zap, Shield, ExternalLink } from 'lucide-react';

function Code({ children }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-primary-700 dark:text-primary-300 font-mono text-[0.9em]">
      {children}
    </code>
  );
}

function Pre({ children }) {
  return (
    <pre className="my-4 p-4 rounded-xl bg-slate-900 dark:bg-black text-slate-100 text-sm overflow-x-auto border border-slate-800">
      <code className="font-mono whitespace-pre">{children}</code>
    </pre>
  );
}

function Callout({ icon: IconGlyph, tone = 'info', title, children }) {
  const tones = {
    info: 'bg-primary-50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/30 text-primary-900 dark:text-primary-100',
    warn: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30 text-amber-900 dark:text-amber-100',
    ok: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 text-emerald-900 dark:text-emerald-100',
  };
  const Glyph = IconGlyph;
  return (
    <div className={`my-6 p-5 rounded-xl border ${tones[tone]} flex gap-3`}>
      <Glyph className="h-5 w-5 mt-0.5 flex-shrink-0" />
      <div>
        {title && <div className="font-semibold mb-1">{title}</div>}
        <div className="text-[0.95em] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function ProviderSection({ id, title, verified, children }) {
  return (
    <section id={id} className="scroll-mt-28 mb-14">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-1">{title}</h2>
      <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">Verified as of {verified}</p>
      <div className="text-gray-700 dark:text-slate-300 leading-relaxed space-y-4">{children}</div>
    </section>
  );
}

function InfoTable({ rows }) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800">
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([label, value]) => (
            <tr
              key={label}
              className="border-b border-gray-100 dark:border-slate-800/50 last:border-b-0"
            >
              <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-slate-100 align-top w-36 sm:w-44">
                {label}
              </th>
              <td className="px-4 py-3 text-gray-700 dark:text-slate-300 align-top">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Ext({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-primary-600 dark:text-primary-300 hover:underline inline-flex items-center gap-1"
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5 opacity-70" />
    </a>
  );
}

export default function ApiKeysPage() {
  return (
    <section className="py-24 sm:py-32 px-4 bg-gradient-to-b from-primary-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-black transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 text-sm font-medium mb-4">
            <KeyRound className="h-4 w-4" />
            API keys
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            Free-tier API keys for TextWiz
          </h1>
          <p className="text-xl text-gray-600 dark:text-slate-300 leading-relaxed">
            Get keys from providers with generous free tiers so you can run AI shortcuts without
            paying. Limits change—check each provider&apos;s pricing page before heavy use.
          </p>
        </div>

        <Callout icon={Shield} tone="info" title="Configure once in TextWiz">
          Dashboard → <strong>Settings</strong> → <strong>Primary Provider</strong> → paste key (or
          server URL for Ollama) → <strong>Save Key</strong> → <strong>Test Connection</strong>.
          Keys live in the <strong>macOS Keychain</strong>. Every shortcut uses the same provider and
          model from Settings.
        </Callout>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mt-12 mb-4">
          Which provider should I start with?
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-slate-300 mb-8">
          <li>
            <strong>Maximum privacy, no key</strong> →{' '}
            <a href="#ollama" className="text-primary-600 dark:text-primary-300 hover:underline">
              Ollama
            </a>{' '}
            on your Mac
          </li>
          <li>
            <strong>Fastest cloud setup</strong> →{' '}
            <a href="#gemini" className="text-primary-600 dark:text-primary-300 hover:underline">
              Google Gemini
            </a>{' '}
            (free tier, ~2 minutes)
          </li>
          <li>
            <strong>Many models, one key</strong> →{' '}
            <a
              href="#openrouter"
              className="text-primary-600 dark:text-primary-300 hover:underline"
            >
              OpenRouter
            </a>{' '}
            (look for <Code>:free</Code> models)
          </li>
          <li>
            <strong>Low-latency cloud</strong> →{' '}
            <a href="#groq" className="text-primary-600 dark:text-primary-300 hover:underline">
              Groq
            </a>
          </li>
        </ol>
        <p className="text-gray-600 dark:text-slate-400 text-sm mb-12">
          Apple Intelligence needs no key on supported Macs—see{' '}
          <Link to="/getting-started" className="text-primary-600 dark:text-primary-300 hover:underline">
            Getting started
          </Link>
          .
        </p>

        <ProviderSection id="gemini" title="Google Gemini" verified="2026-06">
          <InfoTable
            rows={[
              ['Signup', <Ext href="https://aistudio.google.com/">Google AI Studio</Ext>],
              [
                'Create key',
                <>
                  <Ext href="https://aistudio.google.com/app/apikey">API keys</Ext> → Create API key →
                  copy (<Code>AIza…</Code>)
                </>,
              ],
              [
                'Free limits',
                <Ext href="https://ai.google.dev/gemini-api/docs/pricing">Gemini API pricing</Ext>,
              ],
              [
                'Models',
                (
                  <>
                    <Code>gemini-2.5-flash</Code>, <Code>gemini-2.0-flash</Code>
                  </>
                ),
              ],
              [
                'Env var',
                <>
                  Optional <Code>GEMINI_API_KEY</Code> only if no Keychain key (legacy CLI)
                </>,
              ],
              [
                'TextWiz',
                'Primary Provider → Gemini → Configure → Save Key → Test Connection',
              ],
            ]}
          />
          <Pre>{`export GEMINI_API_KEY="your-google-gemini-api-key"`}</Pre>
        </ProviderSection>

        <ProviderSection id="openrouter" title="OpenRouter" verified="2026-06">
          <InfoTable
            rows={[
              ['Signup', <Ext href="https://openrouter.ai/">OpenRouter</Ext>],
              [
                'Create key',
                <>
                  <Ext href="https://openrouter.ai/keys">Keys</Ext> → create → copy (<Code>sk-or-…</Code>)
                </>,
              ],
              [
                'Free limits',
                <>
                  Many <Code>:free</Code> models; see{' '}
                  <Ext href="https://openrouter.ai/docs/faq#pricing">pricing FAQ</Ext>
                </>,
              ],
              ['TextWiz', 'Keychain only—paste in Settings → OpenRouter'],
            ]}
          />
        </ProviderSection>

        <ProviderSection id="groq" title="Groq" verified="2026-06">
          <InfoTable
            rows={[
              ['Signup', <Ext href="https://console.groq.com/">Groq Console</Ext>],
              ['Create key', 'API Keys → Create → copy (gsk_…)'],
              [
                'Free limits',
                <Ext href="https://console.groq.com/docs/rate-limits">Rate limits</Ext>,
              ],
              [
                'Models',
                (
                  <>
                    <Code>llama-3.3-70b-versatile</Code>, <Code>llama-3.1-8b-instant</Code>
                  </>
                ),
              ],
              ['TextWiz', 'Settings → Groq → Save Key → Test Connection'],
            ]}
          />
        </ProviderSection>

        <ProviderSection id="mistral" title="Mistral (La Plateforme)" verified="2026-06">
          <InfoTable
            rows={[
              ['Signup', <Ext href="https://console.mistral.ai/">La Plateforme</Ext>],
              ['Create key', 'Workspace → API keys → create'],
              [
                'Limits',
                <Ext href="https://mistral.ai/pricing">Mistral pricing</Ext>,
              ],
              ['TextWiz', 'Settings → Mistral → Save Key → Test Connection'],
            ]}
          />
        </ProviderSection>

        <ProviderSection id="ollama" title="Ollama (local, no API key)" verified="2026-06">
          <Callout icon={Cpu} tone="ok" title="Fully offline">
            No API key or quota—only your Mac&apos;s hardware limits.
          </Callout>
          <InfoTable
            rows={[
              [
                'Install',
                (
                  <>
                    <Ext href="https://ollama.com">ollama.com</Ext> or <Code>brew install ollama</Code>
                  </>
                ),
              ],
              ['Server', <Code>http://localhost:11434</Code>],
              [
                'Models',
                (
                  <>
                    <Code>llama3.2:3b</Code>, <Code>gemma3:1b</Code>
                  </>
                ),
              ],
              ['TextWiz', 'Primary Provider → Ollama → Refresh models → Test Connection'],
            ]}
          />
          <p>
            Step-by-step:{' '}
            <Link to="/getting-started" className="text-primary-600 dark:text-primary-300 hover:underline font-medium">
              Getting started
            </Link>{' '}
            (Ollama track).
          </p>
        </ProviderSection>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mt-12 mb-4">
          OpenAI &amp; Claude
        </h2>
        <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-8">
          TextWiz supports them with the same Keychain flow. Free tiers are narrower than Gemini/Groq
          for daily writing shortcuts—use API keys from each provider&apos;s developer console.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">Troubleshooting</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800 mb-12">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-slate-900/50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold border-b border-gray-200 dark:border-slate-800">
                  Symptom
                </th>
                <th className="px-4 py-3 text-left font-semibold border-b border-gray-200 dark:border-slate-800">
                  Fix
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-slate-300">
              <tr className="border-b border-gray-100 dark:border-slate-800/50">
                <td className="px-4 py-3">Test Connection 401</td>
                <td className="px-4 py-3">Regenerate key at provider; paste again in Settings</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800/50">
                <td className="px-4 py-3">Empty model list</td>
                <td className="px-4 py-3">Refresh (Ollama) or save key and re-test</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800/50">
                <td className="px-4 py-3">Rate limits</td>
                <td className="px-4 py-3">Wait, switch model, or use Ollama locally</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout icon={Zap} tone="info" title="More detail">
          The same guide lives in the repo as{' '}
          <Ext href="https://github.com/luongnv89/textwiz/blob/main/docs/API_KEYS.md">
            docs/API_KEYS.md
          </Ext>{' '}
          for contributors and offline reading.
        </Callout>
      </div>
    </section>
  );
}