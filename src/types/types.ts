export type CompanyData = {
  v: number;
  vw: number;
  o: number;
  c: number;
  highestPriceOfTheDay: number;
  lowestPriceOfTheDay: number;
  timestamp: number;
  n: number;
};

export type MonthlyAverageData = {
  google: number;
  year: number;
  month: number;
  totalPrice: number;
  count: number;
};

export type MonthlyAveragePrice = {
  month: string;
  google: number;
  amazon: number;
};