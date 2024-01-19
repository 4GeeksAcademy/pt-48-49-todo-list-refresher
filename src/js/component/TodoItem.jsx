import React from "react";

const TodoItem = ({ todo, onClickLabel, onClickDelete }) => {
  return (
    <div className="todo-item w-100 d-flex flex-row justify-content-between align-items-center">
      <input type="checkbox" id={`todo-${todo.id}`} checked={todo.is_done} />
      <label htmlFor={`todo-${todo.id}`} onClick={onClickLabel}>
        {todo.label}
      </label>
      <i class="fa-solid fa-dumpster-fire" onClick={onClickDelete}></i>
    </div>
  );
};

export default TodoItem;
