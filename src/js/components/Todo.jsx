import React, { useState } from "react";

const Todo = () => {
  const [agregarItem, setAgregarItem] = useState([]);

  function handlerInput(e) {
    if (e.key === "Enter") {
      setAgregarItem([...agregarItem, e.target.value]);
      e.target.value = "";
    }
  }

  function borrarItem(index) {
    let newArray = agregarItem.filter((_, idx) => index !== idx);
    setAgregarItem(newArray);
  }

  const mapeo = agregarItem.map((valor, index) => {
    return (
      <li key={valor} value={index}>
        {valor}{" "}
        <button className="boton" value={index} onClick={borrarItem}>
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
