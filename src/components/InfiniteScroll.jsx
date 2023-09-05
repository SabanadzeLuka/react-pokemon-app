import { useState, useEffect } from "react";
import RenderedPokemons from "./RenderedPokemons";
import axios from "axios";

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 20; // Number of items to load per page

  const fetchPokemons = async (offset) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${pageSize}`
      );

      const eachPokemonFetch = await Promise.all(
        response.data.results.map(async (pokemon) => {
          try {
            const eachResponse = await axios.get(pokemon.url);
            return eachResponse.data;
          } catch (error) {
            console.log("Error fetching individual Pokémon:", error);
          }
        })
      );

      return eachPokemonFetch;
    } catch (error) {
      console.log("Error fetching pokemons list:", error);
    }
  };

  const loadMoreItems = async () => {
    setIsLoading(true);
    const offset = (page - 1) * pageSize;
    const newItems = await fetchPokemons(offset);

    setTimeout(() => {
      setItems((prevItems) => [...prevItems, ...newItems]);
      setIsLoading(false);
      setPage((prevPage) => prevPage + 1);
    }, 1000); // Simulate loading time
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !isLoading
    ) {
      loadMoreItems();
    }
  };

  useEffect(() => {
    loadMoreItems();
  }, []); // Load initial data when the component mounts

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, page]);

  return (
    <div className="grid grid-cols-4 gap-6 drop-shadow-lg min-h-screen">
      {items.map((pokemon, index) => (
        <RenderedPokemons key={index} pokemon={pokemon} />
      ))}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScroll;
