import { KeyRound, Cpu, Zap, Shield } from 'lucide-react';
import {
  Callout,
  Code,
  Pre,
  InfoTable,
  ProviderSection,
  Ext,
  Table,
} from './GuideBlocks';

export default function ApiKeysSection() {
  return (
    <div className="mt-16 pt-10 border-t border-gray-200 dark:border-slate-800">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 text-sm font-medium mb-4">
        <KeyRound className="h-4 w-4" />
        API keys reference
      </div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100 mb-2">Free-tier API keys</h2>
      <p className="text-lg text-gray-600 dark:text-slate-300 mb-8">
        Signup links and limits for cloud providers. Limits change—check each provider&apos;s pricing page before
        heavy use.
      </p>

      <Callout icon={Shield} tone="info" title="Configure once in TextWiz">
        Dashboard → <strong>Settings</strong> → <strong>Primary Provider</strong> → paste key (or server URL for
        Ollama) → <strong>Save Key</strong> → <strong>Test Connection</strong>. Keys live in the{' '}
        <strong>macOS Keychain</strong>.
      </Callout>

      <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mt-10 mb-4">Which provider should I start with?</h3>
      <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-slate-300 mb-8">
        <li>
          <strong>Maximum privacy, no key</strong> →{' '}
          <a href="#ollama" className="text-primary-600 dark:text-primary-300 hover:underline">
            Ollama
          </a>{' '}
          on your Mac (see Track A above)
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
          <a href="#openrouter" className="text-primary-600 dark:text-primary-300 hover:underline">
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
      <p className="text-gray-600 dark:text-slate-400 text-sm mb-10">
        Apple Intelligence needs no key on supported Macs—use Settings → Primary Provider → Apple Intelligence.
      </p>

      <ProviderSection id="gemini" title="Google Gemini" verified="2026-06">
        <InfoTable
          rows={[
            ['Signup', <Ext href="https://aistudio.google.com/">Google AI Studio</Ext>],
            [
              'Create key',
              <>
                <Ext href="https://aistudio.google.com/app/apikey">API keys</Ext> → Create API key → copy (
                <Code>AIza…</Code>)
              </>,
            ],
            ['Free limits', <Ext href="https://ai.google.dev/gemini-api/docs/pricing">Gemini API pricing</Ext>],
            [
              'Models',
              <>
                <Code>gemini-2.5-flash</Code>, <Code>gemini-2.0-flash</Code>
              </>,
            ],
            [
              'Env var',
              <>
                Optional <Code>GEMINI_API_KEY</Code> only if no Keychain key (legacy CLI)
              </>,
            ],
            ['TextWiz', 'Primary Provider → Gemini → Configure → Save Key → Test Connection'],
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
                Many <Code>:free</Code> models; see <Ext href="https://openrouter.ai/docs/faq#pricing">pricing FAQ</Ext>
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
            ['Free limits', <Ext href="https://console.groq.com/docs/rate-limits">Rate limits</Ext>],
            [
              'Models',
              <>
                <Code>llama-3.3-70b-versatile</Code>, <Code>llama-3.1-8b-instant</Code>
              </>,
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
            ['Limits', <Ext href="https://mistral.ai/pricing">Mistral pricing</Ext>],
            ['TextWiz', 'Settings → Mistral → Save Key → Test Connection'],
          ]}
        />
      </ProviderSection>

      <ProviderSection id="ollama" title="Ollama (local, no API key)" verified="2026-06">
        <Callout icon={Cpu} tone="ok" title="Fully offline">
          No API key or quota—only your Mac&apos;s hardware limits. Full walkthrough is in Track A above.
        </Callout>
        <InfoTable
          rows={[
            [
              'Install',
              <>
                <Ext href="https://ollama.com">ollama.com</Ext> or <Code>brew install ollama</Code>
              </>,
            ],
            ['Server', <Code>http://localhost:11434</Code>],
            [
              'Models',
              <>
                <Code>llama3.2:3b</Code>, <Code>gemma3:1b</Code>
              </>,
            ],
            ['TextWiz', 'Primary Provider → Ollama → Refresh models → Test Connection'],
          ]}
        />
      </ProviderSection>

      <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mt-8 mb-4">OpenAI &amp; Claude</h3>
      <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-8">
        TextWiz supports them with the same Keychain flow. Free tiers are narrower than Gemini/Groq for daily writing
        wizards—use API keys from each provider&apos;s developer console.
      </p>

      <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-4">Key &amp; connection troubleshooting</h3>
      <Table
        headers={['Symptom', 'Fix']}
        rows={[
          ['Test Connection 401', 'Regenerate key at provider; paste again in Settings'],
          ['Empty model list', 'Refresh (Ollama) or save key and re-test'],
          ['Rate limits', 'Wait, switch model, or use Ollama locally'],
        ]}
      />

      <Callout icon={Zap} tone="info" title="Contributor copy">
        The same reference lives in the app repo as{' '}
        <Ext href="https://github.com/luongnv89/textwiz/blob/main/docs/API_KEYS.md">docs/API_KEYS.md</Ext>.
      </Callout>
    </div>
  );
}