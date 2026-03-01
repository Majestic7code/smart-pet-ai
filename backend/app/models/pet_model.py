from datetime import datetime

class petModel:
    def __init__(self, fome, energia, humor, xp, level, minutosProdutivos):
        self.fome = fome
        self.energia = energia
        self.humor = humor
        self.xp = xp
        self.level = level
        self.minutosProdutivos = minutosProdutivos
        self.ultimo_update = datetime.utcnow()

