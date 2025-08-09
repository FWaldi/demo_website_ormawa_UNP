from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    role = Column(String, default="user") # e.g., "admin", "superadmin", "user"
    ormawa_id = Column(Integer, ForeignKey("ormawas.id"), nullable=True) # Link to ORMAWA if admin

    ormawa = relationship("Ormawa", back_populates="users")
    news_items = relationship("News", back_populates="author")
    events = relationship("Event", back_populates="creator")

class Ormawa(Base):
    __tablename__ = "ormawas"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    slug = Column(String, unique=True, index=True)
    description = Column(Text)
    logo_url = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

    users = relationship("User", back_populates="ormawa")
    news_items = relationship("News", back_populates="ormawa")
    events = relationship("Event", back_populates="ormawa")

class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    excerpt = Column(Text)
    content = Column(Text)
    image_url = Column(String, nullable=True)
    published = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    author_id = Column(Integer, ForeignKey("users.id"))
    ormawa_id = Column(Integer, ForeignKey("ormawas.id"))

    author = relationship("User", back_populates="news_items")
    ormawa = relationship("Ormawa", back_populates="news_items")

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    description = Column(Text)
    location = Column(String)
    event_date = Column(DateTime)
    image_url = Column(String, nullable=True)
    published = Column(Boolean, default=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

    creator_id = Column(Integer, ForeignKey("users.id"))
    ormawa_id = Column(Integer, ForeignKey("ormawas.id"))

    creator = relationship("User", back_populates="events")
    ormawa = relationship("Ormawa", back_populates="events")
