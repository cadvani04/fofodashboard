from fastapi import FastAPI, Form
import requests
from dotenv import load_dotenv
import os
import psycopg2
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Response, status
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

load_dotenv()
@app.get("/")
def main():
    return {"message": "Hello, World!"}


def get_database_connection():
    connection_params = {
        'dbname': 'railway',
        'user': 'postgres',
        'password': 'vhBWcJJfnjOfwIYwRZkOMyrXFzASXoeG',
        'host': 'yamanote.proxy.rlwy.net',
        'port': '21369'
    }
    return psycopg2.connect(**connection_params)



@app.get("/me")
def getme(uuid: str):
    connection= get_database_connection()
    # Establishing the connection
    # Creating a cursor object]
    cursor = connection.cursor()
    # Print the connection status
    print("Connection established!")
    # Close the cursor and connection
    cursor.execute("SELECT * FROM users WHERE uuid = %s", (uuid,))
    user = cursor.fetchone()
    connection.commit()
    cursor.close()
    connection.close()
    if user:
        user = RedirectResponse(url="/dashboard")
        return {"uuid": user[0], "name": user[1], "email": user[2], "password": user[3], "is_logged_in": user[4]}


    else:
        return {"message": "User not found"}


@app.post("/register")
def register(name: str, email: str, password: str):

    # Establishing the connection
    connection = get_database_connection()

    # Creating a cursor object
    cursor = connection.cursor()
    # Print the connection status
    print("Connection established!")
    # Close the cursor and connection
    cursor.execute("INSERT INTO users (name, email, password, is_logged_in) VALUES (%s, %s, %s, %s)", (name, email, password, False))
    connection.commit()
    cursor.close()
    connection.close() 
    return {"message": "User registered successfully"}

@app.post("/login")
def login(email: str = Form(...), password: str = Form(...)):
    # Establishing the connection
    connection = get_database_connection()

    # Creating a cursor object
    cursor = connection.cursor()
    # Print the connection status
    print("Connection established!")
    # Close the cursor and connection
    cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cursor.fetchone()
    if user:
        #user = RedirectResponse(url="/dashboard")
        cursor.execute("UPDATE users SET is_logged_in = TRUE WHERE uuid = %s", (user[0],))
        connection.commit() 
    cursor.close()
    connection.close()
    if user:
        return {"uuid": user[0], "name": user[1], "email": user[2], "is_logged_in": True}
    else:
        return {"message": "User not found"}

@app.get("/alltasks")
def alltasks(uuid: str):
    connection = get_database_connection()
    cursor = connection.cursor()#creating the connection to the database
    #user = cursor.fetchone()#fetching the user id from the users table
    print(uuid)#printing the user id
    cursor.execute("SELECT * FROM tasks WHERE user_id = %s", (uuid,))#fetching the tasks from the tasks table
    tasks = cursor.fetchall()#fetching the tasks from the tasks table
    cursor.close()
    connection.close()
    return {"message": "All tasks", "tasks": tasks}

@app.post("/logout")
def logout(uuid: str ):
    # Establishing the connection
    connection = get_database_connection()
    # Creating a cursor object
    cursor = connection.cursor()
    # Print the connection status
    cursor.execute("UPDATE users SET is_logged_in=FALSE WHERE uuid = %s", (uuid,))
    # Close the cursor and connection
    connection.commit()
    cursor.close()
    connection.close()
    return {"message": "User logged out successfully"}



