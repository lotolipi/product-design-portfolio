// Decorative geometry. Callers provide the exact rate and source in adjacent text.
export function percentMark(value, matrix = false) {
  if (!Number.isFinite(value) || value < 0 || value > 100) return '';
  if (matrix) {
    const dots = Array.from({length:100}, (_, i) =>
      `<circle cx="${5 + i % 10 * 10}" cy="${5 + Math.floor(i / 10) * 10}" r="3.8" fill="var(--${i < Math.round(value) ? 'accent' : 'track'})"/>`).join('');
    return `<svg viewBox="0 0 100 100" aria-hidden="true">${dots}</svg>`;
  }
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke-width="13"><circle cx="50" cy="50" r="40" stroke="var(--track)"/><circle cx="50" cy="50" r="40" pathLength="100" stroke="var(--accent)" stroke-dasharray="${value} ${100-value}" transform="rotate(-90 50 50)"/></g></svg>`;
}
