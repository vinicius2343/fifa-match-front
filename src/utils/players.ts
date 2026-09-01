/** Trims and collapses internal whitespace, for comparing/display. */
export function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}

/** Case-insensitive duplicate check against an existing list of names. */
export function isDuplicateName(name: string, existing: string[]): boolean {
  const normalized = normalizeName(name).toLowerCase();
  return existing.some((p) => normalizeName(p).toLowerCase() === normalized);
}
