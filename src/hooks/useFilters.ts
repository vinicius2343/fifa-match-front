import { useCallback, useEffect, useState } from "react";
import { getFilters } from "../services/matchService";
import type { FiltersResponse } from "../types/match";

interface UseFiltersState {
  filters: FiltersResponse | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

/**
 * Loads the filter catalog from GET /api/match/filters.
 * Exposes loading / error / empty states so the UI can react correctly.
 */
export function useFilters(): UseFiltersState {
  const [filters, setFilters] = useState<FiltersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const reload = useCallback(() => setReloadToken((t) => t + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getFilters();
        if (!cancelled) setFilters(data);
      } catch (error) {
        if (!cancelled) {
          const message =
            error && typeof error === "object" && "code" in error && error.code === "ERR_NETWORK"
              ? "Não foi possível carregar os filtros. O backend está acessível? Verifique CORS e se a API está rodando em http://localhost:8080."
              : "Não foi possível carregar os filtros. Verifique se o backend está rodando e se o CORS está habilitado para http://localhost:5173.";

          setError(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  return { filters, loading, error, reload };
}
