Date.prototype.daysTo = function (date) {
  if (this.getTime === date.getTime()) {
    return "date1 and date2 cannot be the same";
  }
  if (this.getTime() > date.getTime()) {
    return "date1 has to be a previous date than date2";
  }

  const dateDiff = (date - this) / (1000 * 60 * 60 * 24);

  return dateDiff;
};

const date1 = new Date("2024-07-10");
const date2 = new Date("2024-07-12");

console.log(date1.daysTo(date2));
