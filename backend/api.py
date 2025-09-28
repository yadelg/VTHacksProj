from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from detect.detect_ingredient import detect
import MealDB
import os

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://main.d3fj3wnmzrwu96.amplifyapp.com/form"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

meal_db = MealDB.MealDB()
user_info = {"country": "France"}

@app.get("/recipe", tags=["recipes"])
async def get_recipes() -> dict:
    return {"data": meal_db.search_meals_by_region_and_ingredients_api(user_info["country"])}

@app.post("/send_info")
async def upload_info(
    country: str = Form(...),
    image: UploadFile = File(...),
    seasoningImage: UploadFile = File(...)
):
    
    print(f"Received country: {country}")

    UPLOAD_DIR = "uploaded_images"
    os.makedirs(UPLOAD_DIR, exist_ok=True) 

    constant_backend_filename = image.filename
    seasoning_filename = seasoningImage.filename
    file_location = os.path.join(UPLOAD_DIR, constant_backend_filename)
    seasoning_file_location = os.path.join(UPLOAD_DIR, seasoning_filename)

    try:
        with open(file_location, "wb+") as file_object:
            file_object.write(await image.read())
        with open(seasoning_file_location, "wb+") as file_object:
            file_object.write(await seasoningImage.read())

        print(f"Saved image to: {file_location}")

        user_info["country"] = country

        return {
            "message": "Files uploaded successfully",
            "country": country,
            "image_name": image.filename,
            "image_size": image.size,
            "image_location": file_location,
            "seasoning_name": seasoningImage.filename,
            "seasoning_size": seasoningImage.size,
            "seasoning_location": seasoning_file_location
        }
    except Exception as e:
        return {"message": f"There was an error uploading the file: {e}"}