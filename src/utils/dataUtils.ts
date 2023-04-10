import { CompanyData, MonthlyAverageData } from "../types/types";

type StockData = {
  v: number;
  vw: number;
  o: number;
  c: number;
  highestPriceOfTheDay: number;
  lowestPriceOfTheDay: number;
  timestamp: number;
  n: number;
  company: string;
};

type BuySellDates = {
  buyDate: Date;
  sellDate: Date;
  buyPrice: number;
  sellPrice: number;
  profit: number;
};

export function findBestTimeToBuySell(data: StockData[]): BuySellDates {
  let maxProfit = 0;
  let buyDate = new Date();
  let sellDate = new Date();
  let buyPriceItem = 0;
  let sellPriceItem = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      const buyPrice = data[i].lowestPriceOfTheDay;
      const sellPrice = data[j].highestPriceOfTheDay;

      const profit = sellPrice - buyPrice;

      if (profit > maxProfit) {
        maxProfit = profit;
        buyDate = new Date(data[i].timestamp);
        sellDate = new Date(data[j].timestamp);
        buyPriceItem = buyPrice;
        sellPriceItem = sellPrice;
      }
    }
  }

  return {
    buyDate,
    sellDate,
    profit: maxProfit,
    buyPrice: buyPriceItem,
    sellPrice: sellPriceItem,
  };
}

export function getMonthlyAverageData(
  data: CompanyData[],
  companyName: string
): MonthlyAverageData[] {
  return data.reduce<MonthlyAverageData[]>((acc, current) => {
    const date = new Date(current.timestamp);
    const year = date.getFullYear();
    const month = date.getMonth();

    const existingIndex = acc.findIndex(
      (item) => item.year === year && item.month === month
    );
    if (existingIndex !== -1) {
      acc[existingIndex].totalPrice +=
        (current.highestPriceOfTheDay + current.lowestPriceOfTheDay) / 2;
      acc[existingIndex].count++;
    } else {
      acc.push({
        google: companyName === "google" ? 1 : 0,
        year,
        month,
        totalPrice:
          (current.highestPriceOfTheDay + current.lowestPriceOfTheDay) / 2,
        count: 1,
      });
    }
    return acc;
  }, []);
}
