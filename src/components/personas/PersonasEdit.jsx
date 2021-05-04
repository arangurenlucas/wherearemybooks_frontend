import React from "react";
import axios from "axios";
import { useParams, useHistoy, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

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
        "http://localhost:3001/api/personas" + idPersona
      );
      setForm(respuesta.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  React.useEffect(() => {
    if (!params.id) return;
    buscarPorId(params.id);
  }, [params]);

  const placeHolderData = list.find((unElemento) => unElemento.id == params.id);

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
    await axios.put("http://localhost:3001/api/personas/" + params.id, form);
    history.push("/personas");
  };

  const cancelEdit = () => {
    history.push("/personas/view/" + params.id);
  };

  return (
    <div>
      <div>
        <label>Nombre: </label>
        <input
          type="text"
          value={form.nombre}
          placeholder={placeHolderData.nombre}
          onChange={handleChangeName}
        />
      </div>
      <div>
        <label>Apellido: </label>
        <input
          type="text"
          value={form.apellido}
          placeholder={placeHolderData.apellido}
          onChange={handleChangeSurname}
        />
      </div>
      <div>
        <label>Alias: </label>
        <input
          type="text"
          value={form.alias}
          placeholder={placeHolderData.alias}
          onChange={handleChangeAlias}
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          type="text"
          placeholder={placeHolderData.email}
          value={form.email}
          onChange={handleChangeEmail}
          
        />
      </div>
      <div className="botonesEdit">
        <button onClick={saveEdit}>Guardar</button>
        <button onClick={cancelEdit}>Cancelar</button>
      </div>
    </div>
  );
}

//
