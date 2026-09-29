import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import type { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
      {/* 1. Roast Level Radio Group */}
      <div className="flex items-center gap-2 border border-[var(--color-subtle,#E6E6E2)] bg-[var(--color-canvas,#F5F5F3)] px-2.5 py-1.5">
        <span className="text-neutral-500 uppercase tracking-wider text-[10px] select-none">
          Level:
        </span>
        {ROAST_LEVELS.map((lvl) => {
          const isSelected = roastLevel === lvl.id;
          return (
            <label
              key={lvl.id}
              title={lvl.description}
              className={`flex items-center gap-1 cursor-pointer select-none ${
                isSelected
                  ? "font-bold text-[var(--color-accent,#D94826)]"
                  : "text-neutral-700 hover:text-black"
              }`}
            >
              <input
                type="radio"
                name="roastLevel"
                value={lvl.id}
                checked={isSelected}
                onChange={() => onRoastLevelChange(lvl.id)}
                disabled={isRoasting}
                className="accent-[var(--color-accent,#D94826)] cursor-pointer"
              />
              <span>{lvl.label}</span>
            </label>
          );
        })}
      </div>

      {/* 2. Language Dropdown */}
      <div className="flex items-center gap-1.5">
        <span className="text-neutral-500 uppercase tracking-wider text-[10px] select-none">
          Lang:
        </span>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            disabled={isRoasting}
            className="appearance-none bg-[var(--color-panel,#FDFDFD)] border border-[var(--color-frame,#111111)] px-3 py-1.5 pr-7 font-mono text-xs font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--color-frame,#111111)] disabled:opacity-50"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label} (.{lang.extension})
              </option>
            ))}
          </select>
          <span className="absolute right-2 top-2 pointer-events-none text-neutral-600 text-[10px]">
            ▼
          </span>
        </div>
      </div>

      {/* 3. Error Drawer Toggle */}
      <button
        type="button"
        onClick={onToggleErrorDrawer}
        disabled={isRoasting}
        className={`px-2.5 py-1.5 border border-dashed border-[var(--color-frame,#111111)] hover:bg-neutral-100 flex items-center gap-1 transition-colors ${
          errorDrawerOpen ? "bg-[var(--color-frame,#111111)] text-white hover:bg-neutral-800" : ""
        }`}
      >
        <span>{errorDrawerOpen ? "−" : "+"}</span>
        <span className="uppercase tracking-wider text-[11px]">ERROR MESSAGE</span>
      </button>

      {/* 4. Primary Action Button */}
      <button
        type="button"
        onClick={onRoast}
        disabled={isRoasting}
        className={`px-4 py-2 font-mono font-bold tracking-wider uppercase transition-colors flex items-center gap-2.5 blueprint-shadow-sm active:translate-x-[1px] active:translate-y-[1px] ${
          isRoasting
            ? "bg-neutral-800 text-neutral-300 cursor-not-allowed animate-pulse"
            : "bg-[var(--color-frame,#111111)] text-white hover:bg-[var(--color-accent,#D94826)]"
        }`}
      >
        {isRoasting ? (
          <span>ANALYZING...</span>
        ) : (
          <>
            <span>ROAST MY CODE</span>
            <span className="bg-neutral-800 text-[10px] px-1.5 py-0.5 border border-neutral-600 text-neutral-300 font-normal">
              Ctrl ⏎
            </span>
          </>
        )}
      </button>
    </div>
  );
}
