import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function LibrosList() {
  const list = useSelector((state) => state.libros);
  const dispatch = useDispatch();
  const [error, setError] = React.useState("");

  React.useEffect(async () => {
    try {
      const respuesta = await axios.get("http://localhost:3001/api/libros");
      dispatch({ type: "LIBROS_LIST", list: respuesta.data });
      setError("");
    } catch (e) {
      setError(e.message);
    }
  }, []);

  return (
    <>
      <h2>Listado de libros</h2>
      <Link to="/libros/new">Agregar libro</Link>

      <ul>
        {list.map((unLibro) =>
          unLibro ? (
            <li key={unLibro.id}>
              <Link to={"/libros/view/" + unLibro.id}>{unLibro.nombre}</Link>
            </li>
          ) : null
        )}
      </ul>
      <Link to="/">Volver a la página principal</Link>
    </>
  );
}
