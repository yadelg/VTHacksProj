from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


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

recipe_data = [
    {
        "recipe_name": "Eggs",
        "origin": "USA",
        "ingredients": ["salt"]
    },
    {
        "recipe_name": "Fries",
        "origin": "France",
        "ingredients": ["salt, potatoes"]
    }
]

@app.get("/recipe", tags=["recipes"])
async def get_recipes() -> dict:
    return { "data": recipe_data }