from sqlalchemy import Column, Integer, DateTime, Boolean
from datetime import datetime
from app.database import Base


class PetModel(Base):
    __tablename__ = "pets"

    id = Column(Integer, primary_key=True, index=True)

    vivo = Column(Boolean, default=True)

    fome = Column(Integer, default=100)
    energia = Column(Integer, default=100)
    humor = Column(Integer, default=100)

    xp = Column(Integer, default=0)
    level = Column(Integer, default=1)
    minutosProdutivos = Column(Integer, default=0)

    ultimo_update = Column(DateTime, default=datetime.utcnow)


