import { useState } from "react";
import { X, Pencil, Check } from "lucide-react";

interface PlayerListProps {
  players: string[];
  onRemove: (index: number) => void;
  onEdit: (index: number, name: string) => string | null;
}

export default function PlayerList({ players, onRemove, onEdit }: PlayerListProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);

  function startEdit(index: number) {
    setEditingIndex(index);
    setDraft(players[index]);
    setError(null);
  }

  function confirmEdit(index: number) {
    const result = onEdit(index, draft);
    if (result) {
      setError(result);
      return;
    }
    setEditingIndex(null);
    setError(null);
  }

  if (players.length === 0) {
    return (
      <p className="border-2 border-dashed border-ink/30 px-4 py-6 text-center font-mono text-sm text-ink/50">
        Nenhum jogador adicionado ainda.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {players.map((player, index) => (
        <li
          key={`${player}-${index}`}
          className="flex items-center justify-between gap-2 border-2 border-ink bg-cream px-3 py-2"
        >
          {editingIndex === index ? (
            <>
              <input
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && confirmEdit(index)}
                className="w-full border-b-2 border-ink bg-transparent px-1 py-0.5 font-body focus:outline-none"
                aria-label={`Editar nome de ${player}`}
              />
              <button
                type="button"
                onClick={() => confirmEdit(index)}
                aria-label="Confirmar edição"
                className="shrink-0 text-pitch-dark hover:text-pitch"
              >
                <Check size={20} strokeWidth={2.5} />
              </button>
            </>
          ) : (
            <>
              <span className="truncate font-body font-medium">{player}</span>
              <span className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => startEdit(index)}
                  aria-label={`Editar ${player}`}
                  className="text-ink/50 hover:text-ink"
                >
                  <Pencil size={16} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  aria-label={`Remover ${player}`}
                  className="text-ink/50 hover:text-cta-dark"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </span>
            </>
          )}
        </li>
      ))}
      {error && <p className="font-mono text-sm font-semibold text-cta-dark">{error}</p>}
    </ul>
  );
}
