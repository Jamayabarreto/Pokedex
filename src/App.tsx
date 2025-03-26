import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import pokeball from "./assets/pokeball.svg";
import "./App.css";
import Home from "./components/Home";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import PokemonAbilityDetail from "./components/PokemonAbilityDetail";
import { ApolloClientProvider } from "./ApolloClient";

function App() {
  return (
    <ApolloClientProvider>
      <Router>
        <div className="page-container">
          {/* Pokebola centrada */}
          <img src={pokeball} className="pokeball-logo" alt="Pokeball" />

          {/* Título centrado */}
          <h1 className="pokedex-title">Pokédex</h1>

          {/* Enlaces centrados */}
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/pokemon">Pokémon List</Link>
          </nav>

          {/* Rutas */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
            <Route path="/ability/:id" element={<PokemonAbilityDetail />} />
          </Routes>
        </div>
      </Router>
    </ApolloClientProvider>
  );
}

export default App;
