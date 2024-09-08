export function formatAmount(amount: number) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    currency: 'USD',
  }).format(amount);
}
