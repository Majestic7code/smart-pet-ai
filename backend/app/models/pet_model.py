from sqlalchemy import column, Integer, DateTime
from datetime import datetime
from app.database import Base


class PetModel(Base):
    __tablename__ = "pets"

    id = column(Integer, primary_key=True, index=True)
    fome = column(Integer)
    energia = column(Integer)
    humor = column(Integer)
    xp = column(Integer)
    level = column(Integer)
    minutosProdutivos = column(Integer)
    ultimo_update = column(DateTime, default=datetime.utcnow)


