import type { NextApiRequest, NextApiResponse } from "next";
import { CompanyData } from "../../../types/types";
import axios from 'axios'; 


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const amazonResponse = await axios.get("http://localhost:3000/api/stock/AMAZON");
  const amazonData: CompanyData[] = await amazonResponse.data;


  const sortedData = [...amazonData].sort(
    (a, b) => a.timestamp - b.timestamp
  );

  let currentBalance = 50000;
  let shares = 0;
  let transactions = [];

  for (let i = 0; i < sortedData.length - 1; i++) {
    const currentData = sortedData[i];
    const nextData = sortedData[i + 1];

    if (currentData.lowestPriceOfTheDay < nextData.highestPriceOfTheDay) {
        const sharesToBuy = Math.floor(currentBalance / currentData.lowestPriceOfTheDay);
        if (sharesToBuy > 0) {
          shares += sharesToBuy;
          currentBalance -= sharesToBuy * currentData.lowestPriceOfTheDay;
          transactions.push({
            action: 'Buy',
            shares: sharesToBuy,
            company: currentData.company,
            date: new Date(currentData.timestamp).toLocaleDateString(),
            price: currentData.lowestPriceOfTheDay
          });
        }
      } else {
        const sharesToSell = shares;
        if (sharesToSell > 0) {
          shares = 0;
          currentBalance += sharesToSell * currentData.highestPriceOfTheDay;
          transactions.push({
            action: 'Sell',
            shares: sharesToSell,
            company: currentData.company,
            date: new Date(currentData.timestamp).toLocaleDateString(),
            price: currentData.highestPriceOfTheDay
          });
        }
    }
  }

  const profit = currentBalance - 50000;

  res.status(200).json({ transactions_amazon:transactions, profit_amazon:profit });
};

export default handler;