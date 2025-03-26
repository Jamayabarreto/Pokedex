import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="page-container home-container"> {/* Ahora la letra será negra */}
      <h2 className="text-4xl font-bold">Bienvenidos a la Pokédex</h2>
      <p className="mt-4 text-lg">Explora el mundo Pokémon</p>

      {/* Botón para ir a la lista de Pokémon */}
      <Link to="/pokemon">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
          Ver Pokémon
        </button>
      </Link>
    </div>
  );
};

export default Home;
