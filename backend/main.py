from fastapi import FastAPI
import requests
from dotenv import load_dotenv
import os

app = FastAPI()

load_dotenv()
@app.get("/")
def main():
    return {"message": "Hello, World!"}

@app.post("/register")
def register(name: str, email: str, password: str):
    response = requests.post(url=os.getenv("database_url"), json={"name": name, "email": email, "password": password})
    return response.json()


