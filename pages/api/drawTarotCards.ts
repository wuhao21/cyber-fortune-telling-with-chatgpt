import type { NextApiRequest, NextApiResponse } from "next";
import { TAROT_CARDS_EN, TAROT_CARDS_CN } from "@/data/tarotConfig";

const NUMBER_OF_CARDS = 78;

export type Data = Array<string>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const shuffled = TAROT_CARDS_CN.sort(() => 0.5 - Math.random());
  res.status(200).json(shuffled.slice(0, 3));
}
