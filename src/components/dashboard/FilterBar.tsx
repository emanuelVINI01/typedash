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
  { key: "recent", label: "Mais Recente" },
  { key: "wpm_desc", label: "Maior WPM" },
  { key: "wpm_asc", label: "Menor WPM" },
  { key: "accuracy_desc", label: "Maior Acurácia" },
  { key: "accuracy_asc", label: "Menor Acurácia" },
  { key: "duration_desc", label: "Maior Duração" },
];

export function FilterBar({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-xs font-semibold uppercase tracking-widest mr-1" style={{ color: "#6272a4" }}>
        Ordenar:
      </span>
      {OPTIONS.map((opt) => {
        const active = value === opt.key;
        return (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border cursor-pointer"
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
