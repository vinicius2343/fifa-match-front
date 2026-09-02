import type { RatingOperator } from "../types/match";

export const RATING_OPERATOR_LABELS: Record<RatingOperator, string> = {
  EQUALS: "Igual a",
  LESS_THAN_OR_EQUAL: "Até",
  GREATER_THAN_OR_EQUAL: "A partir de",
};

export function formatRatingStars(value: string | number): string {
  const numeric = typeof value === "number" ? value : Number(value);

  if (Number.isNaN(numeric)) {
    return String(value);
  }

  const fullStars = Math.floor(numeric);
  const hasHalfStar = numeric % 1 >= 0.5;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return `${"★".repeat(fullStars)}${hasHalfStar ? "½" : ""}${"☆".repeat(emptyStars)}`;
}

export function formatRatingFilterValue(value: string): string {
  return `${formatRatingStars(value)} (${value})`;
}