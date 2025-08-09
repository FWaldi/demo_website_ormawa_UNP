from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from ..database import get_db
from .. import models, schemas, auth

router = APIRouter()

@router.post("/news/", response_model=schemas.News, status_code=status.HTTP_201_CREATED)
async def create_news(
    news: schemas.NewsCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_admin_user)
):
    # Ensure the admin is creating news for their own ORMAWA
    if current_user.ormawa_id is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Superadmin cannot create ORMAWA-specific news directly. Please assign an ORMAWA to the user or use a specific ORMAWA admin account."
        )
    
    # Check if slug already exists for this ORMAWA
    existing_news = db.query(models.News).filter(
        models.News.slug == news.slug,
        models.News.ormawa_id == current_user.ormawa_id
    ).first()
    if existing_news:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="News with this slug already exists for your ORMAWA."
        )

    db_news = models.News(
        **news.model_dump(),
        author_id=current_user.id,
        ormawa_id=current_user.ormawa_id
    )
    db.add(db_news)
    db.commit()
    db.refresh(db_news)
    return db_news

@router.get("/news/", response_model=List[schemas.News])
async def read_news(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_admin_user)
):
    # Admins can only see news from their ORMAWA
    if current_user.role == "admin" and current_user.ormawa_id is not None:
        news = db.query(models.News).filter(models.News.ormawa_id == current_user.ormawa_id).offset(skip).limit(limit).all()
    # Superadmins can see all news
    elif current_user.role == "superadmin":
        news = db.query(models.News).offset(skip).limit(limit).all()
    else:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to view news.")
    return news

@router.get("/news/{news_id}", response_model=schemas.News)
async def read_single_news(
    news_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_admin_user)
):
    news = db.query(models.News).filter(models.News.id == news_id).first()
    if news is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News not found")
    
    # Ensure admin can only access news from their ORMAWA
    if current_user.role == "admin" and current_user.ormawa_id != news.ormawa_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to access this news item.")
    
    return news

@router.put("/news/{news_id}", response_model=schemas.News)
async def update_news(
    news_id: int,
    news: schemas.NewsUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_admin_user)
):
    db_news = db.query(models.News).filter(models.News.id == news_id).first()
    if db_news is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News not found")
    
    # Ensure admin can only update news from their ORMAWA
    if current_user.role == "admin" and current_user.ormawa_id != db_news.ormawa_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update this news item.")
    
    # Prevent changing slug if it already exists for another news item in the same ORMAWA
    if news.slug and news.slug != db_news.slug:
        existing_news_with_slug = db.query(models.News).filter(
            models.News.slug == news.slug,
            models.News.ormawa_id == db_news.ormawa_id,
            models.News.id != news_id
        ).first()
        if existing_news_with_slug:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Another news item with this slug already exists for your ORMAWA."
            )

    for key, value in news.model_dump(exclude_unset=True).items():
        setattr(db_news, key, value)
    
    db.add(db_news)
    db.commit()
    db.refresh(db_news)
    return db_news

@router.delete("/news/{news_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_news(
    news_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_admin_user)
):
    db_news = db.query(models.News).filter(models.News.id == news_id).first()
    if db_news is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="News not found")
    
    # Ensure admin can only delete news from their ORMAWA
    if current_user.role == "admin" and current_user.ormawa_id != db_news.ormawa_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete this news item.")
    
    db.delete(db_news)
    db.commit()
    return {"message": "News deleted successfully"}

# Public endpoints (no authentication required)
@router.get("/public/news/", response_model=List[schemas.News])
async def read_public_news(
    skip: int = 0,
    limit: int = 100,
    ormawa_slug: Optional[str] = None, # Filter by ORMAWA slug
    db: Session = Depends(get_db)
):
    query = db.query(models.News).filter(models.News.published == True)
    if ormawa_slug:
        ormawa = db.query(models.Ormawa).filter(models.Ormawa.slug == ormawa_slug).first()
        if not ormawa:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="ORMAWA not found")
        query = query.filter(models.News.ormawa_id == ormawa.id)
    
    news = query.offset(skip).limit(limit).all()
    return news

@router.get("/public/news/{slug}", response_model=schemas.News)
async def read_public_single_news(
    slug: str,
    db: Session = Depends(get_db)
):
    news = db.query(models.News).filter(models.News.slug == slug, models.News.published == True).first()
    if news is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Published news not found")
    return news
