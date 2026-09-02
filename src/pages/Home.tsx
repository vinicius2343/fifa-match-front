import { useState } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import PlayerInput from "../components/PlayerInput";
import PlayerList from "../components/PlayerList";
import MatchSizeSelector from "../components/MatchSizeSelector";
import TeamTypeSelector from "../components/TeamTypeSelector";
import FilterSelector from "../components/FilterSelector";
import ActiveFilters from "../components/ActiveFilters";
import SortButton from "../components/SortButton";
import FootballField from "../components/FootballField";
import MatchResult from "../components/MatchResult";
import { useFilters } from "../hooks/useFilters";
import { usePlayers } from "../hooks/usePlayers";
import { useMatchDraw } from "../hooks/useMatchDraw";
import type { MatchSize, TeamFilter, TeamTypeSelection } from "../types/match";

/** True when the filters payload came back but has no usable options anywhere. */
function hasNoFilterOptions(filters: ReturnType<typeof useFilters>["filters"]): boolean {
  if (!filters) return true;

  const groups = [filters.teamFilters, filters.nationalTeamFilters];
  return groups.every(
    (group) => !group || group.every((item) => !item.options || item.options.length === 0)
  );
}

export default function Home() {
  const { filters, loading: filtersLoading, error: filtersError, reload } = useFilters();
  const { players, addPlayer, removePlayer, editPlayer } = usePlayers();
  const { result, loading: drawing, error: drawError, draw, reset } = useMatchDraw();

  const [teamTypeSelection, setTeamTypeSelection] = useState<TeamTypeSelection>("CLUB");
  const [matchSize, setMatchSize] = useState<MatchSize>("ONE_V_ONE");
  const [activeFilters, setActiveFilters] = useState<TeamFilter[]>([]);

  function handleTeamTypeChange(next: TeamTypeSelection) {
    setTeamTypeSelection(next);
    // Filters that no longer apply to the selected team type(s) are dropped.
    setActiveFilters((prev) =>
      prev.filter((f) => next === "BOTH" || f.teamType === next)
    );
  }

  function handleAddFilter(filter: TeamFilter): string | null {
    setActiveFilters((prev) => [...prev, filter]);
    return null;
  }

  function handleRemoveFilter(index: number) {
    setActiveFilters((prev) => prev.filter((_, i) => i !== index));
  }

  function handleDraw() {
    draw(players, activeFilters, matchSize);
  }

  function handleReset() {
    reset();
  }

  const noFilterOptions = !filtersLoading && !filtersError && hasNoFilterOptions(filters);
  const minimumPlayers = matchSize === "ONE_V_ONE" ? 2 : 4;
  const hasMinimumPlayers = players.length >= minimumPlayers;

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />

      <section id="jogar" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
          {/* Left: configuration */}
          <div className={`space-y-10 ${result ? "lg:opacity-60" : ""}`}>
            <div>
              <p className="eyebrow mb-2">Passo 1</p>
              <h2 className="mb-4 text-3xl sm:text-4xl">Jogadores</h2>
              <div className="space-y-4">
                <PlayerInput onAdd={addPlayer} />
                <PlayerList players={players} onRemove={removePlayer} onEdit={editPlayer} />
              </div>
            </div>

            <div>
              <p className="eyebrow mb-2">Passo 2</p>
              <h2 className="mb-4 text-3xl sm:text-4xl">Tamanho da partida</h2>
              <MatchSizeSelector value={matchSize} onChange={setMatchSize} />
            </div>

            <div>
              <p className="eyebrow mb-2">Passo 3</p>
              <h2 className="mb-4 text-3xl sm:text-4xl">Tipo de time</h2>
              <TeamTypeSelector value={teamTypeSelection} onChange={handleTeamTypeChange} />
            </div>

            <div>
              <p className="eyebrow mb-2">Passo 4</p>
              <h2 className="mb-4 text-3xl sm:text-4xl">Como você quer jogar?</h2>

              {filtersLoading && (
                <p className="border-2 border-dashed border-ink/30 px-4 py-6 text-center font-mono text-sm text-ink/50">
                  Carregando filtros...
                </p>
              )}

              {!filtersLoading && filtersError && (
                <div className="flex flex-col items-center gap-3 border-2 border-cta-dark bg-cta/10 px-4 py-6 text-center">
                  <AlertTriangle className="text-cta-dark" size={24} />
                  <p className="font-mono text-sm font-semibold text-cta-dark">{filtersError}</p>
                  <button type="button" onClick={reload} className="btn-outline !py-2 !text-sm">
                    <RotateCcw size={14} strokeWidth={3} />
                    Tentar novamente
                  </button>
                </div>
              )}

              {!filtersLoading && !filtersError && noFilterOptions && (
                <p className="border-2 border-dashed border-ink/30 px-4 py-6 text-center font-mono text-sm text-ink/50">
                  Nenhum filtro disponível no momento.
                </p>
              )}

              {!filtersLoading && !filtersError && filters && !noFilterOptions && (
                <div className="space-y-5">
                  <FilterSelector
                    filtersResponse={filters}
                    teamTypeSelection={teamTypeSelection}
                    activeFilters={activeFilters}
                    onAdd={handleAddFilter}
                  />
                  <div>
                    <p className="eyebrow mb-2">Filtros ativos</p>
                    <ActiveFilters filters={activeFilters} onRemove={handleRemoveFilter} />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <SortButton loading={drawing} onClick={handleDraw} />
              {!hasMinimumPlayers && (
                <p className="text-center font-mono text-sm font-semibold text-cta-dark">
                  Para {matchSize === "ONE_V_ONE" ? "1x1" : "2x2"}, adicione pelo menos {minimumPlayers} jogadores.
                </p>
              )}
              {drawError && (
                <p className="text-center font-mono text-sm font-semibold text-cta-dark">
                  {drawError}
                </p>
              )}
            </div>
          </div>

          {/* Right: pitch / result */}
          <div className="lg:sticky lg:top-24">
            {result ? (
              <MatchResult result={result} onReset={handleReset} />
            ) : (
              <FootballField players={players} />
            )}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="border-t-[3px] border-ink bg-cream-dark/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="mb-10 text-3xl sm:text-4xl">Como funciona</h2>
          <ol className="grid gap-6 sm:grid-cols-3">
            <li className="poster-card p-5">
              <span className="font-display text-4xl text-gold">01</span>
              <h3 className="mt-3 text-xl">Adicione os jogadores</h3>
              <p className="mt-2 font-body text-ink/70">
                Digite o nome de cada participante da partida. Sem times fixos, sem estatísticas
                falsas — só os nomes de quem vai jogar.
              </p>
            </li>
            <li className="poster-card p-5">
              <span className="font-display text-4xl text-gold">02</span>
              <h3 className="mt-3 text-xl">Escolha os filtros</h3>
              <p className="mt-2 font-body text-ink/70">
                Selecione clubes, seleções, país, liga ou força. As opções vêm direto do backend —
                nada é inventado no navegador.
              </p>
            </li>
            <li className="poster-card p-5">
              <span className="font-display text-4xl text-gold">03</span>
              <h3 className="mt-3 text-xl">Sorteie e jogue</h3>
              <p className="mt-2 font-body text-ink/70">
                O backend sorteia os times e distribui os jogadores. Você só confere o resultado e
                entra em campo.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <footer className="border-t-[3px] border-ink px-4 py-8 text-center sm:px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/50">
          FIFA MATCH — sorteador de partidas
        </p>
      </footer>
    </div>
  );
}
