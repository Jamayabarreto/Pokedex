import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

interface EffectEntry {
  effect: string;
  language: { name: string };
}

interface Ability {
  name: string;
  effect_entries: EffectEntry[];
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

  // Filtrar la entrada de efecto en español
  const spanishEffect = ability.effect_entries.find(
    (entry) => entry.language.name === "en"
  );

  return (
    <div className="ability-detail-container">
      <h2 className="text-3xl font-bold capitalize">Habilidad: {ability.name}</h2>
      <p className="mt-2">{spanishEffect?.effect || "Descripción no disponible en español."}</p>
    </div>
  );
};

export default PokemonAbilityDetail;