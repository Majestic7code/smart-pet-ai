# 🐾 Smart Pet IA – Backend (FastAPI)

Backend do projeto **Smart Pet IA**, um sistema de produtividade gamificado com pet virtual evolutivo.

Este backend está sendo construído com foco em aprendizado real de arquitetura backend utilizando FastAPI.

---

## 🚀 Tecnologias Utilizadas

- Python 3.13
- FastAPI
- Uvicorn
- Pydantic (validação de dados)
- Ambiente virtual (venv)

---

## 📚 Etapa Atual do Projeto

Até o momento, foi implementado:

✅ Criação do ambiente virtual  
✅ Instalação do FastAPI e Uvicorn  
✅ Estrutura inicial de pastas  
✅ Criação do `main.py`  
✅ Configuração de CORS  
✅ Primeira rota GET (`/`)  
✅ Servidor rodando corretamente  
✅ Teste via navegador  
✅ Compreensão de rotas e métodos HTTP  

---

## 🧠 Conceitos Aprendidos Até Agora

### 🔹 O que é uma API?
Uma ponte de comunicação entre frontend e backend.

### 🔹 O que é uma rota?
Um endereço da API que executa uma função quando recebe uma requisição.

Exemplo:

```python
@app.get("/")
def home():
    return {"message": "Smart Pet API está funcionando"}