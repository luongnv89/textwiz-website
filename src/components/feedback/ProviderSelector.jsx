const PROVIDERS = [
  { value: '', label: 'Not applicable / Not sure' },
  { value: 'gemini', label: 'Gemini' },
  { value: 'openai', label: 'OpenAI' },
  { value: 'claude', label: 'Claude (Anthropic)' },
  { value: 'mistral', label: 'Mistral' },
  { value: 'groq', label: 'Groq' },
  { value: 'openrouter', label: 'OpenRouter' },
  { value: 'apple-foundation', label: 'Apple Intelligence (on-device)' },
  { value: 'ollama', label: 'Ollama (local)' },
  { value: 'lmstudio', label: 'LM Studio (local)' },
  { value: 'mlx-lm', label: 'MLX-LM (local)' },
];

export default function ProviderSelector({ value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-3 block">
        AI Provider <span className="text-xs text-gray-500 dark:text-slate-400 font-normal">(optional)</span>
      </label>
      <select
        name="provider"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all cursor-pointer"
      >
        {PROVIDERS.map((p) => (
          <option key={p.value || 'none'} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
        Helpful for bug reports — tells us which provider was in use.
      </p>
    </div>
  );
}
