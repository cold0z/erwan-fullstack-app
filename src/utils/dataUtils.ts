import { CompanyData, MonthlyAverageData } from "../types/types";

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
