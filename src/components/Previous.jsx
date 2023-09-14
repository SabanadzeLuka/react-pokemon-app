import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiLeftArrow } from "react-icons/bi";

function Previous({ pokemon }) {
  const [previousId, setPreviousId] = useState(null);
  const [previousData, setPreviousData] = useState({
    name: "",
    id: "",
  });

  useEffect(() => {
    if (pokemon) {
      let newPreviousId;
      if (pokemon.id === 1) {
        newPreviousId = 1;
      } else if (pokemon.id > 1) {
        newPreviousId = pokemon.id - 1;
      }

      setPreviousId(newPreviousId);

      console.log("Previous:", newPreviousId);

      const previousPokemon = async () => {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${newPreviousId}`
          );
          setPreviousData(response.data);
        } catch (error) {
          console.log("Error Fetching Previous Pokemon", error);
        }
      };
      previousPokemon();
    }
  }, [pokemon.id]);

  return (
    <Link
      to={previousId ? "/pokemon/" + previousId : "#"}
      className="flex justify-center flex-col items-center cursor-pointer"
    >
   
      <BiLeftArrow size={50} />
      {previousData.name && (
        <>
          <p>{previousData.name[0].toUpperCase() + previousData.name.slice(1)}</p>
          <p className="text-sm font-normal italic brightness-95">
            #{previousData.id.toString().padStart(4, "0")}
          </p>
        </>
      )}
    </Link>
  );
}

export default Previous;
