from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


from database import SessionLocal, engine
from models import Todo, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/todos")
def read_todos(db = Depends(get_db)):
    todos = db.query(Todo).all()
    return todos

class TodoCreate(BaseModel):
    title: str

@app.post("/todos")
def create_todo( new_todo: TodoCreate, db = Depends(get_db)):
    db_todo = Todo(title=new_todo.title)
    db.add(db_todo)
    db.commit()
    return {"message": "Todo successfully created"}