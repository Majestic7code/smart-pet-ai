from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.main import pet_manager
from ..schemas.pet_schema import Pet
from app.models.pet_model import PetModel
from app.services.pet_services import ( 
    alimentar_pet, 
    brincar_pet, 
    trabalhar_pet,
    aplicar_degradacao
)

router = APIRouter()
 
#pet_estado = None

@router.get('/pet')
def obter_pet():
    #global pet_estado
    pet = pet_manager.obter()
    if pet is None:
        return {"message": "Nenhum pet salvo ainda."}
    
    pet = aplicar_degradacao(pet)
    pet_manager.atualizar(pet)

    return pet

@router.post('/pet')
def salvar_pet(pet: Pet, db: Session = Depends(get_db)):
    #global pet_estado

    novo_pet = PetModel(
        fome=pet.fome,
        energia=pet.energia,
        humor=pet.humor,
        xp=pet.xp,
        level=pet.level,
        minutosProdutivos=pet.minutosProdutivos
        )
    
    db.add(novo_pet)
    db.commit()
    db.refresh(novo_pet)
    pet_manager.salvar(novo_pet)

    return novo_pet

@router.post('/alimentar')
def alimentar():
    #global pet_estado
    pet = pet_manager.obter()

    if pet is None:
        return {"mensage": "Nenhum pet criado."}
    
    pet = aplicar_degradacao(pet)
    pet = alimentar_pet(pet)
    
    pet_manager.atualizar(pet)

    return pet
    
@router.post('/brincar')
def brincar():
    #global pet_estado
    pet = pet_manager.obter()
    if pet is None:
        return {"mensage": "Nenhum pet criado. "}
    
    pet = aplicar_degradacao(pet)
    pet = brincar_pet(pet)

    pet_manager.atualizar(pet)

    return pet

@router.post('/trabalhar')
def trabalhar():
    #global pet_estado
    pet = pet_manager.obter()
    
    if pet is None:
        return {"mensage": "Nenhum pet criado."}
    
    pet = aplicar_degradacao(pet)
    pet = trabalhar_pet(pet)

    pet_manager.atualizar(pet)

    return pet
