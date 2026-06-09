import { useEffect } from "react";

export type CommandHandlers = {
  onEasterGlow: () => void;
};

/** Global shortcuts: ⌘/Ctrl-K palette; type **mzf** anywhere for skills spotlight. */
export function useCommandPalette(
  _open: boolean,
  setOpen: (v: boolean) => void,
  { onEasterGlow }: CommandHandlers
) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [setOpen]);

  useEffect(() => {
    const seq = ["m", "z", "f"];
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const k = e.key.toLowerCase();
      if (k === seq[i]) {
        i += 1;
        if (i === seq.length) {
          onEasterGlow();
          i = 0;
        }
      } else {
        i = k === seq[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onEasterGlow]);
}
