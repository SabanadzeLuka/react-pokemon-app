import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineCrisisAlert } from "react-icons/md";
import { Colors } from "./Colors";
import { ImStatsBars } from "react-icons/im";
import { AiFillHeart, AiFillThunderbolt } from "react-icons/ai";
import { PiSword } from "react-icons/pi";
import {
  GiHealingShield,
  GiBoltSpellCast,
  GiAbdominalArmor,
} from "react-icons/gi";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

function PokemonInfo({ types, pokemon }) {
  const [doubleWeaknesses, setDoubleWeaknesses] = useState([]);
  const [doubleEffectivenesses, setDoubleEffectivenesses] = useState([]);
  const [halfWeaknesses, setHalfWeaknesses] = useState([]);
  const [halfEffectivenesses, setHalfEffectivenesses] = useState([]);

  useEffect(() => {
    const fetchPokemonTypes = async () => {
      let allDoubleWeaknesses = [];
      let allDoubleEffectivenesses = [];
      let allHalfWeaknesses = [];
      let allHalfEffectivenesses = [];

      let typesList = types.map((type) => type.type.name);

      console.log(typesList);
      for (const type of types) {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/type/${type.type.name}/`
          );

          allDoubleWeaknesses.push(
            ...response.data.damage_relations.double_damage_from.map(
              (weakness) => weakness.name
            )
          );
          allDoubleEffectivenesses.push(
            ...response.data.damage_relations.double_damage_to.map(
              (effectiveness) => effectiveness.name
            )
          );

          allHalfWeaknesses.push(
            ...response.data.damage_relations.half_damage_to.map(
              (halfWeakness) => halfWeakness.name
            )
          );
          allHalfEffectivenesses.push(
            ...response.data.damage_relations.half_damage_from.map(
              (halfEffectiveness) => halfEffectiveness.name
            )
          );
        } catch (error) {
          console.log(error);
        }
      }

      // Filter out double weaknesses that are also double effectivenesses
      const filteredDoubleWeaknesses = allDoubleWeaknesses.filter(
        (weakness) => !allDoubleEffectivenesses.includes(weakness)
      );

      // Filter out double effectivenesses that are also double weaknesses
      const filteredDoubleEffectivenesses = allDoubleEffectivenesses.filter(
        (effectiveness) => !allDoubleWeaknesses.includes(effectiveness)
      );

      const lastWeaknesses = filteredDoubleWeaknesses.filter(
        (weakness) => !allHalfEffectivenesses.includes(weakness)
      );

      const uniqueLastWeaknesses = Array.from(new Set(lastWeaknesses));

      setDoubleWeaknesses(uniqueLastWeaknesses);
      setDoubleEffectivenesses(filteredDoubleEffectivenesses);
      setHalfWeaknesses(allHalfWeaknesses);
      setHalfEffectivenesses(allHalfEffectivenesses);

      const typeImmunity = {
        flying: ["ground"],
        fairy: ["dragon"],
        dark: ["psychic"],
        steel: ["posion"],
        ghost: ["posion", "fighting"],
        normal: ["ghost"],
        ground: ["electric"],
      };

      const selectedType = typesList.find((type) => type in typeImmunity);

      if (selectedType) {
        setDoubleWeaknesses(
          uniqueLastWeaknesses.filter(
            (type) => !typeImmunity[selectedType].includes(type)
          )
        );
      }
    };

    fetchPokemonTypes();
  }, [types]);

  return (
    <div className="ml-16 mt-4">
      <Link to={"/"} className="flex gap-2 cursor-pointer">
        <BiArrowBack className="mb-5" size={24} />
        {/* Render double weaknesses, half weaknesses, double effectivenesses, and half effectivenesses here */}
        <p>Go back</p>
      </Link>
      <div className="flex gap-2 ">
        <MdOutlineCrisisAlert
          size={24}
          color="orange"
          className="font-medium"
        />
        <p className="font-medium text-base text-zinc-800 dark:text-zinc-300">
          Weaknesses
        </p>
      </div>
      <div className="flex gap-2 mt-3">
        {doubleWeaknesses.map((type, index) => (
          <p
            key={index}
            className="text-base font-normal w-16 h-6 text-center rounded-sm dark:text-zinc-800 text-zinc-300"
            style={{
              backgroundColor: Colors[type],
            }}
          >
            {type[0].toUpperCase() + type.slice(1)}
          </p>
        ))}
      </div>
      <div className="mt-4">
        <div className="flex gap-2">
          <ImStatsBars size={24} color="orange" className="font-medium" />
          <p className="font-medium text-base text-zinc-800 dark:text-zinc-300">
            Base Stats
          </p>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <div className="gap-2 flex">
            <AiFillHeart size={20} color="red" />
            <p className="font-medium text-sm text-zinc-800 dark:text-zinc-300 align-middle">
              HP:
              <span className="font-normal">{pokemon.stats[0].base_stat}</span>
            </p>
          </div>
          <div className="gap-2 flex">
            <PiSword size={20} color="brown" />
            <p className="font-medium text-sm text-zinc-800 dark:text-zinc-300 align-middle">
              Attack:
              <span className="font-normal">{pokemon.stats[1].base_stat}</span>
            </p>
          </div>
          <div className="gap-2 flex">
            <GiHealingShield size={20} color="green" />
            <p className="font-medium text-sm text-zinc-800 dark:text-zinc-300 align-middle">
              Defense:
              <span className="font-normal">{pokemon.stats[2].base_stat}</span>
            </p>
          </div>
          <div className="gap-2 flex">
            <GiBoltSpellCast size={20} color="violet" />
            <p className="font-medium text-sm text-zinc-800 dark:text-zinc-300 align-middle">
              Special Attack:
              <span className="font-normal">{pokemon.stats[3].base_stat}</span>
            </p>
          </div>
          <div className="gap-2 flex">
            <GiAbdominalArmor size={20} color="blue" />
            <p className="font-medium text-sm text-zinc-800 dark:text-zinc-300 align-middle">
              Special Defense:
              <span className="font-normal">{pokemon.stats[4].base_stat}</span>
            </p>
          </div>
          <div className="gap-2 flex">
            <AiFillThunderbolt size={20} color="#fed330" />
            <p className="font-medium text-sm text-zinc-800 dark:text-zinc-300 align-middle">
              Speed:
              <span className="font-normal">{pokemon.stats[5].base_stat}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonInfo;
