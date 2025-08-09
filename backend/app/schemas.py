
# backend/app/schemas.py
from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, List
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
   email: EmailStr

class UserCreate(UserBase):
   password: str
   role: str = "admin"
   ormawa_id: Optional[int] = None

class User(UserBase):
   id: int
   is_active: bool
   role: str
   ormawa_id: Optional[int] = None
   model_config = ConfigDict(from_attributes=True)

# Token Schemas
class Token(BaseModel):
   access_token: str
   token_type: str

class TokenData(BaseModel):
   email: Optional[str] = None

# Tag Schemas
class TagBase(BaseModel):
   name: str
   slug: str

class TagCreate(TagBase):
   pass

class Tag(TagBase):
   id: int
   model_config = ConfigDict(from_attributes=True)

# News Schemas
class NewsBase(BaseModel):
   title: str
   excerpt: Optional[str] = None
   content: str
   image_placeholder_color: str
   status: str = "draft"
   category: str = "Berita"
   
class NewsCreate(NewsBase):
   slug: str
   tag_ids: Optional[List[int]] = []

class NewsUpdate(NewsBase):
   title: Optional[str] = None
   excerpt: Optional[str] = None
   content: Optional[str] = None
   image_placeholder_color: Optional[str] = None
   status: Optional[str] = None
   category: Optional[str] = None
   tag_ids: Optional[List[int]] = []

class News(NewsBase):
   id: int
   slug: str
   published_at: Optional[datetime] = None
   created_at: datetime
   updated_at: Optional[datetime] = None
   author_id: int
   ormawa_id: int
   tags: List[Tag] = []
   model_config = ConfigDict(from_attributes=True)

# Member Schemas
class MemberBase(BaseModel):
   name: str
   nim: Optional[str] = None
   position: str
   tenure: Optional[str] = None
   photo_placeholder_color: str
   bio: Optional[str] = None
   hierarchy_level: int = 3

class MemberCreate(MemberBase):
   pass

class MemberUpdate(MemberBase):
   name: Optional[str] = None
   position: Optional[str] = None
   photo_placeholder_color: Optional[str] = None
   hierarchy_level: Optional[int] = None

class Member(MemberBase):
   id: int
   ormawa_id: int
   model_config = ConfigDict(from_attributes=True)

# Ormawa Schemas
class OrmawaBase(BaseModel):
   name: str
   description: Optional[str] = None
   logo_placeholder_color: str
   profile_video_url: Optional[str] = None
   about_content: Optional[str] = None
   history: Optional[str] = None
   vision: Optional[str] = None
   mission: Optional[str] = None
   contact_email: Optional[str] = None

class OrmawaCreate(OrmawaBase):
   slug: str

class OrmawaUpdate(OrmawaBase):
   name: Optional[str] = None
   logo_placeholder_color: Optional[str] = None

class Ormawa(OrmawaBase):
   id: int
   slug: str
   created_at: datetime
   updated_at: Optional[datetime] = None
   members: List[Member] = []
   news_items: List[News] = []
   model_config = ConfigDict(from_attributes=True)

# Event Schemas
class EventBase(BaseModel):
   title: str
   description: Optional[str] = None
   location: Optional[str] = None
   start_time: datetime
   end_time: datetime
   related_news_id: Optional[int] = None

class EventCreate(EventBase):
   pass

class EventUpdate(EventBase):
   title: Optional[str] = None
   start_time: Optional[datetime] = None
   end_time: Optional[datetime] = None

class Event(EventBase):
   id: int
   ormawa_id: int
   ormawa: Ormawa  # To include ormawa details
   model_config = ConfigDict(from_attributes=True)
