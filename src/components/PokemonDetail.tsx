import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

interface PokemonType {
  pokemon_v2_type: {
    name: string;
  };
}

interface PokemonStat {
  base_stat: number;
  pokemon_v2_stat: {
    name: string;
  };
}

interface PokemonAbility {
  pokemon_v2_ability: {
    name: string;
    id: number;
  };
}

interface PokemonMove {
  pokemon_v2_move: {
    name: string;
  };
}

interface PokemonSprite {
  sprites: {
    front_default: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemon_v2_pokemontypes: PokemonType[];
  pokemon_v2_pokemonstats: PokemonStat[];
  pokemon_v2_pokemonabilities: PokemonAbility[];
  pokemon_v2_pokemonmoves: PokemonMove[];
  pokemon_v2_pokemonsprites: PokemonSprite[];
}

const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
          id
        }
      }
      pokemon_v2_pokemonmoves {
        pokemon_v2_move {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: { id: parseInt(id!) },
  });

  if (loading) return <div className="text-center text-black">Loading...</div>;
  if (error) return <div className="text-center text-black">Error: {error.message}</div>;

  const pokemon = data!.pokemon_v2_pokemon_by_pk;

  // Convertir altura y peso
  const heightInMeters = (pokemon.height * 0.1).toFixed(2); // Decímetros a metros
  const weightInKilograms = (pokemon.weight * 0.1).toFixed(2); // Hectogramos a kilogramos

  return (
    <div className="pokemon-detail-container">
      <h2 className="text-3xl font-bold capitalize text-center">{pokemon.name}</h2>

      {/* Imagen centrada */}
      <img
        src={pokemon.pokemon_v2_pokemonsprites[0].sprites.front_default}
        alt={pokemon.name}
        className="pokemon-detail-img mx-auto"
      />

      {/* Altura y peso con unidades */}
      <p className="text-center text-lg font-medium">
        <strong>Altura:</strong> {heightInMeters} m
      </p>
      <p className="text-center text-lg font-medium">
        <strong>Peso:</strong> {weightInKilograms} kg
      </p>

      {/* Tipos */}
      <p className="text-center text-lg font-medium">
        <strong>Tipos:</strong>{" "}
        {pokemon.pokemon_v2_pokemontypes.map((type:PokemonType) => type.pokemon_v2_type.name).join(", ")}
      </p>

      {/* Stats con puntos */}
      <h3 className="text-2xl font-semibold text-center mt-4">Stats</h3>
      <ul className="list-disc text-center">
        {pokemon.pokemon_v2_pokemonstats.map((stat:PokemonStat) => (
          <li key={stat.pokemon_v2_stat.name} className="text-lg">
            {stat.pokemon_v2_stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>

      {/* Habilidades */}
      <h3 className="text-2xl font-semibold text-center mt-4">Habilidades</h3>
      <ul className="list-disc text-center">
        {pokemon.pokemon_v2_pokemonabilities.map((ability: PokemonAbility) => (
          <li key={ability.pokemon_v2_ability.name} className="text-lg">
            <Link
              to={`/ability/${ability.pokemon_v2_ability.id}`}
              className="text-blue-500 hover:underline"
            >
              {ability.pokemon_v2_ability.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Movimientos */}
      <h3 className="text-2xl font-semibold text-center mt-4">Movimientos</h3>
      <ul className="list-disc text-center">
        {pokemon.pokemon_v2_pokemonmoves.slice(0, 10).map((move: PokemonMove) => (
          <li key={move.pokemon_v2_move.name} className="text-lg">
            {move.pokemon_v2_move.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetail;
