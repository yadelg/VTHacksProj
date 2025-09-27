import requests
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
database = os.environ.get("database")


cluster = MongoClient(database)
cluster.drop_database("meals_database")
db = cluster["meals_database"]
collection = db["meals_by_area"]

areas_url = "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
areas_data = requests.get(areas_url).json()
areas = []

for area in areas_data['meals']:
    areas.append(area['strArea'])

for area in areas:
    #meals for the region
    meals_url = f"https://www.themealdb.com/api/json/v1/1/filter.php?a={area}"
    meals_data = requests.get(meals_url).json()
    
    meals_list = []

    if meals_data.get('meals'):
        for meal in meals_data['meals']:
            meal_id = meal['idMeal']
            
            #full meal details
            detail_url = f"https://www.themealdb.com/api/json/v1/1/lookup.php?i={meal_id}"
            detail_data = requests.get(detail_url).json()
            
            if detail_data.get('meals'):
                detail = detail_data['meals'][0]
                
                #ingredients for this meal
                ingredients = []
                for i in range(1, 21):
                    ingredient = detail.get(f"strIngredient{i}")
                    measure = detail.get(f"strMeasure{i}")
                    if ingredient and ingredient.strip():
                        ingredients.append(f"{measure.strip()} {ingredient.strip()}" if measure else ingredient.strip())
                
                # Add meal info
                meals_list.append({
                    "name": detail['strMeal'],
                    "id": detail['idMeal'],
                    "thumbnail": detail['strMealThumb'],
                    "ingredients": ingredients,
                    "recipe" : detail.get("strInstructions", "").strip()
                })
    

    collection.update_one(
        {"region": area},
        {"$set": {
            "meals": meals_list
        }},
        upsert=True
    )

