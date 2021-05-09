import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

export default function LibrosView(props) {
  const params = useParams();
  const list = useSelector((state) => state.libros);
  const [libro, setLibro] = React.useState("");

  React.useEffect(() => {
    setLibro(list.find((unLibro) => unLibro.id == params.id));
  }, []);
  return (
    <>
      <div>
        <h2>{libro.nombre}</h2>
        <h4>Descripcion:</h4>
        <p>{libro.descripcion}</p>
      </div>
      <Link to="/libros">Volver al listado</Link>
    </>
  );
}
