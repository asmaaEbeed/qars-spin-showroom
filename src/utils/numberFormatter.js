export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number);
};

export const formatCurrency = (amount, currency = 'QAR') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};
