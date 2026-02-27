from pydantic import BaseModel

class Pet(BaseModel):
    fome: int
    energia: int
    humor: int
    xp: int
    level: int
    minutosProdutivos: int