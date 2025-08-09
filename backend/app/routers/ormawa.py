
# backend/app/routers/ormawa.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import database, models, schemas

router = APIRouter()

# PUBLIC ENDPOINTS
@router.get("/ormawa", response_model=List[schemas.Ormawa])
def get_all_ormawa(db: Session = Depends(database.get_db)):
   return db.query(models.Ormawa).all()

@router.get("/ormawa/{slug}", response_model=schemas.Ormawa)
def get_single_ormawa(slug: str, db: Session = Depends(database.get_db)):
   ormawa = db.query(models.Ormawa).filter(models.Ormawa.slug == slug).first()
   if not ormawa:
       raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ormawa not found")
   return ormawa
