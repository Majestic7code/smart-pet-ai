from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.pet import router

app = FastAPI(title="Smart Pet API")
app.include_router(router)

# permitir conexão com o frontend 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Smart Pet API está funcionando"}

