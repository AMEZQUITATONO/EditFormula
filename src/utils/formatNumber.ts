function formatNumber(number: number, decimals = 2) {
  return number.toLocaleString("es-ES", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default formatNumber;