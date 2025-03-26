import { useParams, Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const GET_ABILITY_DETAILS = gql`
  query GetAbilityDetails($id: Int!) {
    pokemon_v2_ability_by_pk(id: $id) {
      id
      name
      pokemon_v2_abilityeffecttexts {
        effect
      }
    }
  }
`;

const PokemonAbility = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_ABILITY_DETAILS, {
    variables: { id: parseInt(id || "1") },
  });

  if (loading) return <div className="text-center text-black">Loading...</div>;
  if (error) return <div className="text-center text-black">Error: {error.message}</div>;

  const ability = data.pokemon_v2_ability_by_pk;

  return (
    <div className="page-container">
      <h2 className="text-3xl font-bold capitalize">{ability.name}</h2>
      <p>
        <strong>Efecto:</strong>{" "}
        {ability.pokemon_v2_abilityeffecttexts.length > 0
          ? ability.pokemon_v2_abilityeffecttexts[0].effect
          : "No hay información disponible"}
      </p>

 
    </div>
  );
};

export default PokemonAbility;
