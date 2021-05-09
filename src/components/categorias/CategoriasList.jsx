import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

export default function CategoriasList() {
  const list = useSelector((state) => state.categorias);
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(async () => {
    const respuesta = await axios.get("http://localhost:3001/api/categorias");
    dispatch({ type: "CATEGORIAS_LIST", list: respuesta.data });
  }, []);

  const handleDelete = async (idABorrar) => {
    try {
      await axios.delete("http://localhost:3001/api/categorias/" + idABorrar);
      dispatch({ type: "REMOVER_CATEGORIA", idElementoARemover: idABorrar });
      history.push("/categorias");
    } catch (e) {
      swal("Error", e.response.data, "error");
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
