from datetime import datetime 

def aplicar_degradacao(pet):
    agora = datetime.utcnow()
    minutos_passados = (agora - pet.ultimo_update).total_seconds() / 60

    if minutos_passados < 1:
        return pet 
    
    perda = int(minutos_passados)

    pet.fome = max(0, pet.fome - perda * 2)
    pet.energia = max(0, pet.energia - perda * 1)
    pet.humor = max(0, pet.humor - perda * 1)

    pet.ultimo_uptade = agora


def alimentar_pet(pet):
    pet.fome = min(100, pet.fome + 10)
    return pet

def brincar_pet(pet):
    pet.brincar = min(100, pet.brincar + 10)
    return pet

def trabalhar_pet(pet):
    pet.xp += 10
    pet.energia = max(0, pet.energia - 10)
    return pet 

