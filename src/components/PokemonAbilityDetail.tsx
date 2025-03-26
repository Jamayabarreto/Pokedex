import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

interface Ability {
  name: string;
  effect_entries: { effect: string }[];
}

const PokemonAbilityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ability, setAbility] = useState<Ability | null>(null);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/ability/${id}/`)
      .then((response) => {
        setAbility(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the ability:", error);
      });
  }, [id]);

  if (!ability) {
    return <div className="text-center text-black">Loading...</div>;
  }

  return (
    <div className="ability-detail-container">
      <h2 className="text-3xl font-bold capitalize">Habilidad: {ability.name}</h2>
      <p className="mt-2">{ability.effect_entries[0].effect}</p>

      
    </div>
  );
};

export default PokemonAbilityDetail;
