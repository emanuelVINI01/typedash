"use client";

export type SortKey =
  | "recent"
  | "wpm_desc"
  | "wpm_asc"
  | "accuracy_desc"
  | "accuracy_asc"
  | "duration_desc";

interface Props {
  value: SortKey;
  onChange: (key: SortKey) => void;
}

const OPTIONS: { key: SortKey; label: string }[] = [
  { key: "recent", label: "Newest" },
  { key: "wpm_desc", label: "Highest WPM" },
  { key: "wpm_asc", label: "Lowest WPM" },
  { key: "accuracy_desc", label: "Highest Accuracy" },
  { key: "accuracy_asc", label: "Lowest Accuracy" },
  { key: "duration_desc", label: "Longest Duration" },
];

export function FilterBar({ value, onChange }: Props) {
  return (
    <div className="flex w-full max-w-full items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible sm:pb-0">
      <span className="text-xs font-semibold uppercase tracking-widest mr-1" style={{ color: "#6272a4" }}>
        Sort:
      </span>
      {OPTIONS.map((opt) => {
        const active = value === opt.key;
        return (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className="shrink-0 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer"
            style={{
              background: active ? "#bd93f9" : "#21222c",
              color: active ? "#282a36" : "#f8f8f2",
              borderColor: active ? "#bd93f9" : "#44475a",
              boxShadow: active ? "0 0 10px rgba(189,147,249,0.35)" : "none",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
