import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SinglePokemon from "../components/SinglePokemon";

function Pokemon() {
  const [pokemonData, setPokemonData] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutions, setEvolutions] = useState(null);

 

  const params = useParams();

  const singlePokemonFetch = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${params.pokemonname}`
      );
      setPokemonData(response.data);

      const speciesUrl = response.data.species.url;
      try {
        const response = await axios.get(speciesUrl);
        setSpecies(response.data);
        try {
          const evolutionUrl = response.data.evolution_chain.url;
          const evolutionResponse = await axios.get(evolutionUrl);
          setEvolutions(evolutionResponse.data);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const changePokemonFetch = async (id) => {
  //   try {
  //     const response = await axios.get(
  //       `https://pokeapi.co/api/v2/pokemon/${id}/`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

 

  useEffect(() => {
    singlePokemonFetch();
  }, [params.pokemonname]);

  return (
    <div>
      <SinglePokemon pokemon={pokemonData} evolutions={evolutions} />
    </div>
  );
}

export default Pokemon;
