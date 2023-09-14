import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SinglePokemon from "../components/SinglePokemon";

function Pokemon() {
  const [pokemonData, setPokemonData] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutions, setEvolutions] = useState(null);

  const params = useParams();

  const fetchPokemonData = async (pokemonName) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching Pokemon data: ${error.message}`);
      throw error;
    }
  };

  const fetchSpeciesData = async (speciesUrl) => {
    try {
      const response = await axios.get(speciesUrl);
      return response.data;
    } catch (error) {
      console.error(`Error fetching species data: ${error.message}`);
      throw error;
    }
  };

  const fetchEvolutionData = async (evolutionUrl) => {
    try {
      const response = await axios.get(evolutionUrl);
      return response.data;
    } catch (error) {
      console.error(`Error fetching evolution data: ${error.message}`);
      throw error;
    }
  };

  const singlePokemonFetch = async () => {
    try {
      const pokemonData = await fetchPokemonData(params.pokemonname);
      setPokemonData(pokemonData);

      const speciesUrl = pokemonData.species.url;
      const speciesData = await fetchSpeciesData(speciesUrl);
      setSpecies(speciesData);

      const evolutionUrl = speciesData.evolution_chain.url;
      const evolutionData = await fetchEvolutionData(evolutionUrl);
      setEvolutions(evolutionData);
    } catch (error) {
      console.log(error);
    }
  };

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
