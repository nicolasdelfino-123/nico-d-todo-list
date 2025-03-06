import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";

const Todo = () => {
  const [agregarItem, setAgregarItem] = useState([]);
  const apiUrl = "https://playground.4geeks.com/todo";
  const userName = "Nicodelfi";

  // 🔹 Crear usuario
  const createUser = async () => {
    try {
      console.log("creando usuario...");
      const response = await fetch(`${apiUrl}/users/${userName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userName }), // Solo enviar el nombre
      });
      if (!response.ok) throw new Error("Error al crear el usuario");
      const data = await response.json();
      console.log("Usuario creado con éxito:", data);
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  // 🔹 Obtener las tareas desde la API
  const fetchTodos = async () => {
    try {
      console.log("obteniendo tareas...");
      const response = await fetch(`${apiUrl}/users/${userName}`); // Usar el endpoint correcto
      if (response.status === 404) {
        console.log("Usuario no encontrado. Creando usuario...");
        await createUser(); // Si el usuario no existe, créalo
        return;
      }
      if (!response.ok) throw new Error("Error al obtener los todos");
      const data = await response.json();
      console.log("Tareas obtenidas con éxito:", data.todos);
      setAgregarItem(data.todos || []); // Actualizar el estado con las tareas
    } catch (error) {
      console.error("Error al cargar todos:", error);
    }
  };

  // 🔹 Cargar tareas al montar el componente
  useEffect(() => {
    console.log("Cargando tareas al montar el componente...");
    fetchTodos();
  }, []);

  // 🔹 Agregar nueva tarea
  const handlerInput = async (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const nuevaTarea = { label: e.target.value, is_done: false };
      console.log("Agregando nueva tarea:", nuevaTarea);

      try {
        const response = await fetch(`${apiUrl}/todos/${userName}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevaTarea), // Enviar solo la nueva tarea
        });

        if (!response.ok) throw new Error("Error al agregar la tarea");

        const data = await response.json();
        console.log("Tarea agregada con éxito:", data);
        setAgregarItem([data, ...agregarItem]); // Agregar la nueva tarea al estado
        e.target.value = ""; // Limpiar el input
      } catch (error) {
        console.error("Error al agregar tarea:", error);
      }
    }
  };

  // 🔹 Eliminar tarea por ID
  const deleteTodo = async (id) => {
    console.log("Eliminando tarea con ID:", id);
    try {
      const response = await fetch(`${apiUrl}/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar la tarea");
      console.log("Tarea eliminada con éxito");

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
