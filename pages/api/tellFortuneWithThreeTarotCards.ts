import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai';

type CardData = {
    name: string,
    meaning: string,
};

export type Data = {
    cards: Array<CardData>,
    fortune: string;
}

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
    //draw cards
    const cards = req.body;

    //generate fortune
    try {
        const systemSetting_EN = "You are a fortune teller and good at Tarot."
        const systemSetting_CN = "你是一个精通塔罗牌的算命大师"
        const prompt_EN = "I drew 3 cards: " + cards.card1 + " " + cards.card2 + " " + cards.card3 + ". Please tell me the meaning of 3 cards and my fortune today in JSON format {\"cards\":[{\"name\": string, \"meaning\": string}],\"fortune\": string)}:"
        const prompt_CN = "我抽了三张牌:" + cards.card1 + " " + cards.card2 + " " + cards.card3 + ". 请用中文为我详细解答这三张牌的含义，以及我今日的运势，把结果用以下JSON的形式告诉我 {\"cards\":[{\"name\": string, \"meaning\": string}],\"fortune\": string)}:"
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 0,
            messages: [
                { "role": "system", "content": systemSetting_CN },
                { "role": "user", "content": prompt_CN },
            ],
        });
        const responseContent = completion.data.choices[0].message?.content;
        if (responseContent != null) {
            const jsonResponse: Data = JSON.parse(responseContent.replace('，',','));
            res.status(200).json(jsonResponse);
        } else {
            res.status(400);
        }
    } catch (err) {
        errorHandling(err);
        res.status(400);
    }
}
