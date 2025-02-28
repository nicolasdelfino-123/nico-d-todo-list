import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";

const Todo = () => {
  const [agregarItem, setAgregarItem] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const handlerUser = async () => {
      const userName = "Nico";
      try {
        const response = await fetch(
          `https://playground.4geeks.com/todo/users/${userName}`
        );
        if (!response.ok) {
          throw new Error("algo salió mal: ", response.statusText);
        }
        let data = await response.json();
        console.log("aca está la datita: ", data);
      } catch (error) {
        console.log("el error es: ", error);
      }
    };

    handlerUser();
  }, []);
  function handlerInput(e) {
    if (e.key === "Enter") {
      setAgregarItem([...agregarItem, e.target.value]);
      e.target.value = "";
    }
  }

  function borrarItem(index) {
    let newArray = agregarItem.filter((_, indx) => indx !== index);
    setAgregarItem(newArray);
  }

  function itemsLeft() {
    let totalItems = agregarItem.length;
    return (
      <li
        className="list-unstyled"
        style={{ textAlign: "left" }}
      >{`${totalItems} item${totalItems !== 1 ? "s" : ""} left`}</li>
    );
  }
  // Función para agregar tarea tanto localmente como en la API
  const agregarTodo = async (item) => {
    // Actualizar el estado local primero
    setAgregarItem([...agregarItem, item]);

    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${userName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            label: item,
            is_done: false,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al agregar el todo");
      }

      const data = await response.json();
      console.log("Todo agregado: ", data);
    } catch (error) {
      console.error("Error en agregar todo: ", error);
    }
  };

  const mapeo = agregarItem.map((valor, index) => {
    return (
      <div className="card">
        <li
          className="listaItems list-group-item"
          key={index}
          data-valor={valor}
        >
          {valor}
          <button className="botonBorrar" onClick={() => borrarItem(index)}>
            <i className="fa-solid fa-x"></i>
          </button>
        </li>
      </div>
    );
  });

  return (
    <div className="container h-100 w-50">
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
        <ul className="list-group">{mapeo}</ul>

        <div className="tarjeta card w-100">
          <div className="list-group-item fs-smaller ps-2">{itemsLeft()}</div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
