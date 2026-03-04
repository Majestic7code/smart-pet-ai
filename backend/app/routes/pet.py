from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.pet_services import ( 
    get_pet,
    alimentar_pet,
    dormir_pet,
    brincar_pet, 
    trabalhar_pet,
)

router = APIRouter()
 
@router.get('/pet')
def obter_pet(db: Session = Depends(get_db)):
    return get_pet(db)

@router.post('/alimentar')
def alimentar(db: Session = Depends(get_db)): 
    return alimentar_pet(db)

@router.post('/dormir')
def alimentar(db: Session = Depends(get_db)): 
    return dormir_pet(db)
    
@router.post('/brincar')
def brincar(db: Session = Depends(get_db)):
    return brincar_pet(db)

@router.post('/trabalhar')
def trabalhar(db: Session = Depends(get_db)):
    return trabalhar_pet(db)
