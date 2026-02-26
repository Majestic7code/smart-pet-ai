from fastapi import APIRouter
from .schemas import Pet

router = APIRouter()

pet_estado = None

@router.post("/pet")
def salvar_pet(pet: Pet):
    global pet_estado
    pet_estado = pet
    return {"mensage:" "Pet salvo com sucesso!"}

@router.get("/pet")
def obter_pet():
    return pet_estado