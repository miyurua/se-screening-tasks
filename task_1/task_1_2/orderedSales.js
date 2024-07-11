const salesArr = [
  { amount: 1000, quantity: 10 },
  { amount: 2000, quantity: 3 },
  { amount: 5000, quantity: 20 },
  { amount: 500, quantity: 5 },
];

const orderedSales = (salesArr) => {
  salesArrWithTotal = salesArr.map((sale) => ({
    ...sale,
    total: sale.amount * sale.quantity,
  }));

  salesArrWithTotal.sort((a, b) => a.total - b.total);

  return salesArrWithTotal;
};

console.log(orderedSales(salesArr));
