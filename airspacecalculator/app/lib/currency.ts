export function formatAmount(amount: number) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
    currency: 'USD',
  }).format(amount);
}
