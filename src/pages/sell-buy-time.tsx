import { GetServerSideProps } from 'next';
import { findBestTimeToBuySell } from '../utils/dataUtils';
import { CompanyData } from '../types/types';
import StockBarChart from '../components/StockBarChart';

type Props = {
  googleData: CompanyData[];
  amazonData: CompanyData[];
};

const BestTimeToBuySellPage = ({ googleData, amazonData }: Props) => {
  const googleResults = findBestTimeToBuySell(googleData);
  const amazonResults = findBestTimeToBuySell(amazonData);

  const data = [
    {
      name: 'Google',
      buyDate: googleResults.buyDate,
      sellDate: googleResults.sellDate,
      buyPrice: googleResults.buyPrice,
      sellPrice: googleResults.sellPrice,
      profit: googleResults.profit,
    },
    {
      name: 'Amazon',
      buyDate: amazonResults.buyDate,
      sellDate: amazonResults.sellDate,
      buyPrice: amazonResults.buyPrice,
      sellPrice: amazonResults.sellPrice,
      profit: amazonResults.profit,
    },
  ];
  console.log("data",data);
  return (
    <div className="m-6">
    <h1 className="text-lg text-green-600 mb-10 content-centre">Le meilleur moment pour acheter et vendre des actions</h1>
      <StockBarChart data={data} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const googleResponse = await fetch('http://localhost:3000/api/stock/GOOGLE');
  const googleData = await googleResponse.json();

  const amazonResponse = await fetch('http://localhost:3000/api/stock/AMAZON');
  const amazonData = await amazonResponse.json();

  return {
    props: {
      googleData,
      amazonData,
    },
  };
};

export default BestTimeToBuySellPage;