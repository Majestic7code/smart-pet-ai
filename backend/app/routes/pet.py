from fastapi import APIRouter
from ..schemas.pet_schema import Pet
from app.models.pet_model import petModel
from app.services.pet_services import ( 
    alimentar_pet, 
    brincar_pet, 
    trabalhar_pet,
    aplicar_degradacao
)

router = APIRouter()

pet_estado = None

@router.get('/pet')
def obter_pet():
    global pet_estado
    if pet_estado is None:
        return {"message": "Nenhum pet salvo ainda."}
    
    pet_estado = aplicar_degradacao(pet_estado)

    return pet_estado

@router.post('/pet')
def salvar_pet(pet: Pet):
    global pet_estado

    pet_estado = petModel(
        fome=pet.fome
        energia=pet.energia
        humor=pet.hum  
    )


    return {"mensage": "Pet salvo com sucesso!"}

@router.post('/alimentar')
def alimentar():
    global pet_estado
    
    if pet_estado is None:
        return {"mensage": "Nenhum pet criado."}
    
    pet_estado = aplicar_degradacao(pet_estado)
    pet_estado = alimentar_pet(pet_estado)

    return pet_estado
    
@router.post('/brincar')
def brincar():
    global pet_estado
    
    if pet_estado is None:
        return {"mensage": "Nenhum pet criado. "}
    
    pet_estado = aplicar_degradacao(pet_estado)
    pet_estado = brincar_pet(pet_estado)

    return pet_estado

@router.post('/trabalhar')
def trabalhar():
    global pet_estado
    
    if pet_estado is None:
        return {"mensage": "Nenhum pet criado."}
    
    pet_estado = aplicar_degradacao(pet_estado)
    pet_estado = trabalhar_pet(pet_estado)

    return pet_estado
