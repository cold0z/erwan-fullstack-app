import { GetServerSideProps } from "next";

import { getMonthlyAverageData } from "../utils/dataUtils";
import { CompanyData, MonthlyAveragePrice } from "../types/types";
import StockChart from "../components/StockChart";

type Props = {
  googleData: CompanyData[];
  amazonData: CompanyData[];
};

export default function HomePage({ googleData, amazonData }: Props) {
  const googleMonthlyAveragePrices = getMonthlyAverageData(googleData, "google");
  const amazonMonthlyAveragePrices = getMonthlyAverageData(amazonData, "amazon");

  const combinedMonthlyAveragePrices = googleMonthlyAveragePrices.map(
    (item, index) => ({
      month: item.month,
      google: item.totalPrice / item.count,
      amazon: amazonMonthlyAveragePrices[index].totalPrice / amazonMonthlyAveragePrices[index].count,
    })
  );

  return (
    <div>
      <h1>Prix moyens mensuels des actions Google et Amazon</h1>
      <StockChart data={combinedMonthlyAveragePrices} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const googleResponse = await fetch("http://localhost:3000/api/stock/GOOGLE");
  const googleData = await googleResponse.json();

  const amazonResponse = await fetch("http://localhost:3000/api/stock/AMAZON");
  const amazonData = await amazonResponse.json();

  return {
    props: {
      googleData,
      amazonData,
    },
  };
};