from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from .. import models, schemas, auth

router = APIRouter()

# Admin can get their own ORMAWA profile
@router.get("/profile/", response_model=schemas.Ormawa)
async def read_ormawa_profile(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_admin_user)
):
    if current_user.ormawa_id is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User is not associated with an ORMAWA profile."
        )
    
    ormawa = db.query(models.Ormawa).filter(models.Ormawa.id == current_user.ormawa_id).first()
    if ormawa is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="ORMAWA profile not found.")
    
    return ormawa

# Admin can update their own ORMAWA profile
@router.put("/profile/", response_model=schemas.Ormawa)
async def update_ormawa_profile(
    ormawa_update: schemas.OrmawaUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_admin_user)
):
    if current_user.ormawa_id is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User is not associated with an ORMAWA profile to update."
        )
    
    db_ormawa = db.query(models.Ormawa).filter(models.Ormawa.id == current_user.ormawa_id).first()
    if db_ormawa is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="ORMAWA profile not found.")
    
    for key, value in ormawa_update.model_dump(exclude_unset=True).items():
        setattr(db_ormawa, key, value)
    
    db.add(db_ormawa)
    db.commit()
    db.refresh(db_ormawa)
    return db_ormawa

# Superadmin can get any ORMAWA profile by ID or slug
@router.get("/ormawas/{ormawa_identifier}", response_model=schemas.Ormawa)
async def read_single_ormawa(
    ormawa_identifier: str, # Can be ID or slug
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_superadmin_user)
):
    # Try to convert to int for ID lookup
    try:
        ormawa_id = int(ormawa_identifier)
        ormawa = db.query(models.Ormawa).filter(models.Ormawa.id == ormawa_id).first()
    except ValueError:
        # If not an int, assume it's a slug
        ormawa = db.query(models.Ormawa).filter(models.Ormawa.slug == ormawa_identifier).first()

    if ormawa is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="ORMAWA not found")
    
    return ormawa

# Superadmin can create new ORMAWA (optional, for initial setup)
@router.post("/ormawas/", response_model=schemas.Ormawa, status_code=status.HTTP_201_CREATED)
async def create_ormawa(
    ormawa: schemas.OrmawaCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_superadmin_user)
):
    db_ormawa = db.query(models.Ormawa).filter(models.Ormawa.slug == ormawa.slug).first()
    if db_ormawa:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="ORMAWA with this slug already exists")
    
    db_ormawa = models.Ormawa(**ormawa.model_dump())
    db.add(db_ormawa)
    db.commit()
    db.refresh(db_ormawa)
    return db_ormawa

# Superadmin can update any ORMAWA
@router.put("/ormawas/{ormawa_id}", response_model=schemas.Ormawa)
async def update_any_ormawa(
    ormawa_id: int,
    ormawa_update: schemas.OrmawaUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_superadmin_user)
):
    db_ormawa = db.query(models.Ormawa).filter(models.Ormawa.id == ormawa_id).first()
    if db_ormawa is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="ORMAWA not found")
    
    for key, value in ormawa_update.model_dump(exclude_unset=True).items():
        setattr(db_ormawa, key, value)
    
    db.add(db_ormawa)
    db.commit()
    db.refresh(db_ormawa)
    return db_ormawa

# Superadmin can delete any ORMAWA
@router.delete("/ormawas/{ormawa_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_ormawa(
    ormawa_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_superadmin_user)
):
    db_ormawa = db.query(models.Ormawa).filter(models.Ormawa.id == ormawa_id).first()
    if db_ormawa is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="ORMAWA not found")
    
    db.delete(db_ormawa)
    db.commit()
    return {"message": "ORMAWA deleted successfully"}

# Public endpoint to get all ORMAWA (for directory)
@router.get("/public/ormawas/", response_model=List[schemas.Ormawa])
async def read_public_ormawas(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    ormawas = db.query(models.Ormawa).offset(skip).limit(limit).all()
    return ormawas

# Public endpoint to get single ORMAWA by slug
@router.get("/public/ormawas/{slug}", response_model=schemas.Ormawa)
async def read_public_single_ormawa(
    slug: str,
    db: Session = Depends(get_db)
):
    ormawa = db.query(models.Ormawa).filter(models.Ormawa.slug == slug).first()
    if ormawa is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="ORMAWA not found")
    return ormawa
