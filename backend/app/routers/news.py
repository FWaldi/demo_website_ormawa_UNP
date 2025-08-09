
# backend/app/routers/news.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import database, models, schemas, auth

router = APIRouter()

# PUBLIC ENDPOINTS
@router.get("/news", response_model=List[schemas.News])
def get_all_published_news(db: Session = Depends(database.get_db), skip: int = 0, limit: int = 100, tag: str = None, category: str = None, ormawa_slug: str = None):
   query = db.query(models.News).filter(models.News.status == "published")
   if tag:
       query = query.join(models.News.tags).filter(models.Tag.slug == tag)
   if category:
       query = query.filter(models.News.category == category)
   if ormawa_slug:
       query = query.join(models.Ormawa).filter(models.Ormawa.slug == ormawa_slug)
   
   news_items = query.order_by(models.News.published_at.desc()).offset(skip).limit(limit).all()
   return news_items

@router.get("/news/{slug}", response_model=schemas.News)
def get_single_published_news(slug: str, db: Session = Depends(database.get_db)):
   news = db.query(models.News).filter(models.News.slug == slug, models.News.status == "published").first()
   if not news:
       raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News not found")
   return news

@router.get("/tags", response_model=List[schemas.Tag])
def get_all_tags(db: Session = Depends(database.get_db)):
   return db.query(models.Tag).all()

# ADMIN ENDPOINTS
# Further admin endpoints for CRUD operations on news would be added here.
