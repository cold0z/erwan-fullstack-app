import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: {
    name: string;
    buyDate: string;
    sellDate: string;
    buyPrice: number;
    sellPrice: number;
    profit: number;
  }[];
};

const StockBarChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="buyPrice" fill="#8884d8" name="Prix d'achat" />
        <Bar dataKey="sellPrice" fill="#82ca9d" name="Prix de vente" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StockBarChart;
