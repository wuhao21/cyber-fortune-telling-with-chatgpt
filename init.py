import json
import os
from typing import Dict, List


class TarotCard:
    def __init__(
        self,
        name: str,
        rank: int,
        suite: str,
        meanings: Dict[str, List[str]],
        keywords: List[str],
        fortune_telling: List[str],
    ):
        self.name = name
        self.rank = rank
        self.suite = suite
        self.meanings = meanings
        self.keywords = keywords
        self.fortune_telling = fortune_telling

    @classmethod
    def from_json(cls, json_data):
        return cls(
            json_data["name"],
            json_data["rank"],
            json_data["suit"],
            json_data["meanings"],
            json_data["keywords"],
            json_data["fortune_telling"],
        )

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)


# Get the path to the Tarot deck JSON file in the user's home directory
filepath = os.path.expanduser("./data/tarot_interpretations.json")
# Open the Tarot deck JSON file
with open(filepath, "r") as file:
    data = json.load(file)
# Create a list of TarotCard objects for each card in the deck
tarot_cards = []
for card_json in data["tarot_interpretations"]:
    tarot_cards.append(TarotCard.from_json(card_json))

print(len(tarot_cards))
print(tarot_cards[21].toJSON())
