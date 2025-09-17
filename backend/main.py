from fastapi import FastAPI
import requests
from dotenv import load_dotenv
import os
import psycopg2
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta

app = FastAPI()

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
def login(email: str, password: str):
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
        cursor.execute("UPDATE users SET is_logged_in = TRUE WHERE uuid = %s", (user[0],))
        connection.commit() 
    cursor.close()
    connection.close()
    if user:
        return {"uuid": user[0], "name": user[1], "email": user[2], "is_logged_in": True}
    else:
        return {"message": "User not found"}


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



