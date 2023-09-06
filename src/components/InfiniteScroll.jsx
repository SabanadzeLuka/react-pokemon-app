import { useState, useEffect, useRef } from "react";
import RenderedPokemons from "./RenderedPokemons";
import axios from "axios";
import Skeleton from "./Skeleton";

const InfiniteScroll = ({ open }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 21;
  const initialLoad = useRef(true);

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
    }, 2000);
  };

  const handleScroll = () => {
    const scrollThreshold = window.innerHeight * 0.5;
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight - scrollThreshold &&
      !isLoading
    ) {
      loadMoreItems();
    }
  };

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      loadMoreItems();
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, page]);

  return (
    <div
      className={`grid grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-6 drop-shadow-lg min-h-screen ${
        open ? "md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" : ""
      }`}
    >
      {items.map((pokemon, index) => (
        <RenderedPokemons key={index} pokemon={pokemon} />
      ))}
      {isLoading && <Skeleton />}
    </div>
  );
};

export default InfiniteScroll;
