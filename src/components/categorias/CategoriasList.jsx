import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function CategoriasList() {
  const list = useSelector((state) => state.categorias);

  const dispatch = useDispatch();

  React.useEffect(async () => {
    const respuesta = await axios.get("http://localhost:3001/api/categorias");
    dispatch({ type: "CATEGORIAS_LIST", list: respuesta.data });
  }, []);

  
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
            </li>
          ) : null
        )}
      </ul>
      <Link to="/">Volver a la página principal</Link>
    </>
  );
}
