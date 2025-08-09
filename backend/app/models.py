
# backend/app/models.py
from sqlalchemy import (
    Boolean, Column, ForeignKey, Integer, String, Text, DateTime, Table
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

# Association Table for Many-to-Many relationship between News and Tags
news_tag_association = Table(
    'news_tag_association',
    Base.metadata,
    Column('news_id', Integer, ForeignKey('news.id'), primary_key=True),
    Column('tag_id', Integer, ForeignKey('tags.id'), primary_key=True)
)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    role = Column(String, default="admin")  # admin, superadmin
    ormawa_id = Column(Integer, ForeignKey("ormawas.id"), nullable=True)
    
    ormawa = relationship("Ormawa", back_populates="admins")
    news_items = relationship("News", back_populates="author")
    events_created = relationship("Event", back_populates="creator")

class Ormawa(Base):
    __tablename__ = "ormawas"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    logo_placeholder_color = Column(String, nullable=False)
    
    # Profile Page Details
    profile_video_url = Column(String, nullable=True)
    
    # About Page Details
    about_content = Column(Text, nullable=True)
    history = Column(Text, nullable=True)
    vision = Column(Text, nullable=True)
    mission = Column(Text, nullable=True)
    
    # Contact Details
    contact_email = Column(String, nullable=True)
    
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    admins = relationship("User", back_populates="ormawa")
    members = relationship("Member", back_populates="ormawa")
    news_items = relationship("News", back_populates="ormawa")
    events = relationship("Event", back_populates="ormawa")

class Member(Base):
    __tablename__ = "members"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    nim = Column(String, unique=True, nullable=True)
    position = Column(String, nullable=False)
    tenure = Column(String, nullable=True) # e.g., "2023-2024"
    photo_placeholder_color = Column(String, nullable=False)
    bio = Column(Text, nullable=True)
    hierarchy_level = Column(Integer, default=3) # 1: DPH, 2: Bidang, 3: Anggota
    ormawa_id = Column(Integer, ForeignKey("ormawas.id"), nullable=False)
    
    ormawa = relationship("Ormawa", back_populates="members")

class News(Base):
    __tablename__ = "news"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    excerpt = Column(Text, nullable=True)
    content = Column(Text, nullable=False)
    image_placeholder_color = Column(String, nullable=False)
    status = Column(String, default="draft") # draft, published
    category = Column(String, default="Berita") # Berita, Laporan Kegiatan, Galeri Foto, Pengumuman
    published_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    
    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    ormawa_id = Column(Integer, ForeignKey("ormawas.id"), nullable=False)
    
    author = relationship("User", back_populates="news_items")
    ormawa = relationship("Ormawa", back_populates="news_items")
    tags = relationship("Tag", secondary=news_tag_association, back_populates="news_items")

class Tag(Base):
    __tablename__ = "tags"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    
    news_items = relationship("News", secondary=news_tag_association, back_populates="tags")

class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=True)
    location = Column(String, nullable=True)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    
    # Link to a news article for more details
    related_news_id = Column(Integer, ForeignKey("news.id"), nullable=True)
    
    ormawa_id = Column(Integer, ForeignKey("ormawas.id"), nullable=False)
    creator_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    ormawa = relationship("Ormawa", back_populates="events")
    creator = relationship("User", back_populates="events_created")
