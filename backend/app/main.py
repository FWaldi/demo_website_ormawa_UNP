
# backend/app/main.py
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import auth, models, schemas, database
from .routers import news, ormawa, events

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Portal ORMAWA UNP API")

# CORS Middleware
app.add_middleware(
   CORSMiddleware,
   allow_origins=["http://localhost:3000"],
   allow_credentials=True,
   allow_methods=["*"],
   allow_headers=["*"],
)

# Include routers
app.include_router(news.router, prefix="/api/v1", tags=["News"])
app.include_router(ormawa.router, prefix="/api/v1", tags=["Ormawa"])
app.include_router(events.router, prefix="/api/v1", tags=["Events"])

@app.post("/api/v1/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
   user = auth.get_user(db, email=form_data.username)
   if not user or not auth.verify_password(form_data.password, user.hashed_password):
       raise HTTPException(
           status_code=status.HTTP_401_UNAUTHORIZED,
           detail="Incorrect email or password",
           headers={"WWW-Authenticate": "Bearer"},
       )
   access_token = auth.create_access_token(
       data={"sub": user.email, "role": user.role, "ormawa_id": user.ormawa_id}
   )
   return {"access_token": access_token, "token_type": "bearer"}

@app.get("/")
def read_root():
   return {"message": "Welcome to ORMAWA UNP API"}
