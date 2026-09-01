import { Dices, ArrowRight } from "lucide-react";
import FootballField from "./FootballField";

export default function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden border-b-[3px] border-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        {/* Left: pitch talk */}
        <div>
          <p className="eyebrow mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cta" />
            SORTEADOR DE PARTIDAS · TEMPORADA 2026
          </p>

          <h1 className="text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
            Role o dado.
            <br />
            Monte sua
            <br />
            <span className="relative inline-block">
              partida.
              <span className="absolute -bottom-1 left-0 h-3 w-full -rotate-1 bg-gold-light" />
            </span>
          </h1>

          <p className="mt-6 max-w-md font-body text-lg text-ink/80">
            Adicione os jogadores, escolha os filtros e deixe o sorteio montar os times — sem
            escalação manual, sem discussão de quem fica com quem.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#jogar" className="btn-cta">
              <Dices size={22} strokeWidth={2.5} />
              Sortear times
              <ArrowRight size={20} strokeWidth={2.5} />
            </a>
            <a href="#como-funciona" className="btn-outline">
              Como funciona
            </a>
          </div>
        </div>

        {/* Right: decorative pitch */}
        <div className="mx-auto w-full max-w-sm lg:max-w-none">
          <FootballField
            players={["Vinicius", "João", "Pedro", "Carlos", "Rafael"]}
            className="rotate-1"
          />
        </div>
      </div>
    </section>
  );
}
