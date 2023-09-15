import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiRightArrow } from "react-icons/bi";

function Previous({ pokemon }) {
  const [nextId, setNextId] = useState(null);
  const [nextData, setNextData] = useState({
    name: "",
    id: "",
  });

  useEffect(() => {
    if (pokemon) {
      let newPreviousId = pokemon.id + 1;

      setNextId(newPreviousId);

      // console.log("Previous:", newPreviousId);

      const previousPokemon = async () => {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${newPreviousId}`
          );
          setNextData(response.data);
        } catch (error) {
          console.log("Error Fetching Previous Pokemon", error);
        }
      };
      previousPokemon();
    }
  }, [pokemon.id]);

  return (
    <Link
      to={nextId ? "/pokemon/" + nextId : "#"}
      className="flex justify-center flex-col items-center cursor-pointer"
    >
      <BiRightArrow size={50} />
      {nextData.name && (
        <>
          <p>{nextData.name[0].toUpperCase() + nextData.name.slice(1)}</p>
          <p className="text-sm font-normal italic brightness-95">
            #{nextData.id.toString().padStart(4, "0")}
          </p>
        </>
      )}
    </Link>
  );
}

export default Previous;
