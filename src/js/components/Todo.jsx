import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";

const Todo = () => {
  const [agregarItem, setAgregarItem] = useState([]);
  const userName = "Nicolas Delfino";

  // 🔹 Obtener las tareas desde la API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          `https://playground.4geeks.com/todo/users/${userName}`
        );

        if (!response.ok) throw new Error("Error al obtener los todos");
        const data = await response.json();
        console.log("Datos recibidos de la API:", data);
        setAgregarItem(
          data.todos.filter((todo) => todo.label.trim() !== "") || [] // || [] eso se llama fallback asegura que no haya datos vacíos (es decir, un array vacío o undefined), entonces se asegura de que el valor sea un array vacío [].
        );
      } catch (error) {
        console.error("Error al cargar todos:", error);
      }
    };

    fetchTodos();
  }, []); // Se ejecuta solo cuando el componente se monta

  // 🔹 Agregar nueva tarea
  const handlerInput = async (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const nuevaTarea = { label: e.target.value, is_done: false };

      try {
        const response = await fetch(
          `https://playground.4geeks.com/todo/todos/${userName}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaTarea),
          }
        );

        if (!response.ok) throw new Error("Error al agregar la tarea");

        const data = await response.json();
        setAgregarItem([data, ...agregarItem]); // Agregar la nueva tarea al estado

        e.target.value = ""; // Limpiar el input
      } catch (error) {
        console.error("Error al agregar tarea:", error);
      }
    }
  };

  // 🔹 Eliminar tarea por ID
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Error al eliminar la tarea");

      setAgregarItem(agregarItem.filter((todo) => todo.id !== id)); // Actualizar estado
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  return (
    <div className="container h-100 w-50 text-center">
      <h1>todos</h1>
      <div>
        <div className="card w-100 mb-0">
          <div className="cardInput card-body">
            <input
              className="input list-group-item w-100 h-290"
              onKeyDown={handlerInput}
              type="text"
              placeholder="Agrega tu item"
            />
          </div>
        </div>

        <ul className="list-group">
          {agregarItem.map((todo) => (
            <li key={todo.id} className="list-group-item listaItems">
              <span>{todo.label}</span>
              <button
                className="botonBorrar"
                onClick={() => deleteTodo(todo.id)}
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </li>
          ))}
        </ul>

        <div className="tarjeta card w-100">
          <div className="list-group-item fs-smaller text-start ps-2">
            {`${agregarItem.length} item${
              agregarItem.length !== 1 ? "s" : ""
            } left`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
