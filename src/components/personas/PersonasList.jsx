import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function PersonasList() {
  const list = useSelector((state) => state.personas);
  const dispatch = useDispatch();
  React.useEffect(async () => {
    try {
      const respuesta = await axios.get("http://localhost:3001/api/personas");
      dispatch({ type: "PERSONAS_LIST", list: respuesta.data });
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  }, []);

  return (
    <>
      <h2>Listado de personas</h2>
      <Link to="/personas/new">Agregar persona</Link>

      <ul>
        {list.map((unaPersona) =>
          unaPersona ? (
            <li key={unaPersona.id}>
              <Link to={"/personas/view/" + unaPersona.id}>
                {unaPersona.nombre} {""}
                {unaPersona.apellido}
              </Link>{" "}
            </li>
          ) : null
        )}
      </ul>
      <Link to="/">Volver a la página principal</Link>
    </>
  );
}
