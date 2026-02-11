export function formatPrice(price: number, currency: string = 'NPR'): string {
  const formatter = new Intl.NumberFormat('en-NP', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return formatter.format(price);
}

export function formatPriceShort(price: number): string {
  if (price >= 100000) {
    return `Rs. ${(price / 100000).toFixed(1)}L`;
  }
  if (price >= 1000) {
    return `Rs. ${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}K`;
  }
  return `Rs. ${price}`;
}
