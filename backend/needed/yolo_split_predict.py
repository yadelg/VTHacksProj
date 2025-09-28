from ultralytics import YOLO
from PIL import Image
import numpy as np
import os
from color_detector import detect_color

# -------------------------------
# Paths
# -------------------------------
YOLO_MODEL_PATH = "needed/yolo11n.pt"
OUTPUT_DIR = "needed/split_crops"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load YOLO model
model = YOLO(YOLO_MODEL_PATH)

# -------------------------------
# Function to split ingredients
# -------------------------------
def split_and_predict(image_path, pad=10):
    """
    Uses YOLO to detect ingredients, crops each with padding,
    resizes to model input size (180x180), saves crops, and predicts ingredients.
    """
    results = model.predict(image_path)
    all_ingredients = []

    img = Image.open(image_path).convert("RGB")
    img_w, img_h = img.size

    crop_index = 0
    for result in results:
        boxes = result.boxes.xyxy.cpu().numpy()  # [x1, y1, x2, y2]

        for box in boxes:
            x1, y1, x2, y2 = map(int, box)

            # Add padding and clamp to image bounds
            x1 = max(0, x1 - pad)
            y1 = max(0, y1 - pad)
            x2 = min(img_w, x2 + pad)
            y2 = min(img_h, y2 + pad)

            cropped_img = img.crop((x1, y1, x2, y2))
            cropped_img = cropped_img.resize((180, 180))  # match model input

            # Save crop
            crop_filename = os.path.join(OUTPUT_DIR, f"crop_{crop_index}.jpg")
            cropped_img.save(crop_filename)
            crop_index += 1

            # Predict ingredient
            ingredients = detect_color(cropped_img)
            all_ingredients.append(ingredients)

    return all_ingredients

# -------------------------------
# Example usage
# -------------------------------
if __name__ == "__main__":
    BASE_DIR = os.path.dirname(os.path.abspath(__file__)) 
    TEST_IMAGE = os.path.join(BASE_DIR, "fridge_contents_image.jpg") 
    uploaded_image = "backend/needed/fridge_contents_image.jpg"
    ingredient_lists = split_and_predict(TEST_IMAGE)
