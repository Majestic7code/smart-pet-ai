class petManager():
    def __init__(self):
        self._pet= None

    def salvar(self, pet):
        self._pet= pet
    
    def obter(self):
        return self._pet 
    
    def atualizar(self, pet):
        self._pet = pet