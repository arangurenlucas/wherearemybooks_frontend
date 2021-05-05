import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

export default function CategoriasAdd() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = React.useState("");
  const [form, setForm] = React.useState({
    nombre: "",
  });

  const handleCategoryName = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.nombre = e.target.value;
    setForm(newForm);
  };

  const handleSave = async () => {
    try {
      const serverResponse = await axios.post(
        "http://localhost:3001/api/categorias",
        form
      );
      dispatch({ type: "AGREGAR_CATEGORIA", categoria: serverResponse.data });
      setError("");
      history.push("/categorias");
    } catch (e) {
      setError(e.message);
      swal("Error", error, "error");
    }
  };

  const handleCancel = () => {
    history.push("/categorias");
  };
  return (
    <div>
      <div>
        <label>Nombre: </label>
        <input
          type="text"
          value={form.nombre}
          placeholder={"Nombre de categoria"}
          onChange={handleCategoryName}
          required
        />
      </div>
      <button onClick={handleSave}>Guardar</button>
      <button onClick={handleCancel}>Cancelar</button>
    </div>
  );
}
