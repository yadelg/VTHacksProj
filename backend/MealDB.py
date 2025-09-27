from pymongo import MongoClient
import re
import os
from dotenv import load_dotenv
from detect.detect_ingredient import detect

load_dotenv()
database = os.environ.get("database")

class MealDB:
    def __init__(self, connection_string, db_name="meals_database"):
        self.cluster = MongoClient(database)
        self.db = self.cluster[db_name]
        self.collection = self.db["meals_by_area"]

    def search_meals_by_region_and_ingredients_api(self, region):
        ingredients_list = detect()

        def normalize_ingredient(ingredient):
            if not ingredient:
                return ""

            cleaned = ingredient.lower()
            cleaned = re.sub(r'[\d/]+', '', cleaned)

            # Remove units
            units = r'\b(g|kg|ml|l|tbls|tbs|tsp|cup|cups|can|garnish|oz|lb|teaspoon|tablespoon|tbsp)\b'
            cleaned = re.sub(units, '', cleaned)

            # Remove descriptors, colors, and prep terms
            descriptors = r'\b(salted|unsalted|seperated|chopped|minced|grated|shredded|sliced|roasted|boiled|fried|baked|steamed|smoked|peeled|crushed|ground|toasted|fresh|large|small|medium|extra-virgin|organic|raw|frozen|cooked|whole|skinless|boneless|red|green|yellow|white|black|brown|orange|pink|purple|pinch|clove|stick|topping|of)\b'
            cleaned = re.sub(descriptors, '', cleaned)

            # Remove punctuation
            cleaned = re.sub(r'[,:()]', '', cleaned)

            # Collapse multiple spaces
            cleaned = re.sub(r'\s+', ' ', cleaned)

            return cleaned.strip()

        # Get region meals
        region_doc = self.collection.find_one({"region": region})
        if not region_doc:
            return []

        meals = region_doc.get("meals", [])
        search_ingredients = [normalize_ingredient(ing) for ing in ingredients_list]

        scored_meals = []

        for meal in meals:
            meal_ingredients = [normalize_ingredient(ing) for ing in meal.get("ingredients", [])]

            # Count matches between detected and meal ingredients
            matches = sum(1 for ing in search_ingredients if ing in meal_ingredients)

            if matches > 0:  # only keep if there's at least one match
                scored_meals.append({
                    "recipe_name": meal.get("name"),
                    "origin": region,
                    "ingredients": meal.get("ingredients", []),
                    "image": meal.get("thumbnail"),
                    "match_score": matches
                })

        # Sort by match_score (descending) and keep top 3
        top_matches = sorted(scored_meals, key=lambda x: x["match_score"], reverse=True)[:3]

        return top_matches
    
