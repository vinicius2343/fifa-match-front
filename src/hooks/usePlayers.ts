import { useCallback, useState } from "react";
import { isDuplicateName, normalizeName } from "../utils/players";

interface UsePlayersState {
  players: string[];
  addPlayer: (name: string) => string | null;
  removePlayer: (index: number) => void;
  editPlayer: (index: number, name: string) => string | null;
}

export function usePlayers(initial: string[] = []): UsePlayersState {
  const [players, setPlayers] = useState<string[]>(initial);

  const addPlayer = useCallback(
    (name: string): string | null => {
      const clean = normalizeName(name);
      if (!clean) return "Digite um nome para o jogador.";
      if (isDuplicateName(clean, players)) return "Esse jogador já foi adicionado.";
      setPlayers((prev) => [...prev, clean]);
      return null;
    },
    [players]
  );

  const removePlayer = useCallback((index: number) => {
    setPlayers((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const editPlayer = useCallback(
    (index: number, name: string): string | null => {
      const clean = normalizeName(name);
      if (!clean) return "O nome não pode ficar vazio.";
      const others = players.filter((_, i) => i !== index);
      if (isDuplicateName(clean, others)) return "Esse jogador já foi adicionado.";
      setPlayers((prev) => prev.map((p, i) => (i === index ? clean : p)));
      return null;
    },
    [players]
  );

  return { players, addPlayer, removePlayer, editPlayer };
}
