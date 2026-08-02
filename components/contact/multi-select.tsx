type MultiSelectProps = {
  label: string;
  options: readonly string[];
  selected: string[];
  onChange: (next: string[]) => void;
};

export function MultiSelect({ label, options, selected, onChange }: MultiSelectProps) {
  function toggle(option: string) {
    onChange(selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option]);
  }

  return (
    <div className="grid gap-1.5">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggle(option)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 ${
                isSelected
                  ? "border-transparent bg-gradient-to-r from-brand to-accent text-white shadow-md shadow-brand/25"
                  : "border-slate-300 bg-white text-slate-600 hover:border-brand hover:text-brand"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
