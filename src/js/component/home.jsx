import React, { useState, useEffect } from "react";

import TodoItem from "./TodoItem";

import "../../styles/home.css";

const Home = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const baseUrl = "https://arbitrary-test-api-e8b3a9916868.herokuapp.com/todo";

  useEffect(() => {
    const getTodos = async () => {
      const resp = await fetch(`${baseUrl}/users/sombra`);
      if (resp.ok) {
        const data = await resp.json();
        setTodos(data.todos);
      }
    };
    getTodos();
  }, []);

  const handleSubmit = async (ev) => {
    if (input.length) {
      ev.preventDefault();
      const resp = await fetch(`${baseUrl}/todos/sombra`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: input,
          done: false,
        }),
      });
      const data = await resp.json();
      setTodos([data, ...todos]);
      setInput("");
    }
  };

  const handleToggle = async (todo) => {
    let idx = todos.findIndex((item) => item.id === todo.id);
    todo.is_done = !todo.is_done;
    const resp = await fetch(`${baseUrl}/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    if (resp.ok) {
      setTodos(todos.toSpliced(idx, 1, todo));
    }
  };

  const handleDelete = async (todo) => {
    let idx = todos.findIndex((item) => item.id === todo.id);
    const resp = await fetch(`${baseUrl}/todos/${todo.id}`, {
      method: "DELETE",
    });
    if (resp.ok) {
      setTodos(todos.toSpliced(idx, 1));
    }
  };

  return (
    <div className="row mx-3">
      <div className="col-sm-8 offset-sm-2 d-flex flex-column align-items-center gap-2">
        <h1>Todo List</h1>
        <form className="w-100" onSubmit={(ev) => handleSubmit(ev)}>
          <input
            type="text"
            className="w-100"
            placeholder="What do you want to do today?"
            value={input}
            onChange={(ev) => setInput(ev.target.value)}
          />
        </form>
        {todos
          .sort((a, b) => a.is_done - b.is_done)
          .map((todo, idx) => (
            <TodoItem
              todo={todo}
              onClickLabel={() => handleToggle(todo)}
              onClickDelete={() => handleDelete(todo)}
              key={idx}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
