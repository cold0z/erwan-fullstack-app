import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { CompanyData, Transaction } from "../types/types";

type Props = {
  transactions_google: [];
  transactions_amazon: [];
  profit_google: number;
  profit_amazon: number;
};

export default function BestTimeToBuySellDailyPage({
  transactions_google,
  transactions_amazon,
  profit_google,
  profit_amazon,
}: Props) {
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const end = performance.now();
    setTimeTaken(end - start);
  }, []);

  return (
    <div className="m-6">
      <h1 className="text-2xl	 text-lime-600 mb-10">
        Meilleur moment pour acheter et vendre des actions Google et Amazon par
        jour.
      </h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="grid grid-cols-2 gap-8 mb-6">
          <h1 className="text-lg float-left uppercase font-bold	">
            Gains: {profit_google.toFixed(2)}€
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-6">
          <h1 className="text-lg float-left uppercase font-bold	">
            Gains: {profit_amazon.toFixed(2)}€
          </h1>
          <p className="text-right">
            Temps d&apos;exécution: {timeTaken.toFixed(2)}ms
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h4 className="text-teal-700">Google Shares</h4>
          <table className="min-w-full text-left text-sm font-light">
            <thead>
              <tr>
                <th className="border border-gray-600 p-2">Action</th>
                <th className="border border-gray-600 p-2">Shares</th>
                <th className="border border-gray-600 p-2">Company</th>
                <th className="border border-gray-600 p-2">Date</th>
                <th className="border border-gray-600 p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {transactions_google.map((transaction: Transaction, index) => (
                <tr key={index}>
                  <td className="border border-gray-600 p-2">
                    {transaction.action}
                  </td>
                  <td className="border border-gray-600 p-2">
                    {transaction.shares}
                  </td>
                  <td className="border border-gray-600 p-2">
                    {transaction.company}
                  </td>
                  <td className="border border-gray-600 p-2">
                    {transaction.date}
                  </td>
                  <td className="border border-gray-600 p-2">
                    {transaction.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h4 className="text-teal-700">Amazon Shares</h4>
          <table className="min-w-full text-left text-sm font-light">
            <thead>
              <tr>
                <th className="border border-gray-600 p-2">Action</th>
                <th className="border border-gray-600 p-2">Shares</th>
                <th className="border border-gray-600 p-2">Company</th>
                <th className="border border-gray-600 p-2">Date</th>
                <th className="border border-gray-600 p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {transactions_amazon.map((transaction: Transaction, index) => (
                <tr key={index}>
                  <td className="border border-gray-600 p-2">
                    {transaction.action}
                  </td>
                  <td className="border border-gray-600 p-2">
                    {transaction.shares}
                  </td>
                  <td className="border border-gray-600 p-2">
                    {transaction.company}
                  </td>
                  <td className="border border-gray-600 p-2">
                    {transaction.date}
                  </td>
                  <td className="border border-gray-600 p-2">
                    {transaction.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const response_google = await fetch(
    "http://localhost:3000/api/stock/bestTimeToBuySell_GOOGLE"
  );
  const { transactions_google, profit_google } = await response_google.json();

  const response_amazon = await fetch(
    "http://localhost:3000/api/stock/bestTimeToBuySell_AMAZON"
  );
  const { transactions_amazon, profit_amazon } = await response_amazon.json();

  return {
    props: {
      transactions_google,
      transactions_amazon,
      profit_google,
      profit_amazon,
    },
  };
};
