import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function LibrosAdd(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [categorias, setCategorias] = React.useState([]);
  const [form, setForm] = React.useState({
    nombre: "",
    descripcion: "",
    categoria_id: "",
  });
  const [error, setError] = React.useState("");

  const handleName = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.nombre = e.target.value;
    setForm(newForm);
  };

  const handleDescription = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.descripcion = e.target.value;
    setForm(newForm);
  };

  const handleCategoria = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.categoria_id = e.target.value;
    setForm(newForm);
  };
  const handleCancel = () => history.push("/libros");

  const handleSave = async () => {
    try {
      console.log(form);
      const serverResponse = await axios.post(
        "http://localhost:3001/api/libros",
        form
      );
      dispatch({ type: "AGREGAR_LIBROS", libro: serverResponse.data });
      setError("");
      history.push("/libros");
    } catch (e) {
      setError(e.message);
    }
  };

  const obtenerCategorias = async () => {
    try {
      const respuesta = await axios.get("http://localhost:3001/api/categorias");
      setCategorias(respuesta.data);
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };
  React.useEffect(() => {
    obtenerCategorias();
  }, []);

  return (
    <>
      <div>
        <label>Nombre: </label>
        <input
          type="text"
          value={form.nombre}
          placeholder="Nombre"
          onChange={handleName}
          required
        />
      </div>
      <div>
        <label>Descripción: </label>
        <br />
        <textarea
          rows="4"
          cols="50"
          value={form.descripcion}
          onChange={handleDescription}
        >
          Descripción
        </textarea>
      </div>
      <div>
        <select name="categoria_id" onChange={handleCategoria} required>
          <option value="">Seleccione una categoria</option>
          {categorias.map((unaCategoria) =>
            unaCategoria ? (
              <option value={unaCategoria.id}>{unaCategoria.nombre}</option>
            ) : null
          )}
        </select>
      </div>
      <div>
        <button onClick={handleSave}>Guardar</button>
        <button onClick={handleCancel}>Cancelar</button>
      </div>
    </>
  );
}
