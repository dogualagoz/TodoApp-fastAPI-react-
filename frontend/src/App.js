import { useState } from "react";
import axios from "axios"

function App() {

  const [value, setValue] = useState("")


  function handleNewTodo(){
    if (value=== "") return;
    axios.post("https://127.0.0.1:8000/todos", {title: value})
  }

  
  return (
    <div>
      <h1>My Todo App</h1>
      <label>Yeni Todo oluştur</label>
      <input type = "text" onChange={(e)=> setValue(e.target.value)}/>
      <button onClick={handleNewTodo}>+ Oluştur</button>
    </div>
  );
}

export default App;
