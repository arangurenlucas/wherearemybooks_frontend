import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";

export default function CategoriasView(props) {
  const params = useParams();
  const [categorias, setCategorias] = React.useState("");
  const [libros, setLibros] = React.useState("");

  const getOverHere = async () => {
    try {
      const respuestaLibros = await axios.get(
        "http://localhost:3001/api/libros"
      );
      const listaLibros = respuestaLibros.data;
      setLibros(
        listaLibros.filter((unLibro) => unLibro.categoria_id == params.id)
      );

      const respuestaCategorias = await axios.get(
        "http://localhost:3001/api/categorias/" + params.id
      );
      setCategorias(respuestaCategorias.data);
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  };

  React.useEffect(async () => {
    getOverHere();
  }, []);
  return (
    <>
      <h2>{categorias.nombre}</h2>
      <Link to="/categorias">Volver al listado de categorias</Link>
      <ul>
        {libros
          ? libros.map((unLibro) => <li key={unLibro.id}>{unLibro.nombre}</li>)
          : null}
      </ul>
    </>
  );
}
