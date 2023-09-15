import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Colors, singleColors } from "./Colors";
import Evolutions from "./Evolutions";
import { GiBarbedNails } from "react-icons/gi";
import {
  HiOutlineArrowCircleLeft,
  HiOutlineArrowCircleRight,
} from "react-icons/hi";
import { Link } from "react-router-dom";

import Previous from "./Previous";
import Next from "./Next";
import PokemonInfo from "./PokemonInfo";

function SinglePokemon({ pokemon, evolutions }) {
  if (!pokemon || !evolutions) {
    return <div>Loading...</div>;
  }

  // let previousId;
  // if (pokemon.id === 1) {
  //   previousId = 1;
  // } else if (pokemon.id > 1) {
  //   previousId = pokemon.id - 1;
  // }
  // let nextID = pokemon.id + 1;

  return (
    <div className="w-screen h-screen grid grid-cols-2 justify-center align-middle text-zinc-800 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900">
      <div
        className="pl-10 grid grid-cols-6"
        style={{
          backgroundColor: singleColors[pokemon.types[0].type.name],
        }}
      >
        <Previous pokemon={pokemon} />
        <div className="col-span-4 h-96 ">
          <div className="mt-6 flex gap-5">
            <p className="text-4xl font-medium">
              {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
            </p>
            <p className="text-4xl font-normal italic brightness-95">
              #{pokemon.id.toString().padStart(4, "0")}
            </p>
          </div>
          <div className="pt-2 flex gap-2">
            {pokemon.types.map((type, index) => (
              <p
                key={index}
                className="text-base font-normal w-16 h-6 text-center rounded-3xl text-zinc-800 dark:text-zinc-300"
                style={{
                  backgroundColor: Colors[type.type.name],
                }}
              >
                {type.type.name[0].toUpperCase() + type.type.name.slice(1)}
              </p>
            ))}
          </div>
          <div className="mt-12">
            <div className="flex flex-col items-center">
              <img
                src={
                  pokemon.sprites.other.dream_world.front_default ||
                  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
                }
                className="w-60 h-80"
                alt={pokemon.id}
              />
            </div>
            <div className="mt-10">
              <div className="flex gap-2 items-center">
                <GiBarbedNails
                  className="text-center align-middle text-zinc-800 dark:text-zinc-300"
                  size={26}
                />
                <p className="text-xl font-medium text-center align-middle text-zinc-800 dark:text-zinc-300">
                  Evolutions
                </p>
              </div>
              <Evolutions evolutions={evolutions} />
            </div>
          </div>
        </div>
        <Next pokemon={pokemon} />
      </div>
      <PokemonInfo types={pokemon.types} />
    </div>
  );
}

export default SinglePokemon;
