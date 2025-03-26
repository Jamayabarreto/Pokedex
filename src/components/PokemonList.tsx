import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

interface PokemonType {
  pokemon_v2_type: {
    name: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  pokemon_v2_pokemontypes: PokemonType[];
}

const GET_POKEMON_LIST = gql`
  query GetPokemonList {
    pokemon_v2_pokemon(limit: 151) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

const PokemonList: React.FC = () => {
  const { loading, error, data } = useQuery<{ pokemon_v2_pokemon: Pokemon[] }>(
    GET_POKEMON_LIST
  );
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState<string>("");
  const [type, setType] = useState<string>("");

  useEffect(() => {
    if (data) {
      setFilteredPokemon(data.pokemon_v2_pokemon);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setFilteredPokemon(
        data.pokemon_v2_pokemon.filter(
          (poke) =>
            poke.name.toLowerCase().includes(search.toLowerCase()) &&
            (type === "" ||
              poke.pokemon_v2_pokemontypes.some(
                (t) => t.pokemon_v2_type.name === type
              ))
        )
      );
    }
  }, [search, type, data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="page-container">           
      <h2 className="pokedex-title">Pokémon List</h2>

      {/*  Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-2 p-2 border rounded w-full"
      />

      {/*  Filtro por tipo */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="mt-2 p-2 border rounded w-full"
      >
        <option value="">Todos los Tipos</option>
        <option value="bug">Bug</option>
        <option value="dragon">Dragon</option>
        <option value="electric">Electric</option>
        <option value="fairy">Fairy</option>
        <option value="fighting">Fighting</option>
        <option value="fire">Fire</option>
        <option value="flying">Flying</option>
        <option value="ghost">Ghost</option>
        <option value="grass">Grass</option>
        <option value="ground">Ground</option>
        <option value="ice">Ice</option>
        <option value="normal">Normal</option>
        <option value="poison">Poison</option>
        <option value="psychic">Psychic</option>
        <option value="rock">Rock</option>
        <option value="steel">Steel</option>
        <option value="water">Water</option>
      </select>

      {/* Lista de Pokémon con imágenes más grandes y recuadro azul */}
      <div className="pokemon-grid">
        {filteredPokemon.map((poke) => (
          <Link key={poke.id} to={`/pokemon/${poke.id}`} className="pokemon-card">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`}
              alt={poke.name}
              className="pokemon-list-img"
            />
            <h3 className="text-xl font-semibold capitalize mt-2">{poke.name}</h3>
            <p className="text-md text-white">
              Tipos: {poke.pokemon_v2_pokemontypes.map((t) => t.pokemon_v2_type.name).join(", ")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
