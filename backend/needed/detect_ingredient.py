from google import genai
from google.genai import types
from PIL import Image
import json
import os
from yolo_split_predict import split_and_predict
import re

from dotenv import load_dotenv
import os

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

def detect(path):

    load_dotenv()  # reads the .env file

    # --- 1. API Key Setup ---
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("Set GEMINI_API_KEY environment variable before running.")

    # Important: Client must be initialized with api_key here
    client = genai.Client(api_key=api_key)

    # --- 2. Prompt for Ingredients ---
    prompt = """
    Detect and list all distinct food ingredients present in the image.
    Return ONLY a JSON array of objects with the key "ingredient_name". Remove unecessary characteristics/detail, keep it one word and only two if it creates major difference
    such as ingredient quantity or color. 

    Example:
    [
    {"ingredient_name": "apple"},
    {"ingredient_name": "banana"},
    {"ingredient_name": "mushroom"}
    ]
    """

    # --- 3. Load Image ---
    # Get the directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Build a relative path to the image
    image_path = os.path.join(script_dir, path)
    image = Image.open(image_path)

    # --- 4. Configure Response ---
    config = types.GenerateContentConfig(
    response_mime_type="application/json"
    )

    # --- 5. Send Request ---
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[image, prompt],
        config=config
    )

    # --- 6. Parse Response ---
    try:
        ingredients_data = json.loads(response.text)
    except json.JSONDecodeError:
        print("Error: Gemini did not return valid JSON.")
        print("Raw response:", response.text)
        ingredients_data = []

    # Extract clean list
    detected_ingredients = []
    for item in ingredients_data:
        if "ingredient_name" in item:
            detected_ingredients.append(item["ingredient_name"])

    yolo_ing = split_and_predict(path)
    yolo_actual_ingredient = []
    for ingredient in yolo_ing:
        yolo_actual_ingredient.append(normalize_ingredient(ingredient))
    
    yolo_actual_ingredient = list(set(yolo_actual_ingredient))
    need_to_check = []
    for ingredient in yolo_actual_ingredient:
        if ingredient not in detected_ingredients:
            need_to_check.append(ingredient)
    print(detected_ingredients)
    if len(need_to_check) > 3 and "fridge" in path:
        print("THIS HAPPENED")
        prompt = f"""
            A YOLOV8 model and food classifier found you were missing more than three ingredients. Specifically, these ingredients {need_to_check}. 
            Here's what you previously found: {detected_ingredients}.
            Determine recheck the image and determine whether you had missed these ingredients and return a list of ingredients you may have missed like this:
            Return ONLY a JSON array of objects with the key "ingredient_name". Remove unecessary characteristics/details,
            such as ingredient quantity or color. 

            Example:
            [
            "ingredient_name": "apple",
            "ingredient_name": "banana",
            "ingredient_name": "mushroom"
            ]

            The food classifier will not always be correct.
        """
        script_dir = os.path.dirname(os.path.abspath(__file__))
        # Build a relative path to the image
        image_path = os.path.join(script_dir, path)
        image = Image.open(image_path)

        # --- 4. Configure Response ---
        config = types.GenerateContentConfig(
        response_mime_type="application/json"
        )

        # --- 5. Send Request ---
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[image, prompt],
            config=config
        )

        # --- 6. Parse Response ---
        try:
            ingredients_data = json.loads(response.text)
        except json.JSONDecodeError:
            print("Error: Gemini did not return valid JSON.")
            print("Raw response:", response.text)
            ingredients_data = []

        # Extract clean list
        new_ingredients = []
        for item in ingredients_data:
            if "ingredient_name" in item:
                new_ingredients.append(item["ingredient_name"])
        print("NEW DADDDD")
        print(new_ingredients)
        print("--------")
        detected_ingredients = list(set(detected_ingredients + new_ingredients))

    # --- 7. Print Results ---
    print("Detected Ingredients:", detected_ingredients)

    return detected_ingredients

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEST_IMAGE = os.path.join(BASE_DIR, "../uploaded_images/fridge_contents_image.jpg") 
detect(TEST_IMAGE)
