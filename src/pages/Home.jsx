import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiMenuAlt3 } from "react-icons/hi";
import Logo from "../assets/logo.png";
import Themes from "../components/Themes";
import Gender from "../components/Gender";
import TypesFilter from "../components/TypesFilter";
import WeightFilter from "../components/WeightFilter";
import HeightFilter from "../components/HeightFilter";
import { useDispatch } from "react-redux";
import RenderedPokemons from "../components/RenderedPokemons";

// action import
import { setPokemons } from "../redux/actions/pokemonActions";

const Home = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
      );

      const eachPokemonFetch = await Promise.all(
        response.data.results.map(async (pokemon) => {
          try {
            const eachResponse = await axios.get(pokemon.url);
            return eachResponse.data;
          } catch (error) {
            console.log("Error fetching individual Pokémon:", error);
            throw error;
          }
        })
      );

      dispatch(setPokemons(eachPokemonFetch));
    } catch (error) {
      console.log("Error fetching pokemons list:", error);
    }
  };

  return (
    <section className="flex gap-6">
      <div
        className={`bg-white dark:bg-zinc-900 sticky min-h-screen border-r-2 border-zinc-200 dark:border-zinc-700 ${
          open ? "w-64" : "w-16"
        } duration-300 text-zinc-800 dark:text-zinc-300 px-4`}
      >
        <div className="py-3 flex justify-end">
          <img
            src={Logo}
            width={200}
            height={200}
            className={`cursor-pointer ${!open && "pl-1"}`}
            onClick={() => setOpen(!open)}
          />
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          <div
            className="mt-1 flex flex-col relative"
            onClick={() => setOpen(true)}
          >
            <Themes open={open} />
            <div className="mt-6">
              <div className="mt-3">
                <Gender open={open} />
              </div>
              <div className="mt-3">
                <TypesFilter open={open} />
              </div>
            </div>
            <div className="mt-10">
              <WeightFilter open={open} />
            </div>
            <div className="mt-10">
              <HeightFilter open={open} />
            </div>
          </div>
        </div>
      </div>
      <div className="m-3 flex justify-center items-center w-full text-xl text-zinc-900 dark:text-zinc-300 font-semibold">
        <RenderedPokemons />
      </div>
    </section>
  );
};

export default Home;
