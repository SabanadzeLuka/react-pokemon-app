import axios from "axios";
import React, { useEffect, useState } from "react";
import { Colors, singleColors } from "./Colors";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

function Evolutions({ evolutions }) {
  const [parentEvo, setParentEvo] = useState("");
  const [childrenEvo, setChildrenEvo] = useState([]);
  const [grandChildrenEvo, setGrandChildrenEvo] = useState([]);

  const [parentEvoData, setParentEvoData] = useState(null);
  const [childrenEvoData, setChildrenEvoData] = useState([]);
  const [grandChildrenEvoData, setGrandChildrenEvoData] = useState([]);

  useEffect(() => {
    setParentEvo(evolutions.chain.species.name);

    // Map children names
    const childrenListing = evolutions.chain.evolves_to.map(
      (children) => children.species.name
    );
    setChildrenEvo(childrenListing);

    // Map grand-children names
    const grandChildrenListing = evolutions.chain.evolves_to.flatMap(
      (children) =>
        children.evolves_to.map((grandChildren) => grandChildren.species.name)
    );
    setGrandChildrenEvo(grandChildrenListing);
  }, [evolutions.chain.species.name]);

  // Fetch data for a single Pokemon
  const fetchPokemonData = async (id) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}/`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    if (parentEvo) {
      fetchPokemonData(parentEvo)
        .then((data) => setParentEvoData(data))
        .catch((error) => console.log(error));
      // console.log("Parent Evo:", parentEvo);
    }
  }, [parentEvo]);

  useEffect(() => {
    if (parentEvo) {
      Promise.all(childrenEvo.map(fetchPokemonData))
        .then((data) => setChildrenEvoData(data))
        .catch((error) => console.log(error));
      // console.log("Children Evo:", childrenEvo);
    }
  }, [parentEvo]);

  useEffect(() => {
    if (parentEvo) {
      Promise.all(grandChildrenEvo.map(fetchPokemonData))
        .then((data) => setGrandChildrenEvoData(data))
        .catch((error) => console.log(error));
      // console.log("Grandchildren Evo:", grandChildrenEvo);
    }
  }, [parentEvo]);

  if (parentEvoData) {
    return (
      <div className="grid grid-cols-12 mt-3">
        <Link
          to={"/pokemon/" + parentEvoData.id}
          className="col-span-3 justify-center flex flex-col items-center"
        >
          <div
            className="w-20 h-20 justify-center items-center flex rounded-full border-2"
            style={{
              borderColor: Colors[parentEvoData.types[0].type.name],
            }}
          >
            <img
              src={
                parentEvoData.sprites.other.dream_world.front_default
                  ? parentEvoData.sprites.other.dream_world.front_default
                  : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${parentEvoData.id}.png`
              }
              className="w-28 h-14"
              alt={parentEvoData.id}
            />
          </div>

          <p className="text-base text-center w-28 h-6 text-zinc-800 dark:text-zinc-300">
            {parentEvoData.name[0].toUpperCase() + parentEvoData.name.slice(1)}
          </p>
          <div className="flex gap-3 items-center justify-center">
            {parentEvoData.types.map((type, index) => (
              <p
                key={index}
                className="text-sm font-normal w-14 h-5 text-center rounded-3xl text-zinc-800 dark:text-zinc-300"
                style={{
                  backgroundColor: Colors[type.type.name],
                }}
              >
                {type.type.name[0].toUpperCase() + type.type.name.slice(1)}
              </p>
            ))}
          </div>
        </Link>
        {childrenEvoData.length >= 1 ? (
          <div className="flex cols-span-1 place-items-center">
            <MdOutlineKeyboardDoubleArrowRight size={32} />
          </div>
        ) : (
          <div></div>
        )}
        <div className="col-span-3 justify-center flex items-center flex-col">
          {childrenEvoData.map((children) => (
            <Link
              to={"/pokemon/" + children.id}
              key={children.id}
              className="justify-center flex items-center flex-row"
            >
              <div className="justify-center flex flex-col items-center">
                <div
                  className="w-20 h-20 justify-center items-center flex rounded-full border-2"
                  style={{
                    borderColor: Colors[children.types[0].type.name],
                  }}
                >
                  <img
                    src={
                      children.sprites.other.dream_world.front_default
                        ? children.sprites.other.dream_world.front_default
                        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${children.id}.png`
                    }
                    className="w-28 h-14"
                    alt={children.id}
                  />
                </div>
                <p className="text-base text-center w-28 h-6 text-zinc-800 dark:text-zinc-300">
                  {children.name[0].toUpperCase() + children.name.slice(1)}
                </p>
                <div className="flex items-center justify-center gap-3">
                  {children.types.map((type, index) => (
                    <p
                      key={index}
                      className="text-sm font-normal w-14 h-5 text-center rounded-3xl text-zinc-800 dark:text-zinc-300"
                      style={{
                        backgroundColor: Colors[type.type.name],
                      }}
                    >
                      {type.type.name[0].toUpperCase() +
                        type.type.name.slice(1)}
                    </p>
                  ))}
                </div>
              </div>
              {grandChildrenEvoData.length >= 1 ? (
                <div className="flex cols-span-1 place-items-center">
                  <MdOutlineKeyboardDoubleArrowRight size={32} />
                </div>
              ) : (
                <div></div>
              )}
            </Link>
          ))}
        </div>
        <div className="col-span-3 justify-center flex items-center flex-col">
          {grandChildrenEvoData.map((children) => (
            <Link
              to={"/pokemon/" + children.id}
              key={children.id}
              className="justify-center flex items-center pl-12 flex-col"
            >
              <div
                className="w-20 h-20 justify-center items-center flex rounded-full border-2"
                style={{
                  borderColor: Colors[children.types[0].type.name],
                }}
              >
                <img
                  src={
                    children.sprites.other.dream_world.front_default
                      ? children.sprites.other.dream_world.front_default
                      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${children.id}.png`
                  }
                  className="w-28 h-14"
                  alt={children.id}
                />
              </div>
              <p className="text-base text-zinc-800 dark:text-zinc-300 text-center w-28 h-6">
                {children.name[0].toUpperCase() + children.name.slice(1)}
              </p>
              <div className="flex items-center justify-center gap-3">
                {children.types.map((type, index) => (
                  <p
                    key={index}
                    className="text-sm font-normal w-14 h-5 text-center rounded-3xl text-zinc-800 dark:text-zinc-300"
                    style={{
                      backgroundColor: Colors[type.type.name],
                    }}
                  >
                    {type.type.name[0].toUpperCase() + type.type.name.slice(1)}
                  </p>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  } else {
    return <div className="h-screen">Loading...</div>;
  }
}

export default Evolutions;
