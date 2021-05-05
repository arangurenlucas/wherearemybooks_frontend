import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function CategoriasList() {
  const list = useSelector((state) => state.categorias);
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = React.useState("");

  React.useEffect(async () => {
    const respuesta = await axios.get("http://localhost:3001/api/categorias");
    dispatch({ type: "CATEGORIAS_LIST", list: respuesta.data });
  }, []);

  const handleDelete = async (idABorrar) => {
    try {
      await axios.delete("http://localhost:3001/api/categorias/" + idABorrar);
      dispatch({ type: "REMOVER_CATEGORIA", idElementoARemover: idABorrar });
      setError("");
      history.push("/categorias");
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <>
      <h2>Listado de categorias</h2>
      <Link to="/categorias/new">Agregar categoria</Link>

      <ul>
        {list.map((unaCategoria) =>
          unaCategoria ? (
            <li key={unaCategoria.id}>
              <Link to={"/categorias/view/" + unaCategoria.id}>
                {unaCategoria.nombre}
              </Link>{" "}
              <button onClick={() => handleDelete(unaCategoria.id)}>
                Borrar
              </button>
            </li>
          ) : null
        )}
      </ul>
      <Link to="/">Volver a la página principal</Link>
    </>
  );
}
