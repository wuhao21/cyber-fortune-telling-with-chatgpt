export const TAROT_CARDS_EN = [
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

export const TAROT_CARDS_CN = [
  "愚者",
  "魔术师",
  "女教皇",
  "女皇",
  "皇帝",
  "教皇",
  "恋人",
  "战车",
  "力量",
  "隐士",
  "命运之轮",
  "正义",
  "倒悬者",
  "死亡",
  "节制",
  "恶魔",
  "塔",
  "星星",
  "月亮",
  "太阳",
  "审判",
  "世界",
  "权杖1",
  "权杖2",
  "权杖3",
  "权杖4",
  "权杖5",
  "权杖6",
  "权杖7",
  "权杖8",
  "权杖9",
  "权杖10",
  "权杖侍从",
  "权杖骑士",
  "权杖皇后",
  "权杖国王",
  "圣杯1",
  "圣杯2",
  "圣杯3",
  "圣杯4",
  "圣杯5",
  "圣杯6",
  "圣杯7",
  "圣杯8",
  "圣杯9",
  "圣杯10",
  "圣杯侍从",
  "圣杯骑士",
  "圣杯皇后",
  "圣杯国王",
  "宝剑1",
  "宝剑2",
  "宝剑3",
  "宝剑4",
  "宝剑5",
  "宝剑6",
  "宝剑7",
  "宝剑8",
  "宝剑9",
  "宝剑10",
  "宝剑侍从",
  "宝剑骑士",
  "宝剑皇后",
  "宝剑国王",
  "金币1",
  "金币2",
  "金币3",
  "金币4",
  "金币5",
  "金币6",
  "金币7",
  "金币8",
  "金币9",
  "金币10",
  "金币侍从",
  "金币骑士",
  "金币皇后",
  "金币国王",
];

export const systemSetting_EN = "You are a fortune teller and good at Tarot.";
export const systemSetting_CN = "你是一个精通塔罗牌的算命大师";
export function getENPrompt(cards: Array<string>): string {
  return (
    "I drew 3 cards: " +
    cards.join(",") +
    '. Please tell me the meaning of 3 cards and my fortune today in JSON format {"cards":[{"name": string, "meaning": string}],"fortune": string)}:'
  );
}
export function getCNPrompt(cards: Array<string>): string {
  return (
    "我抽了三张牌:" +
    cards.join("，") +
    '. 请用中文为我详细解答这三张牌的含义，以及我今日的运势，把结果用以下JSON的形式告诉我 {"cards":[{"name": string, "meaning": string}],"fortune": string)}:'
  );
}
