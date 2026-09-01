import { Dices, Loader2 } from "lucide-react";

interface SortButtonProps {
  loading: boolean;
  onClick: () => void;
}

export default function SortButton({ loading, onClick }: SortButtonProps) {
  return (
    <button type="button" onClick={onClick} disabled={loading} className="btn-cta w-full !py-5">
      {loading ? (
        <>
          <Loader2 size={24} strokeWidth={2.5} className="animate-spin" />
          Sorteando...
        </>
      ) : (
        <>
          <Dices size={24} strokeWidth={2.5} />
          Sortear times
        </>
      )}
    </button>
  );
}
