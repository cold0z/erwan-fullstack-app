import { GetServerSideProps } from "next";

import { getMonthlyAverageData } from "../utils/dataUtils";
import { CompanyData, MonthlyAveragePrice } from "../types/types";
import StockChart from "../components/StockChart";

type Props = {
  googleData: CompanyData[];
  amazonData: CompanyData[];
};

export default function HomePage({ googleData, amazonData }: Props) {
  const googleMonthlyAveragePrices = getMonthlyAverageData(
    googleData,
    "google"
  );
  const amazonMonthlyAveragePrices = getMonthlyAverageData(
    amazonData,
    "amazon"
  );

  const combinedMonthlyAveragePrices  = googleMonthlyAveragePrices.map(
    (item, index) => ({
      month: item.month.toString(),
      google: item.totalPrice / item.count,
      amazon:
        amazonMonthlyAveragePrices[index].totalPrice /
        amazonMonthlyAveragePrices[index].count,
    })
  );

  return (
    <div className="m-6">
      <h1 className="text-4xl text-red-600 mb-20 content-centre">
        Prix moyens mensuels des actions Google et Amazon
      </h1>
      <StockChart data={combinedMonthlyAveragePrices} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {

 const dev = process.env.NODE_ENV !== "production";

 const server = dev ? "http://localhost:3000" : process.env.VERCEL_URL;


  const googleResponse = await fetch(`${server}/api/stock/GOOGLE`);
  const googleData = await googleResponse.json();

  const amazonResponse = await fetch(`${server}/api/stock/AMAZON`);
  const amazonData = await amazonResponse.json();

  return {
    props: {
      googleData,
      amazonData,
    },
  };
};
