export const declinationOfNumeral = (number: number, expressions: string[]) => {
  const unit = number % 10;
  if (number > 10 && number < 20) {
    return `${number} ${expressions[2]}`;
  }
  if (unit > 1 && unit < 5) {
    return `${number} ${expressions[1]}`;
  }
  if (unit === 1) {
    return `${number} ${expressions[0]}`;
  }
  return `${number} ${expressions[2]}`;
};

interface IGetDateFormat {
  years: number;
  months: number;
  days: number;
}

export const getDateFormat = ({ days, months, years, }: IGetDateFormat) => {
  let data = "";
  if (years > 0) {
    data += declinationOfNumeral(years, ["год", "года", "лет"]);
  }
  if (months > 0) {
    data += ' '+ declinationOfNumeral(months, ["месяц", "месяцы", "месяцев"]);
  }
  if (days > 0) {
    data += ' '+ declinationOfNumeral(days, ["день", "дня", "дней"]);
  }
  
  return data
};
