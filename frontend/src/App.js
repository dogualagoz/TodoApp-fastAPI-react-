import { useState } from "react";
import { useEffect } from 'react';
import axios from "axios"

function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  function handleNewTodo(){
    if (value === "") return;
    axios.post("http://127.0.0.1:8000/todos", {title: value}).then(()=> fetchTodos())
    
  }

  function fetchTodos(){
    axios.get("http://127.0.0.1:8000/todos").then((res) => setTodos(res.data))
  }    
    
  useEffect(()=> {
    fetchTodos()
  }, [])
  

  return (
    <div> 
      <h1>My Todo App</h1>
      <label>Yeni todo oluştur</label>
      <input type="text" onChange={(e)=> setValue(e.target.value) }></input>
      <button onClick = {handleNewTodo}>Oluştur</button>

    <div>
      <ul>
        {todos.map(todo => (
          <li>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
    </div> 
  );
}

export default App;
