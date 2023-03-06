import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import {
  systemSetting_CN,
  systemSetting_EN,
  getCNPrompt,
  getENPrompt,
} from "@/data/tarotConfig";

type CardData = {
  name: string;
  meaning: string;
};

export type Data = {
  cards: Array<CardData>;
  fortune: string;
};

const errorHandling = (err: any) => {
  if (err.response) {
    console.log(err.response.status);
    console.log(err.response.data);
  } else {
    console.log(err.message);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const cards = req.body;
  console.log("Get cards!");
  console.log(cards);
  //generate fortune
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    console.log("Loaded configuration...");
    const openai = new OpenAIApi(configuration);
    console.log("Asking ChatGPT...");
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0,
      messages: [
        { role: "system", content: systemSetting_CN },
        { role: "user", content: getCNPrompt(cards) },
      ],
    });
    const responseContent = completion.data.choices[0].message?.content;
    console.log("Get answer:");
    console.log(responseContent);
    if (responseContent != null) {
      const jsonResponse: Data = JSON.parse(responseContent.replace("，", ","));
      res.status(200).json(jsonResponse);
    } else {
      console.log("Null response");
      res.status(401).end();
    }
  } catch (err: any) {
    errorHandling(err);
    res.status(401).end();
  }
}
