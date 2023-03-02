import json
import os
import random
import openai
from dotenv import load_dotenv
from typing import Dict, List

# Get the path to the Tarot deck JSON file in the user's home directory
filepath = os.path.expanduser("./data/tarot_interpretations.json")
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')
# Open the Tarot deck JSON file
with open(filepath, "r") as file:
    data = json.load(file)
# Create a list of TarotCard objects for each card in the deck
tarot_cards = []
for card_json in data["tarot_interpretations"]:
    tarot_cards.append(card_json["name"])

drew_cards = ", ".join(random.choices(tarot_cards, k=3))[:-2]
systemSetting_EN = "You are a fortune teller and good at Tarot."
promot_EN = "I drew 3 cards: "+drew_cards + \
    ". Please tell me the meaning of 3 cards and my fortune today in JSON format {\"cards\":[{\"name\": string, \"meaning\": string}],\"fortune\": string)}:"
systemSetting_CN = "你是一个精通塔罗牌的算命大师"
promot_CN = "我抽了三张牌: "+drew_cards + \
    ". 请用中文回答我这三张牌的含义以及我今日的运势 把结果用一下JSON的形式告诉我 {\"cards\":[{\"name\": string, \"meaning\": string}],\"fortune\": string)}"
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    temperature=0,
    messages=[
        {"role": "system", "content": systemSetting_CN},
        {"role": "user", "content": promot_CN},
    ]
)
responseContent = response["choices"][0]["message"]["content"]
print(response)
result = json.loads(responseContent.replace('，',',')) 
print(result)