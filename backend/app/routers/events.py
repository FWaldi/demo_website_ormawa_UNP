
# backend/app/routers/events.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import database, models, schemas
from datetime import datetime, timezone

router = APIRouter()

# PUBLIC ENDPOINTS
@router.get("/events", response_model=List[schemas.Event])
def get_all_upcoming_events(db: Session = Depends(database.get_db)):
   now = datetime.now(timezone.utc)
   events = db.query(models.Event).filter(models.Event.start_time >= now).order_by(models.Event.start_time.asc()).all()
   return events
