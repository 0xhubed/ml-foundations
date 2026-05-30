"use client";

interface ViewMode {
  id: string;
  label: string;
}

interface ViewModeButtonsProps {
  modes: ViewMode[];
  active: string;
  onChange: (mode: string) => void;
}

export function ViewModeButtons({ modes, active, onChange }: ViewModeButtonsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-[color:var(--color-text-secondary)]">
      <span className="uppercase tracking-[0.22em]">View</span>
      {modes.map((mode) => (
        <button
          key={mode.id}
          type="button"
          className={`rounded-full border px-4 py-2 transition ${
            active === mode.id
              ? "border-[#0F4C81] bg-[rgba(15,76,129,0.1)] text-[#0F4C81] font-medium"
              : "border-[rgba(0,0,0,0.15)] hover:border-[rgba(15,76,129,0.3)] text-[color:var(--color-text-secondary)]"
          }`}
          onClick={() => onChange(mode.id)}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
