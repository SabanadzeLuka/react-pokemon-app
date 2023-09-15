import React, { useEffect, useState } from "react";
import axios from "axios";

function PokemonInfo({ types }) {
  const [doubleWeaknesses, setDoubleWeaknesses] = useState([]);
  const [doubleEffectivenesses, setDoubleEffectivenesses] = useState([]);
  const [halfWeaknesses, setHalfWeaknesses] = useState([]);
  const [halfEffectivenesses, setHalfEffectivenesses] = useState([]);

  useEffect(() => {
    const fetchPokemonTypes = async () => {
      let doubleWeaknesses = [];
      let doubleEffectivenesses = [];
      let halfWeaknesses = [];
      let halfEffectivenesses = [];

      for (const type of types) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/type/${type.type.name}/`
          );

          doubleWeaknesses.push(
            ...response.data.damage_relations.double_damage_from.map(
              (weakness) => weakness.name
            )
          );
          doubleEffectivenesses.push(
            ...response.data.damage_relations.double_damage_to.map(
              (effectiveness) => effectiveness.name
            )
          );
          halfWeaknesses.push(
            ...response.data.damage_relations.half_damage_to.map(
              (halfWeakness) => halfWeakness.name
            )
          );
          halfEffectivenesses.push(
            ...response.data.damage_relations.half_damage_from.map(
              (halfEffectiveness) => halfEffectiveness.name
            )
          );
        } catch (error) {
          console.log(error);
          // Handle errors here, e.g., show an error message to the user.
        }
      }

      setDoubleWeaknesses(
        doubleWeaknesses.filter(
          (weakness) => !doubleEffectivenesses.includes(weakness)
        )
      );

      setDoubleEffectivenesses(
        doubleEffectivenesses.filter(
          (effectivenessees) => !doubleWeaknesses.includes(effectivenessees)
        )
      );

      setHalfWeaknesses(
        halfWeaknesses.filter(
          (weakness) => !halfEffectivenesses.includes(weakness)
        )
      );

      setHalfEffectivenesses(halfEffectivenesses);
    };

    fetchPokemonTypes();
  }, [types]);

  return (
    <div>
      {/* Render double weaknesses, half weaknesses, double effectivenesses, and half effectivenesses here */}
      <div>Double Weaknesses: {doubleWeaknesses.join(", ")}</div>
      <div>Half Weaknesses: {halfWeaknesses.join(", ")}</div>
      <div>Double Effectivenesses: {doubleEffectivenesses.join(", ")}</div>
      <div>Half Effectivenesses: {halfEffectivenesses.join(", ")}</div>
    </div>
  );
}

export default PokemonInfo;
