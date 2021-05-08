import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

export default function LibrosList() {
  const list = useSelector((state) => state.libros);
  const dispatch = useDispatch();
  const [error, setError] = React.useState("");

  const traerLibros = async () => {
    try {
      const respuesta = await axios.get("http://localhost:3001/api/libros");
      dispatch({ type: "LIBROS_LIST", list: respuesta.data });
      setError("");
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

  return (
    <>
      <h2>Listado de libros</h2>
      <Link to="/libros/new">Agregar libro</Link>

      <ul>
        {list.map((unLibro) =>
          unLibro ? (
            <li key={unLibro.id}>
              <Link to={"/libros/view/" + unLibro.id}>{unLibro.nombre}</Link>{" "}
              <button onClick={() => borrarLibro(unLibro.id)}>Borrar</button> {" "}
              <button>Prestar</button> {" "}
              <button>Devolver</button>
            </li>
          ) : null
        )}
      </ul>
      <Link to="/">Volver a la página principal</Link>
    </>
  );
}
