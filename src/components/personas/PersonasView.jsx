import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import swal from "sweetalert";

export default function PersonasView() {
  const dispatch = useDispatch();
  const params = useParams();
  const list = useSelector((state) => state.personas);
  const [personas, setPersonas] = React.useState({});
  const history = useHistory();

  const borrarRegistro = async (idABorrar) => {
    try {
      await axios.delete('http://localhost:3001/api/personas/'+idABorrar);
      dispatch({ type: "REMOVER_PERSONA", idElementoARemover: idABorrar });
      history.push("/personas");
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  };

  const editarRegistro = (id) => {
    history.push(`/personas/edit/${id}`);
  };

  React.useEffect(() => {
    if (!list || list.length == 0) return;
    setPersonas(list.find((item) => item.id == params.id));
  }, [params, list]);
  return (
    <>
      <h2>Perfil</h2>
      <Link to="/personas">Volver al listado de personas</Link>
      <p>Datos personales</p>
      <ul>
        <li>Nombre: {personas.nombre}</li>
        <li>Apellido: {personas.apellido}</li>
        <li>Alias: {personas.alias}</li>
        <li>Email: {personas.email}</li>
      </ul>
      <button onClick={() => borrarRegistro(personas.id)}>
        Eliminar registro
      </button>
      <button onClick={() => editarRegistro(personas.id)}>Editar</button>
    </>
  );
}
