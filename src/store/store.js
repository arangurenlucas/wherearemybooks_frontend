import { createStore } from "redux";

const initialState = {
  personas: [],
  libros: [],
  categorias: [],
};

function reducer(state = initialState, action) {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "PERSONAS_LIST":
      newState.personas = action.list;
      return newState;
    case "AGREGAR_PERSONA":
      newState.personas.push(action.persona);
      return newState;
    case "REMOVER_PERSONA":
      newState.personas = newState.personas.filter(
        (unElemento) => unElemento.id != action.idElementoARemover
      );
      return newState;
    case "CATEGORIAS_LIST":
      newState.categorias = action.list;
      return newState;
    case "REMOVER_CATEGORIA":
      newState.categorias = newState.categorias.filter(
        (unElemento) => unElemento.id != action.idElementoARemover
      );
      return newState;
    case "LIBROS_LIST":
      newState.libros = action.list;
      return newState;
    case "AGREGAR_LIBROS":
      newState.libros.push(action.libro);
      return newState;
    default:
      return state;
  }
}

export default createStore(reducer);
