import { Dices } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-ink bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#topo" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-ink bg-cta text-cream">
            <Dices size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl tracking-tight sm:text-2xl">FIFA MATCH</span>
        </a>

        <nav className="flex items-center gap-2 sm:gap-4">
          <a
            href="#jogar"
            className="hidden font-mono text-sm font-semibold uppercase tracking-wide text-ink hover:text-cta sm:inline"
          >
            Jogar
          </a>
          <a
            href="#como-funciona"
            className="hidden font-mono text-sm font-semibold uppercase tracking-wide text-ink hover:text-cta sm:inline"
          >
            Como funciona
          </a>
          <a href="#jogar" className="btn-outline !px-4 !py-2 !text-sm">
            Jogar agora
          </a>
        </nav>
      </div>
    </header>
  );
}
