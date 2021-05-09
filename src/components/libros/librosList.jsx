import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

export default function LibrosList() {
  const history = useHistory();
  const list = useSelector((state) => state.libros);
  const dispatch = useDispatch();

  const traerLibros = async () => {
    try {
      const respuesta = await axios.get("http://localhost:3001/api/libros");
      dispatch({ type: "LIBROS_LIST", list: respuesta.data });
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  };
  React.useEffect(async () => {
    traerLibros();
  }, []);

  const borrarLibro = async (idLibroABorrar) => {
    try {
      await axios.delete("http://localhost:3001/api/libros/" + idLibroABorrar);
      dispatch({ type: "BORRAR_LIBROS", idElementoARemover: idLibroABorrar });
      traerLibros();
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  };
  const handleDevolver = async (idLibroADevolver) => {
    try {
      const serverResponse = await axios.put(
        "http://localhost:3001/api/libros/devolver/" + idLibroADevolver
      );
      traerLibros();
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  };
  return (
    <>
      <h2>Listado de libros</h2>
      <Link to="/libros/new">Agregar libro</Link>

      <ul>
        {list.map((unLibro) =>
          unLibro ? (
            <li key={unLibro.id}>
              <Link to={"/libros/view/" + unLibro.id}>{unLibro.nombre}</Link>{" "}
              <button onClick={() => borrarLibro(unLibro.id)}>Borrar</button>{" "}
              <button
                onClick={() => history.push("/libros/prestar/" + unLibro.id)}
                disabled={unLibro.persona_id ? true : false}
              >
                Prestar
              </button>{" "}
              <button
                onClick={() => handleDevolver(unLibro.id)}
                disabled={unLibro.persona_id ? false : true}
              >
                Devolver
              </button>
            </li>
          ) : null
        )}
      </ul>
      <Link to="/">Volver a la página principal</Link>
    </>
  );
}
