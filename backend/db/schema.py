from pydantic import BaseModel
from datetime import datetime

class User(BaseModel):
    id: int
    name: str
    email: str
    password: str

class Task(BaseModel):
    id: int
    title: str
    description: str
    completed: bool
    user_id: int
    created_at: datetime
    updated_at: datetime

class UserLogin(BaseModel):
    email: str
    password: str

class UserRegister(BaseModel):
    name: str
    email: str
    password: str

class TaskCreated(BaseModel):
    title: str
    description: str
    status: str
    user_id: int
    created_at: datetime
    updated_at: datetime

class TaskUpdated(BaseModel):
    id: int
    status: str
    user_id: int
    updated_at: datetime

class TaskDeleted(BaseModel):
    id: int
    user_id: int

class Task(BaseModel):
    id: int
    title: str
    description: str
    status: str
    user_id: int
    created_at: datetime
    updated_at: datetime

class UserDeleted(BaseModel):
    id: int
    user_id: int




