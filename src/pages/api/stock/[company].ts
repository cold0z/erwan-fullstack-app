import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { company } = req.query;
  if (company !== "GOOGLE" && company !== "AMAZON") {
    return res.status(404).end();
  }
  const client = await MongoClient.connect("mongodb+srv://haddoujihad:kWiSXQjvStwl3wTS@cluster0.vsgein5.mongodb.net/?retryWrites=true&w=majority");
  const db = client.db("stock-data").collection("prices");
  //const data = await db.find({ company }).toArray();
  await db.createIndex({ company: 1 });
  const data = await db.find({ company }).limit(5).toArray();
  res.json(data);
}
