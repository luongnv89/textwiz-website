const MACOS_VERSIONS = [
  { value: '26', label: 'macOS 26 (Tahoe)' },
  { value: '15', label: 'macOS 15 (Sequoia)' },
  { value: '14', label: 'macOS 14 (Sonoma)' },
  { value: 'older', label: 'Older version' },
  { value: 'not-sure', label: 'Not sure' },
];

export default function OSVersionSelector({ value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-900 dark:text-slate-100 mb-3 block">
        macOS Version <span className="text-xs text-gray-500 dark:text-slate-400 font-normal">(required)</span>
      </label>
      <select
        name="osVersion"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all cursor-pointer"
      >
        <option value="">Select version...</option>
        {MACOS_VERSIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
