import React, { useState } from "react";

const Todo = () => {
  const [borrar, setBorrar] = useState("");
  const [agregarItem, setAgregarItem] = useState([]);

  function handlerInput(e) {
    if (e.key === "Enter") {
      setAgregarItem([...agregarItem, e.target.value]);
      e.target.value = "";
    }
  }

  function borrarItem(e) {
    if (e.target.value == borrar) {
      setBorrar(agregarItem.pop);
    }
  }

  const mapeo = agregarItem.map((valor, index) => {
    return (
      <li key={index} value={valor}>
        {agregarItem}{" "}
        <button value={index} onClick={borrarItem}>
          X
        </button>
      </li>
    );
  });

  return (
    <div className="container">
      <h1>todos</h1>
      <div>
        <input
          onKeyDown={handlerInput}
          type="text"
          placeholder="Agrega tu item"
        />
        <ul>{mapeo}</ul>
      </div>
    </div>
  );
};
export default Todo;
