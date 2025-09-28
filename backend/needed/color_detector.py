import tensorflow as tf
import numpy as np
from PIL import Image
import os

# ==== CONFIG ====
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # backend/detect/
MODEL_PATH = os.path.join(BASE_DIR, "color_model.h5")
IMG_SIZE = (224, 224)
TEST_IMAGE = os.path.join(BASE_DIR, "t.jpg") 
# sample test image

def detect_color(image_input):
    # Load the trained model (.h5 format)
    model = tf.keras.models.load_model(MODEL_PATH)



    # Get class names from the folder structure, sorted alphabetically
    class_names = sorted(['Unlabeled', 'avocado', 'baking powder', 'bay leaves', 'beetroot', 'black beans', 'black pepper', 'brown sugar', 'butter', 'cabbage', 'capsicum', 'carrots', 'cauliflower', 'chicken', 'chili powder', 'chopped onion', 'cilantro leaves', 'corn', 'corn starch', 'cucumber', 'cumin', 'diced tomatoes', 'eggplant', 'eggs', 'flour', 'fresh parsley', 'garam masala', 'garlic', 'garlic powder', 'ginger', 'grated parmesan cheese', 'green onions', 'ground cinnamon', 'ground turmeric', 'honey', 'lemon', 'lettuce', 'oil', 'peas', 'plum tomatoes', 'potatoes', 'purple onion', 'raddish', 'salt', 'sour cream', 'soy beans', 'spinach', 'sugar', 'turnip', 'yellow onion'])


    #print("Detected class folders (alphabetical):", class_names)

    # If input is a path, open it; if it's already an Image, use it directly
    if isinstance(image_input, str):
        img = Image.open(image_input).convert("RGB")
    else:
        img = image_input.convert("RGB")

    # Resize and normalize
    img = img.resize(IMG_SIZE)
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)  # shape (1, 224, 224, 3)

    # Predict
    preds = model.predict(img)
    #print("Raw prediction vector:", preds)
    #print("Prediction shape:", preds.shape)

    top_idx = np.argmax(preds, axis=1)[0]
    #print("Top index:", top_idx)

    if top_idx >= len(class_names):
        raise IndexError(
            f"Prediction index {top_idx} is out of range for class_names with length {len(class_names)}"
        )

    detected_class = class_names[top_idx]
    #print(f"🎨 Detected class: {detected_class}")
    return detected_class

# ==== MAIN ====
if __name__ == "__main__":
    print("Resolved paths:")
    print("MODEL_PATH =", MODEL_PATH)
    print("TEST_IMAGE =", TEST_IMAGE)
    print("-" * 40)

    detect_color(TEST_IMAGE)
    print(BASE_DIR) 


