from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from detect.detect_ingredient import detect
import MealDB
import os
from mangum import Mangum  # <- Add this

app = FastAPI()

# CORS for frontend
origins = [
    "http://localhost:5173",         # dev
    "https://<your-amplify-domain>"  # prod
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
    image: UploadFile = File(...)
):
    UPLOAD_DIR = "/tmp/uploaded_images"  # Lambda uses /tmp for writable storage
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    file_location = os.path.join(UPLOAD_DIR, image.filename)
    try:
        with open(file_location, "wb+") as file_object:
            file_object.write(await image.read())

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

# Lambda handler
handler = Mangum(app)
