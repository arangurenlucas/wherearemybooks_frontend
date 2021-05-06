import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";

export default function CategoriasView(props) {
  const dispatch = useDispatch();
  const params = useParams();

  const [list, setList] = React.useState([]);
  const [error, setError] = React.useState("");

  return (
    <>
      <h2>sad</h2>
      <Link to="/categorias">Volver al listado de categorias</Link>

      <ul>sad</ul>
    </>
  );
}
