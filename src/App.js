import React from "react";
import "./app.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import PersonasList from "./components/personas/PersonasList";
import PersonasAdd from "./components/personas/PersonasAdd";
import PersonasView from "./components/personas/PersonasView";
import PersonasEdit from "./components/personas/PersonasEdit";
import CategoriasList from "./components/categorias/CategoriasList";
import CategoriasAdd from "./components/categorias/CategoriasAdd";

function App() {
  return (
    <div className="app">
      <div className="menu">
        <h1 className="titulo">Api libros</h1>
        <nav className="botones">
          <a href="/categorias">Categorías</a>
          <a href="/personas">Personas</a>
          <a href="/libros">Libros</a>
          <a href="/">About</a>
        </nav>
      </div>
      <div className="rutas">
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/personas" component={PersonasList} />
          <Route exact path="/personas/new" component={PersonasAdd} />
          <Route exact path="/personas/view/:id" component={PersonasView} />
          <Route exact path="/personas/edit/:id" component={PersonasEdit} />
          <Route exact path="/categorias" component={CategoriasList} />
          <Route exact path="/categorias/new" component={CategoriasAdd} />
        </Router>
      </div>
    </div>
  );
}

export default App;
