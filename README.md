# Global Eats

We got Food at Home.

## Inspiration
Young adults and adolescents often struggle to decide what to eat. Additionally, eating out can be expensive sometimes; that’s why we decided to make Global Eats. We hope that you get to taste the flavors of different cuisines, experience the fun of learning about various cultures, and practice being frugal when it comes to food. Without someone in your life who loves to cook, it can be difficult learning on your own, that’s why Global Eats is here to help!

## What it does
Global Eats takes an image of your fridge/pantry and spices and helps you find recipes related to a country of your choice. Using the image uploaded to our web app, it finds the top 6 recipes from the selected country containing ingredients you already have. The user can also scroll through the page to see any missing ingredients they may need to buy, along with additional information on how to create the recipe. 

## How we built it
We used MongoDB for our database which we hosted on AWS along with recipes from themealdb.com/. In the frontend of Global Eats, built on React, TypeScript, HTML, CSS, and Javascript, the user is prompted for an image, which is then processed using YOLOv8 (You Only Look Once), a deep learning computer vision architecture developed by Ultralytics. YOLOv8 parsed, boxed, and split the user’s photo into separate ingredient images, were sent to our image classification model. Using TensorFlow and Keras, our classification model works with Convolutional Neural Network (CNNs) to determine the ingredients in each photo. Alongside our image classifier, we cross-compared the ingredient predictions to Google Gemini, measuring for accuracy and hallucinations. After determining the ingredients, they are sent to our database, which searches and aggregates recipes based on similarity. Lastly, the top 6 recipes are sent to the frontend using FastAPI to handle requests and endpoints.

## Challenges we ran into
We tackled many issues over the past 36 hours developing Global Eats. From working with and learning new technologies such as YOLOv8, to attempting to use vectorization for multi-label image processing or even using our newfound skills in AWS, we resolved many conflicts and bugs when taking on this project. Our greatest challenge and happiest moment was figuring out how we can create and train our own image classification model while having it work simultaneously with Gemini, resulting in a unique program we’ve never made before.

## Accomplishments that we're proud of
Through a shared passion for problem-solving and code, we were able to produce a web app with real-world benefits and the ability to improve peoples’ day-to-day experiences when it comes to making food. Despite the learning curve and facing difficult, unfamiliar challenges, we’re proud to have integrated technologies that tested our skills as developers across multiple domains. In the small time frame available, we transformed an idea into ‘Global Eats’, which we are proud to share at VTHacks.

## What we learned
From data scraping and aggregating in MongoDB to working with YOLOv8 and TensorFlow for image classification, we were able to implement frameworks and technologies to create a unique program which promotes food, culture, and diversity. We also learned about the importance of UI and the user experience, and how to have seamless communication between backend and frontend using tools and languages such as React, TypeScript, Gemini, and FastAPI.

## What's next for GlobalEats
In the future, Global Eats looks towards being hosted on an online, public platform free to open use. We look forward to implementing new features such as transition animations between pages and more interactive features. Furthermore, we look to improve our existing features, such as our model’s accuracy and training data.
