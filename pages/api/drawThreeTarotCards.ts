import type { NextApiRequest, NextApiResponse } from "next";

const TAROT_CARDS = [
  "The Fool",
  "The Magician",
  "The Papess/High Priestess",
  "The Empress",
  "The Emperor",
  "The Pope/Hierophant",
  "The Lovers",
  "The Chariot",
  "Strength",
  "The Hermit",
  "The Wheel",
  "Justice",
  "The Hanged Man",
  "Death",
  "Temperance",
  "The Devil",
  "The Tower",
  "The Star",
  "The Moon",
  "The Sun",
  "Judgement",
  "The World",
  "Ace of Wands",
  "Two of Wands",
  "Three of Wands",
  "Four of Wands",
  "Five of Wands",
  "Six of Wands",
  "Seven of Wands",
  "Eight of Wands",
  "Nine of Wands",
  "Ten of Wands",
  "Page of Wands",
  "Knight of Wands",
  "Queen of Wands",
  "King of Wands",
  "Ace of Cups",
  "Two of Cups",
  "Three of Cups",
  "Four of Cups",
  "Five of Cups",
  "Six of Cups",
  "Seven of Cups",
  "Eight of Cups",
  "Nine of Cups",
  "Ten of Cups",
  "Page of Cups",
  "Knight of Cups",
  "Queen of Cups",
  "King of Cups",
  "Ace of Swords",
  "Two of Swords",
  "Three of Swords",
  "Four of Swords",
  "Five of Swords",
  "Six of Swords",
  "Seven of Swords",
  "Eight of Swords",
  "Nine of Swords",
  "Ten of Swords",
  "Page of Swords",
  "Knight of Swords",
  "Queen of Swords",
  "King of Swords",
  "Ace of Coins",
  "Two of Coins",
  "Three of Coins",
  "Four of Coins",
  "Five of Coins",
  "Six of Coins",
  "Seven of Coins",
  "Eight of Coins",
  "Nine of Coins",
  "Ten of Coins",
  "Page of Coins",
  "Knight of Coins",
  "Queen of Coins",
  "King of Coins",
];

const NUMBER_OF_CARDS = 78;

export type Data = {
  card1: string;
  card2: string;
  card3: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const shuffled = TAROT_CARDS.sort(() => 0.5 - Math.random());
  res.status(200).json({
    card1: shuffled[0],
    card2: shuffled[1],
    card3: shuffled[2],
  });
}
