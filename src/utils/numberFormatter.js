const formatCurrency = (amount) => {
  return new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    maximumSignificantDigits: 3,
  }).format(amount);
};

export default formatCurrency;
