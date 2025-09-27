from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

user_info = {
    "country" : "USA",
    "image": "bruh.jpg"
}

recipes = [
    {
        "recipe_name": "Eggs",
        "origin": "USA",
        "ingredients": ["salt"]
    },
    {
        "recipe_name": "Fries",
        "origin": "France",
        "ingredients": ["salt", "potatoes"]
    }
]

@app.get("/recipe", tags=["recipes"])
async def get_recipes() -> dict:
    return { "data": recipes }

@app.post("/send_info")
async def upload_info(
    country: str = Form(...),
    image: UploadFile = File(...)
):
    
    print(f"Received country: {country}")

    UPLOAD_DIR = "uploaded_images"
    os.makedirs(UPLOAD_DIR, exist_ok=True) 

    file_extension = image.filename.split('.')[-1] if '.' in image.filename else 'bin'
    file_location = os.path.join(UPLOAD_DIR, f"fridge_image_{country}_{image.filename}")

    try:
        with open(file_location, "wb+") as file_object:
            file_object.write(await image.read())

        print(f"Saved image to: {file_location}")

        return {
            "message": "Files uploaded successfully",
            "country": country,
            "image_name": image.filename,
            "image_size": image.size,
            "image_location": file_location
        }
    except Exception as e:
        return {"message": f"There was an error uploading the file: {e}"}