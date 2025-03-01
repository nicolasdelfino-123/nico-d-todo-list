import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";

const Todo = () => {
  const [agregarItem, setAgregarItem] = useState([]);
  const [todos, setTodos] = useState([]);
  const userName = "Niasdf34";
  useEffect(() => {
    const handlerUser = async () => {
      // El nombre del usuario que quieres crear

      try {
        // Verificar si el usuario ya existe antes de intentar crearlo
        const responseCheck = await fetch(
          `https://playground.4geeks.com/todo/users/${userName}`
        );

        if (responseCheck.ok) {
          console.log("El usuario ya existe.");
          return; // Si el usuario ya existe, no hacemos el POST.
        }

        // Si el usuario no existe, crear uno nuevo
        const responseCreate = await fetch(
          `https://playground.4geeks.com/todo/users/${userName}`,
          {
            method: "POST", // Usamos POST para crear el usuario
            headers: {
              "Content-Type": "application/json", // Indicar que enviamos datos en formato JSON
            },
            body: JSON.stringify({
              name: userName, // Pasar el nombre del usuario en el body
            }),
          }
        );

        if (!responseCreate.ok) {
          throw new Error("Algo salió mal: " + responseCreate.statusText);
        }

        const data = await responseCreate.json(); // Obtener la respuesta en formato JSON
        console.log("Usuario creado: ", data.name); // Verificar los datos del usuario creado
      } catch (error) {
        console.log("El error es: ", error);
      }
    };

    handlerUser(); // Llamar a la función para crear el usuario
  }, []); // Este useEffect solo se ejecuta al montar el componente

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

  /* haciendo esto */

  // Función para agregar tarea tanto localmente como en la API

  useEffect(() => {
    const agregarTodo = async () => {
      // Actualizar el estado local primero
      setAgregarItem([...agregarItem]);

      try {
        const response = await fetch(
          `https://playground.4geeks.com/todo/todos/${userName}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              label: "",
              is_done: false,
            }),
          }
        );
        /* console.log("se creo", body.label); */
        if (!response.ok) {
          throw new Error("Error al agregar el todo");
        }

        const data = await response.json();
        console.log("Todo agregado: ", data);
      } catch (error) {
        console.error("Error en agregar todo: ", error);
      }
    };

    agregarTodo();
  }, []);

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
