import React from "react";
import { Colors, singleColors } from "./Colors";
import Evolutions from "./Evolutions";

function SinglePokemon({ pokemon, evolutions }) {
  if (!pokemon || !evolutions) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-screen h-screen grid grid-cols-2 justify-center align-middle text-zinc-800 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900">
      <div
        className="pl-10 grid grid-cols-6"
        style={{
          backgroundColor: singleColors[pokemon.types[0].type.name],
        }}
      >
        <div>1</div>
        <div className="col-span-4 h-96">
          <div className="mt-10 flex gap-5">
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
            <img
              src={
                pokemon.sprites.other.dream_world.front_default ||
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
              }
              className="w-9/12 h-9/12 z-10"
              alt={pokemon.id}
            />
          </div>
          <div className="mt-10">
            <p className="text-xl font-medium">Evolutions</p>
            <Evolutions evolutions={evolutions} />
          </div>
        </div>
        <div>3</div>
      </div>
      <div>hello</div>
    </div>
  );
}

export default SinglePokemon;
