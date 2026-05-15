export function formatNumber(num) {
  if (isNaN(num)) return '0';
  return new Intl.NumberFormat('es-ES').format(Math.round(num));
}
