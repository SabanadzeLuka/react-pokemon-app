import Colors from "./Colors";
import { Link } from "react-router-dom";

function RenderedPokemons({ pokemon, open }) {
  return (
    <Link to={"/pokemon/" + pokemon.name}>
      <div
        key={pokemon.id}
        className={`col-span-3  md:col-span-2 lg:col-span-1 w-64 h-[340px] border-zinc-200 rounded-2xl dark:border-zinc-700 bg-white dark:bg-zinc-900 ${
          open ? "md:col-span-2" : ""
        }`}
      >
        <div className="flex flex-col">
          <div
            className="h-40 rounded-b-full"
            style={{
              backgroundColor: Colors[pokemon.types[0].type.name],
            }}
          >
            <p className="text-start ml-3 pl-3 mt-2 text-sm bg-white dark:bg-zinc-900 w-16 rounded-2xl h-8 pt-1.5 text-zinc-800 dark:text-zinc-300">
              #{pokemon.id.toString().padStart(4, "0")}
            </p>
          </div>
          <div className="h-40 flex flex-col justify-center items-center relative bottom-20">
            <img
              src={
                pokemon.sprites.other.dream_world.front_default ||
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
              }
              className="w-44 h-36 z-10"
              alt={pokemon.id}
            />
            <h1 className="top-6 relative  text-zinc-800 dark:text-zinc-300">
              {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
            </h1>
            <div className="flex gap-3">
              {pokemon.types.map((type, index) => (
                <p
                  key={index}
                  className="relative top-10 text-base font-normal w-20 h-7 text-center rounded-3xl dark:text-zinc-800 text-white"
                  style={{
                    backgroundColor: Colors[type.type.name],
                  }}
                >
                  {type.type.name[0].toUpperCase() + type.type.name.slice(1)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RenderedPokemons;
