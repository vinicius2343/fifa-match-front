import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";

interface PlayerInputProps {
  onAdd: (name: string) => string | null;
}

export default function PlayerInput({ onAdd }: PlayerInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = onAdd(value);
    if (result) {
      setError(result);
      return;
    }
    setValue("");
    setError(null);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          type="text"
          placeholder="Nome do jogador"
          aria-label="Nome do jogador"
          className="w-full border-[3px] border-ink bg-cream px-4 py-3 font-body text-base placeholder:text-ink/40 focus:outline-none"
        />
        <button type="submit" className="btn-outline whitespace-nowrap !py-3">
          <Plus size={18} strokeWidth={3} />
          Adicionar jogador
        </button>
      </div>
      {error && <p className="font-mono text-sm font-semibold text-cta-dark">{error}</p>}
    </form>
  );
}
