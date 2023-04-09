import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { company } = req.query;
  const client = await MongoClient.connect(process.env.MONGODB_URI as string);
  const db = client.db("stock-data").collection("prices");

  const data = await db.find({ company }).toArray();
  console.log("collection", process.env.MONGODB_URI);

  res.json(data);
}
