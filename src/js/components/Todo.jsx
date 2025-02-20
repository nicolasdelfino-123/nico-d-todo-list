import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";

const Todo = () => {
  const [agregarItem, setAgregarItem] = useState([]);

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

  const mapeo = agregarItem.map((valor, index) => {
    return (
      <div className="card">
        <li
          className="listaItems list-group-item"
          key={index}
          data-valor={valor}
        >
          {valor}{" "}
          <button className="botonBorrar" onClick={() => borrarItem(index)}>
            <i className="fa fa-times"></i>
          </button>
        </li>
      </div>
    );
  });

  return (
    <div className="container w-50">
      <h1>todos</h1>
      <div>
        <div className="card w-100 mb-0">
          <div className="card-body">
            <input
              className="input list-group-item w-100 h-290"
              onKeyDown={handlerInput}
              type="text"
              placeholder="Agrega tu item"
            />
          </div>
        </div>
        <ul className="list-group">{mapeo}</ul>
        <div className="card">
          <div className="itemsLeft card-body">{itemsLeft()}</div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
