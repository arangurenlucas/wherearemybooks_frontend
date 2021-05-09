import React from "react";
import axios from "axios";
import { useParams, useHistoy, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert";

export default function PersonasEdit(props) {
  const params = useParams();
  const history = useHistory();

  const list = useSelector((state) => state.personas);
  const [form, setForm] = React.useState({
    nombre: "",
    apellido: "",
    alias: "",
    email: "",
  });

  const listadoPersonas = list.find((unaPersona) => unaPersona.id == params.id);

  const handleChangeName = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.nombre = e.target.value;
    setForm(newForm);
  };
  const handleChangeSurname = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.apellido = e.target.value;
    setForm(newForm);
  };

  const handleChangeAlias = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.alias = e.target.value;
    setForm(newForm);
  };
  const handleChangeEmail = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.email = listadoPersonas.email;
    setForm(newForm);
  };

  const saveEdit = async () => {
    try {
      await axios.put("http://localhost:3001/api/personas/" + params.id, form);
      history.push("/personas");
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  };

  const cancelEdit = () => {
    history.push("/personas/view/" + params.id);
  };

  return (
    <div>
      <label>Nombre: </label>
      <input
        type="text"
        value={form.nombre}
        placeholder={listadoPersonas.nombre}
        onChange={handleChangeName}
      />

      <br />
      <label>Apellido: </label>
      <input
        type="text"
        value={form.apellido}
        placeholder={listadoPersonas.apellido}
        onChange={handleChangeSurname}
      />

      <br />
      <label>Alias: </label>
      <input
        type="text"
        value={form.alias}
        placeholder={listadoPersonas.alias}
        onChange={handleChangeAlias}
      />
      <br />

      <label>Email: </label>
      <input
        type="email"
        placeholder={listadoPersonas.email}
        value={form.email}
        onChange={handleChangeEmail}
      />
      <div className="botonesEdit">
        <button onClick={saveEdit}>Guardar</button>
        <button onClick={cancelEdit}>Cancelar</button>
      </div>
    </div>
  );
}