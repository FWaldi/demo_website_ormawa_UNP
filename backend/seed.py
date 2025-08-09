
# backend/seed.py
import random
from faker import Faker
from sqlalchemy.orm import Session
from app import models, schemas, auth, database
from datetime import datetime, timedelta

fake = Faker('id_ID')

def generate_placeholder_color():
   return f"hsl({random.randint(0, 360)}, {random.randint(40, 60)}%, {random.randint(70, 80)}%)"

def create_ormawa(db: Session, name: str, slug: str, description: str, contact_email: str):
   ormawa = models.Ormawa(
       name=name,
       slug=slug,
       description=description,
       logo_placeholder_color=generate_placeholder_color(),
       contact_email=contact_email,
       about_content=fake.paragraph(nb_sentences=10),
       history=fake.paragraph(nb_sentences=15),
       vision=fake.paragraph(nb_sentences=3),
       mission=fake.paragraph(nb_sentences=5),
   )
   db.add(ormawa)
   db.commit()
   db.refresh(ormawa)
   return ormawa

def create_user(db: Session, email: str, password: str, role: str, ormawa_id: int):
   user = models.User(
       email=email,
       hashed_password=auth.get_password_hash(password),
       role=role,
       ormawa_id=ormawa_id
   )
   db.add(user)
   db.commit()
   db.refresh(user)
   return user

def create_tags(db: Session):
   tag_names = ["Seminar", "Kompetisi", "Olahraga", "Seni", "Teknologi", "Pengabdian", "Sosial", "Akademik", "Workshop", "Webinar"]
   tags = []
   for name in tag_names:
       slug = name.lower().replace(" & ", "-").replace(" ", "-")
       tag = db.query(models.Tag).filter(models.Tag.slug == slug).first()
       if not tag:
           tag = models.Tag(name=name, slug=slug)
           db.add(tag)
           db.commit()
           db.refresh(tag)
       tags.append(tag)
   return tags

def create_news(db: Session, ormawa: models.Ormawa, author: models.User, tags: list, count: int):
   for i in range(count):
       category = random.choice(["Berita", "Laporan Kegiatan", "Galeri Foto", "Pengumuman"])
       title = f"{category}: {fake.sentence(nb_words=6)} oleh {ormawa.name}"
       slug = f"{ormawa.slug}-{category.lower().replace(' ', '-')}-{i+1}-{fake.uuid4().split('-')[0]}"
       published_date = datetime.now() - timedelta(days=random.randint(1, 365))
       
       news = models.News(
           title=title,
           slug=slug,
           excerpt=fake.paragraph(nb_sentences=3),
           content=fake.paragraph(nb_sentences=20),
           image_placeholder_color=generate_placeholder_color(),
           status="published",
           category=category,
           published_at=published_date,
           author_id=author.id,
           ormawa_id=ormawa.id,
           tags=random.sample(tags, k=random.randint(1, 3))
       )
       db.add(news)
       
       # Create a corresponding event for some news items
       if random.random() > 0.5:
           start_time = datetime.now() + timedelta(days=random.randint(-30, 30), hours=random.randint(1, 5))
           event = models.Event(
               title=f"Acara: {news.title}",
               description=news.excerpt,
               location=fake.address(),
               start_time=start_time,
               end_time=start_time + timedelta(hours=random.randint(1, 4)),
               ormawa_id=ormawa.id,
               creator_id=author.id
           )
           db.add(event)

   db.commit()

def create_members(db: Session, ormawa: models.Ormawa, count: int):
   positions = ["Ketua", "Wakil Ketua", "Sekretaris", "Bendahara", "Kepala Divisi", "Anggota"]
   for i in range(count):
       member = models.Member(
           name=fake.name(),
           nim=f"200110{random.randint(100,999)}",
           position=random.choice(positions),
           tenure="2024-2025",
           photo_placeholder_color=generate_placeholder_color(),
           ormawa_id=ormawa.id
       )
       db.add(member)
   db.commit()

def main():
   db = next(database.get_db())
   
   # Create Superadmin
   superadmin_email = "superadmin@unp.ac.id"
   if not db.query(models.User).filter(models.User.email == superadmin_email).first():
       create_user(db, email=superadmin_email, password="password", role="superadmin", ormawa_id=None)
       print("Superadmin created.")

   # Create Tags
   tags = create_tags(db)
   print(f"{len(tags)} tags created/verified.")

   # Create Ormawa, Admins, News, and Members
   ormawa_list = [
       {"name": "Badan Eksekutif Mahasiswa (BEM)", "slug": "bem", "desc": "Organisasi mahasiswa tertinggi di tingkat universitas."},
       {"name": "Dewan Perwakilan Mahasiswa (DPM)", "slug": "dpm", "desc": "Lembaga legislatif mahasiswa yang mengawasi BEM."},
       {"name": "Himpunan Mahasiswa Jurusan (HMJ) Teknik Elektro", "slug": "hmj-elektro", "desc": "Wadah aspirasi mahasiswa Teknik Elektro."},
       {"name": "Unit Kegiatan Mahasiswa (UKM) Pramuka", "slug": "ukm-pramuka", "desc": "Mengembangkan kepanduan dan karakter."},
       {"name": "UKM Seni dan Budaya", "slug": "ukm-seni", "desc": "Mewadahi minat dan bakat di bidang seni."},
       {"name": "UKM Olahraga", "slug": "ukm-olahraga", "desc": "Mengembangkan potensi mahasiswa di bidang olahraga."},
       {"name": "UKM Jurnalistik", "slug": "ukm-jurnalistik", "desc": "Melatih kemampuan jurnalistik dan publikasi."},
       {"name": "UKM Penalaran dan Kreativitas", "slug": "ukm-pk", "desc": "Mendorong inovasi dan penelitian mahasiswa."},
       {"name": "UKM Kerohanian Islam", "slug": "ukm-islam", "desc": "Membina keimanan dan ketakwaan mahasiswa."},
       {"name": "UKM Koperasi Mahasiswa", "slug": "ukm-kopma", "desc": "Mengembangkan jiwa kewirausahaan mahasiswa."},
   ]

   for o_data in ormawa_list:
       if not db.query(models.Ormawa).filter(models.Ormawa.slug == o_data["slug"]).first():
           ormawa = create_ormawa(db, name=o_data["name"], slug=o_data["slug"], description=o_data["desc"], contact_email=f"kontak@{o_data['slug']}.unp.ac.id")
           admin_user = create_user(db, email=f"admin@{o_data['slug']}.unp.ac.id", password="password", role="admin", ormawa_id=ormawa.id)
           create_news(db, ormawa=ormawa, author=admin_user, tags=tags, count=10)
           create_members(db, ormawa=ormawa, count=15)
           print(f"Created data for {ormawa.name}")
       else:
           print(f"Data for {o_data['name']} already exists.")

   db.close()

if __name__ == "__main__":
   print("Seeding database...")
   main()
   print("Database seeding complete.")
