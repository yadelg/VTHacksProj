from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from detect.detect_ingredient import detect
import MealDB

import os

app = FastAPI()
meal_db = MealDB.MealDB()

user_info = {
    "country": "France"
}


@app.get("/recipe", tags=["recipes"])
async def get_recipes() -> dict:
    return { "data": meal_db.search_meals_by_region_and_ingredients_api(user_info["country"]) }

@app.post("/send_info")
async def upload_info(
    country: str = Form(...),
    image: UploadFile = File(...)
):
    
    print(f"Received country: {country}")

    UPLOAD_DIR = "uploaded_images"
    os.makedirs(UPLOAD_DIR, exist_ok=True) 

    constant_backend_filename = image.filename
    file_location = os.path.join(UPLOAD_DIR, constant_backend_filename)

    try:
        with open(file_location, "wb+") as file_object:
            file_object.write(await image.read())

        print(f"Saved image to: {file_location}")

        user_info["country"] = country

        return {
            "message": "Files uploaded successfully",
            "country": country,
            "image_name": image.filename,
            "image_size": image.size,
            "image_location": file_location
        }
    except Exception as e:
        return {"message": f"There was an error uploading the file: {e}"}