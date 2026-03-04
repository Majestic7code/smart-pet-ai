from datetime import datetime
from sqlalchemy.orm import Session
from app.models.pet_model import PetModel

def get_pet(db: Session):
    pet = db.query(PetModel).first()

    if not pet:
        pet = PetModel()
        db.add(pet)
        db.commit()
        db.refresh(pet)
    
    aplicar_degradacao(pet)

    db.commit()
    db.refresh(pet)

    return pet 

def aplicar_degradacao(pet):
    agora = datetime.utcnow()
    minutos_passados = (agora - pet.ultimo_update).total_seconds() / 20

    if minutos_passados < 1:
        return pet 
    
    if pet.fome == 0 or pet.energia == 0 or pet.humor == 0:
        pet.vivo = False
    
    perda = int(minutos_passados)

    pet.fome = max(0, pet.fome - perda * 5)
    pet.energia = max(0, pet.energia - perda * 7)
    pet.humor = max(0, pet.humor - perda * 6)

    pet.ultimo_update = agora

    return pet


def alimentar_pet(db: Session):
    pet = get_pet(db)
    aplicar_degradacao(pet)

    pet.fome = min(100, pet.fome + 10)

    if not pet.vivo:
        return pet

    db.commit()
    db.refresh(pet)

    return pet

def dormir_pet(db: Session):
    pet = get_pet(db)
    aplicar_degradacao(pet)

    pet.energia = min(100, pet.energia + 5)
    pet.fome = max(0, pet.fome - 3)

    if not pet.vivo:
        return pet

    db.commit()
    db.refresh(pet)

    return pet

def brincar_pet(db: Session):
    pet = get_pet(db)
    aplicar_degradacao(pet)

    if not pet.vivo:
        return pet 

    pet.humor = min(100, pet.humor + 10)
    pet.energia = max(0, pet.energia - 5)

    db.commit()
    db.refresh(pet)

    return pet

def trabalhar_pet(db: Session, minutos: int = 25):
    pet = get_pet(db)

    if not pet.vivo:
        return pet 
    
    aplicar_degradacao(pet)

    pet.xp += minutos
    pet.minutosProdutivo += minutos
    pet.energia = max(0, pet.energia - 10)
    pet.humor = max(0, pet.humor - 3)

    db.commit()
    db.refresh(pet)
    
    return pet 

