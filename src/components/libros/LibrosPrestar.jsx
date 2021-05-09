import axios from "axios";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";

export default function LibrosPrestar(props) {
  const params = useParams();
  const history = useHistory();
  const [personas, setPersonas] = React.useState([]);
  const [form, setForm] = React.useState({
    persona_id:''
  });
  const obtenerPersonas = async () => {
    try {
      const respuesta = await axios.get("http://localhost:3001/api/personas");
      setPersonas(respuesta.data);
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  };

  React.useEffect(() => {
    obtenerPersonas();
  }, []);

  const handlePersonaAPrestar = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.persona_id = e.target.value;
    setForm(newForm);
  };
  const handleSave = async () => {
    try {
      const serverResponse = await axios.put(
        "http://localhost:3001/api/libros/prestar/" + params.id,
        form
      );

      history.push("/libros");
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  };
  const handleCancel = () => {
    history.push("/libros");
  };
  return (
    <>
      <div>
        <select name="nombre" onChange={handlePersonaAPrestar} required>
          <option value="">Seleccione una persona</option>
          {personas
            ? personas.map((unaPersona) => (
                <option value={unaPersona.id}>{unaPersona.nombre}</option>
              ))
            : null}
        </select>
      </div>
      <button onClick={handleSave}>Guardar</button>
      <button onClick={handleCancel}>Cancelar</button>
    </>
  );
}
