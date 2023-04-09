import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MonthlyAveragePrice } from '../types/types';

type Props = {
  data: MonthlyAveragePrice[];
};

export default function StockChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="google" stroke="#8884d8" name="Google" />
        <Line type="monotone" dataKey="amazon" stroke="#82ca9d" name="Amazon" />
      </LineChart>
    </ResponsiveContainer>
  );
}