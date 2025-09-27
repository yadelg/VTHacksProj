from google import genai
from google.genai import types
from PIL import Image
import json
import os

from dotenv import load_dotenv
import os

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
Return ONLY a JSON array of objects with the key "ingredient_name". Remove unecessary characteristics/details,
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
image_path = os.path.join(script_dir, "../images/mushrooms.jpg")
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

# --- 7. Print Results ---
print("Detected Ingredients:", detected_ingredients)

