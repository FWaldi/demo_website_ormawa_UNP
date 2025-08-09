from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str
    role: Optional[str] = "user"
    ormawa_id: Optional[int] = None

class UserInDB(UserBase):
    id: int
    is_active: bool
    role: str
    ormawa_id: Optional[int] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class OrmawaBase(BaseModel):
    name: str
    description: str
    logo_url: Optional[str] = None

class OrmawaCreate(OrmawaBase):
    slug: str

class OrmawaUpdate(OrmawaBase):
    pass

class Ormawa(OrmawaBase):
    id: int
    slug: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class NewsBase(BaseModel):
    title: str
    excerpt: str
    content: str
    image_url: Optional[str] = None
    published: Optional[bool] = False

class NewsCreate(NewsBase):
    slug: str

class NewsUpdate(NewsBase):
    pass

class News(NewsBase):
    id: int
    slug: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    author_id: int
    ormawa_id: int

    class Config:
        from_attributes = True

class EventBase(BaseModel):
    title: str
    description: str
    location: str
    event_date: datetime
    image_url: Optional[str] = None
    published: Optional[bool] = False

class EventCreate(EventBase):
    slug: str

class EventUpdate(EventBase):
    pass

class Event(EventBase):
    id: int
    slug: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    creator_id: int
    ormawa_id: int

    class Config:
        from_attributes = True
