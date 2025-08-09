from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import Base, engine, get_db
from backend import models, schemas, auth
from backend.routers import news, ormawa # Import the new routers

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",  # Allow your Next.js frontend
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Hello from FastAPI backend!"}

# Endpoint to create initial data (for development/testing)
@app.post("/create-initial-data/")
async def create_initial_data(db: Session = Depends(get_db)):
    # Create a super admin user
    super_admin_email = "superadmin@example.com"
    if not db.query(models.User).filter(models.User.email == super_admin_email).first():
        hashed_password = auth.get_password_hash("supersecretpassword")
        super_admin = models.User(
            email=super_admin_email,
            hashed_password=hashed_password,
            role="superadmin"
        )
        db.add(super_admin)
        db.commit()
        db.refresh(super_admin)
        print(f"Super admin '{super_admin_email}' created.")

    # Create some ORMAWA entries
    ormawa_data = [
        {"name": "Himpunan Mahasiswa Teknik Informatika", "slug": "himatif", "description": "Organisasi mahasiswa untuk mahasiswa Teknik Informatika.", "logo_url": "/placeholder-ormawa.png"},
        {"name": "Badan Eksekutif Mahasiswa", "slug": "bem", "description": "Organisasi eksekutif tertinggi di tingkat universitas.", "logo_url": "/placeholder-ormawa.png"},
        {"name": "Unit Kegiatan Mahasiswa Seni", "slug": "ukm-seni", "description": "Wadah bagi mahasiswa yang memiliki minat di bidang seni.", "logo_url": "/placeholder-ormawa.png"},
    ]

    for data in ormawa_data:
        if not db.query(models.Ormawa).filter(models.Ormawa.slug == data["slug"]).first():
            ormawa = models.Ormawa(**data)
            db.add(ormawa)
            db.commit()
            db.refresh(ormawa)
            print(f"ORMAWA '{data['name']}' created.")
            
            # Create an admin user for this ORMAWA
            admin_email = f"admin_{data['slug']}@example.com"
            if not db.query(models.User).filter(models.User.email == admin_email).first():
                hashed_password = auth.get_password_hash("password123")
                ormawa_admin = models.User(
                    email=admin_email,
                    hashed_password=hashed_password,
                    role="admin",
                    ormawa_id=ormawa.id
                )
                db.add(ormawa_admin)
                db.commit()
                db.refresh(ormawa_admin)
                print(f"Admin '{admin_email}' for ORMAWA '{data['name']}' created.")

    return {"message": "Initial data created/checked."}

# Include authentication routes
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])

# Include admin API routes
app.include_router(news.router, prefix="/api/admin", tags=["admin-news"])
app.include_router(ormawa.router, prefix="/api/admin", tags=["admin-ormawa"])

# Include public API routes
app.include_router(news.router, prefix="/api", tags=["public-news"])
app.include_router(ormawa.router, prefix="/api", tags=["public-ormawa"])
