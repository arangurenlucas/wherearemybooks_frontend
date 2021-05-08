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

  const buscarPorId = async (idPersona) => {
    try {
      const respuesta = await axios.get(
        "http://localhost:3001/api/personas/" + idPersona
      );
      setForm(respuesta.data);
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  };
  React.useEffect(() => {
    if (!params.id) return;
    buscarPorId(params.id);
  }, [params]);

  const placeHolderData = list.find((unElemento) => unElemento.id == params.id);

  console.log(placeHolderData.nombre);

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
    newForm.email = placeHolderData.email;
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
        placeholder={placeHolderData.nombre}
        onChange={handleChangeName}
        required
      />

      <br />
      <label>Apellido: </label>
      <input
        type="text"
        value={form.apellido}
        placeholder={placeHolderData.apellido}
        onChange={handleChangeSurname}
        required
      />

      <br />
      <label>Alias: </label>
      <input
        type="text"
        value={form.alias}
        placeholder={placeHolderData.alias}
        onChange={handleChangeAlias}
        required
      />
      <br />

      <label>Email: </label>
      <input
        type="text"
        placeholder={placeHolderData.email}
        value={form.email}
        onChange={handleChangeEmail}
        required
      />
      <div className="botonesEdit">
        <button onClick={saveEdit}>Guardar</button>
        <button onClick={cancelEdit}>Cancelar</button>
      </div>
    </div>
  );
}

//
