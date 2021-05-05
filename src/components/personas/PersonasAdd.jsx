import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function PersonasAdd(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = React.useState({
    nombre: "",
    apellido: "",
    alias: "",
    email: "",
  });
  const [error, setError] = React.useState("");

  const handleName = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.nombre = e.target.value;
    setForm(newForm);
  };
  const handleSurname = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.apellido = e.target.value;
    setForm(newForm);
  };

  const handleAlias = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.alias = e.target.value;
    setForm(newForm);
  };
  const handleEmail = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.email = e.target.value;
    setForm(newForm);
  };

  const handleCancel = () => {
    history.push("/personas");
  };

  const handleSave = async () => {
    try {
      const serverResponse = await axios.post(
        "http://localhost:3001/api/personas",
        form
      );

      dispatch({ type: "AGREGAR_PERSONA", persona: serverResponse.data });
      setError("");
      history.push("/personas");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <div>
        <label>Nombre: </label>
        <input
          type="text"
          value={form.nombre}
          placeholder="Nombre"
          onChange={handleName}
          required
        />
      </div>
      <div>
        <label>Apellido: </label>
        <input
          type="text"
          value={form.apellido}
          placeholder="Apellido"
          onChange={handleSurname}
          required
        />
      </div>
      <div>
        <label>Alias: </label>
        <input
          type="text"
          value={form.alias}
          placeholder="Alias"
          onChange={handleAlias}
          required
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          type="email"
          value={form.email}
          placeholder="Email"
          onChange={handleEmail}
          required
        />
      </div>

      <div>
        <button onClick={handleSave}>Guardar</button>
        <button onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
}
