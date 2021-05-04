import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function PersonasList() {
  const list = useSelector((state) => state.personas);
  const dispatch = useDispatch();

  React.useEffect(async () => {
    const respuesta = await axios.get("http://localhost:3001/api/personas");
    dispatch({ type: "PERSONAS_LIST", list: respuesta.data });
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
                {unaPersona.nombre}
              </Link>{" "}
            </li>
          ) : null
        )}
      </ul>
      <Link to="/">Volver a la página principal</Link>
    </>
  );
}
