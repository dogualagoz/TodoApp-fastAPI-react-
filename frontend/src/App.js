import { useState, useEffect } from "react";
import axios from "axios";
import './index.css';

function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  function handleNewTodo() {
    if (value === "") return;
    axios.post("http://127.0.0.1:8000/todos", { title: value }).then(() => {
      fetchTodos();
      setValue("");
    });
  }

  function fetchTodos() {
    axios.get("http://127.0.0.1:8000/todos").then((res) => setTodos(res.data));
  }

  function deleteTodo(id) {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return;

    axios.delete(`http://127.0.0.1:8000/todos/${id}`).then(() => fetchTodos());
  }

  function updateTodo(id, e) {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/todos/${id}`, {
        title: e.target[0].value,
      })
      .then(() => fetchTodos());
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1 className="title">My Todo App</h1>
      <div className="todo-form">
        <label className="form-label">Yeni todo oluştur</label>
        <input
          type="text"
          className="todo-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="create-btn" onClick={handleNewTodo}>Oluştur</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li className="todo-item" key={todo.id}>
            <form className="todo-item-form" onSubmit={(e) => updateTodo(todo.id, e)}>
              <input className="todo-edit-input" defaultValue={todo.title} />
              <div className="btn-group">
                <button className="save-btn" type="submit">Kaydet</button>
                <button className="delete-btn" type="button" onClick={() => deleteTodo(todo.id)}>Sil</button>
              </div>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;