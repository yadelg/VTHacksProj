from pymongo import MongoClient
import re
import os
from dotenv import load_dotenv
from needed.detect_ingredient import detect

load_dotenv()
database = os.environ.get("database")

class MealDB:
    def __init__(self, db_name="meals_database"):
        self.cluster = MongoClient(database)
        self.db = self.cluster[db_name]
        self.collection = self.db["meals_by_area"]

    def search_meals_by_region_and_ingredients_api(self, region):
        BASE_DIR1 = os.path.dirname(os.path.abspath(__file__)) 
        BASE_DIR2 = os.path.dirname(os.path.abspath(__file__)) 
        FRIDGE_IMAGE = os.path.join(BASE_DIR1, "uploaded_images/fridge_contents_image.jpg")
        SEASONING_IMAGE = os.path.join(BASE_DIR2, "uploaded_images/seasoning_contents_image.jpg")
        ingredients_list = detect(FRIDGE_IMAGE) + detect(SEASONING_IMAGE)

        def intersection_for_two(we_have, they_have):
            res = set()
            for ingredient in we_have:
                ing_arr = ingredient.split(" ")
                for word in ing_arr:
                    for other_ing in they_have:
                        for other_word in other_ing.split(" "):
                            if word == other_word:
                                res.add(ingredient)
            return res
        
        def difference_for_two(they_have, we_have):
            res = set()
            for ingredient in we_have:
                ing_arr = ingredient.split(" ")
                found = False
                for word in ing_arr:
                    for other_ing in they_have:
                        for other_word in other_ing.split(" "):
                            if word == other_word:
                                found = True
                                break
                        if found:
                            break
                if not found:
                    res.add(ingredient)
            return res
        
        def inter(we_have, they_have):
            res = set()
            for ingredient in we_have:
                our_last_ing = ingredient.split(" ")[-1]
                for other_ing in they_have:
                    their_last_ing = other_ing.split(" ")[-1]
                    if our_last_ing == their_last_ing:
                        res.add(ingredient)
            return res       

        def diff(they_have, we_have):
            res = set()
            # collect last words from they_have
            they_last_words = {other_ing.split()[-1] for other_ing in they_have if other_ing.split()}

            for ingredient in we_have:
                words = ingredient.split()
                if not words:  # skip empty
                    continue
                last_word = words[-1]

                if last_word not in they_last_words:
                    res.add(ingredient)

            return res



        def normalize_ingredient(ingredient):
            if not ingredient:
                return ""

            cleaned = ingredient.lower()
            cleaned = re.sub(r'[\d/]+', '', cleaned)

            # Remove units (whole words only)
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

        """
        Search meals in a specific region that contain ALL ingredients in ingredients_list.
        """
        region_doc = self.collection.find_one({"region": region})
       
        if not region_doc:
            return []

        meals = region_doc.get("meals", [])
        filtered_meals = []
       
        search_ingredients = [normalize_ingredient(ing) for ing in ingredients_list]
   
        print(ingredients_list)
        for meal in meals:
            meal_ingredients = [normalize_ingredient(ing) for ing in meal.get("ingredients", [])]
            have =  inter(search_ingredients, meal_ingredients)
            matches = len(have)
            missing = diff(search_ingredients, meal_ingredients)
           
            recipe_data = {
                "recipe_name": meal.get("name"),
                "origin": region,
                "ingredients": meal.get("ingredients", []),  # keep original ingredients for display
                "image": meal.get("thumbnail"),
                "matches": matches,
                "missing": missing,
                "have": have,
                "instructions": meal.get("recipe")                      # include image
            }
            filtered_meals.append(recipe_data)
        
        print(sorted(filtered_meals, key = lambda x: x["matches"], reverse=True)[:6])

        return sorted(filtered_meals, key = lambda x: x["matches"], reverse=True)[:6]