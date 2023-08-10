import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { BsFillSquareFill } from "react-icons/bs";
import { MdOutlineBloodtype } from "react-icons/md";

function TypesFilter({ open }) {
  const types = [
    { name: "Normal", icon: <BsFillSquareFill color="#a0a29f" size={18} /> },
    { name: "Fire", icon: <BsFillSquareFill color="#f0932b" size={18} /> },
    { name: "Water", icon: <BsFillSquareFill color="#539ddf" size={18} /> },
    { name: "Grass", icon: <BsFillSquareFill color="#5fbd58" size={18} /> },
    { name: "Electric", icon: <BsFillSquareFill color="#fed330" size={18} /> },
    { name: "Ice", icon: <BsFillSquareFill color="#75d0c1" size={18} /> },
    { name: "Fighting", icon: <BsFillSquareFill color="#d3425f" size={18} /> },
    { name: "Poison", icon: <BsFillSquareFill color="#b763cf" size={18} /> },
    { name: "Ground", icon: <BsFillSquareFill color="#da7c4d" size={18} /> },
    { name: "Flying", icon: <BsFillSquareFill color="#a1bbec" size={18} /> },
    { name: "Psychic", icon: <BsFillSquareFill color="#fa8581" size={18} /> },
    { name: "Bug", icon: <BsFillSquareFill color="#92bc2c" size={18} /> },
    { name: "Rock", icon: <BsFillSquareFill color="#81763da4" size={18} /> },
    { name: "Ghost", icon: <BsFillSquareFill color="#a55eea" size={18} /> },
    { name: "Dark", icon: <BsFillSquareFill color="#2d3436" size={18} /> },
    { name: "Dragon", icon: <BsFillSquareFill color="#0c69c8" size={18} /> },
    { name: "Steel", icon: <BsFillSquareFill color="#5695a3" size={18} /> },
    { name: "Fairy", icon: <BsFillSquareFill color="#ee90e6" size={18} /> },
  ];
  return (
    <div>
      <button
        type="button"
        className={`${
          !open && "w-8"
        } inline-flex justify-center w-56 h-10 items-center rounded-md transition-all text-sm dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800`}
        id="hs-basic-collapse-2"
        data-hs-collapse="#hs-basic-collapse-heading-2"
      >
        <p className={`${!open && "pr-1.5"} pl-1.5`}>
          <MdOutlineBloodtype size={20} />
        </p>
        <div
          className={`${!open && "hidden"} flex justify-center items-center`}
        >
          <p className="font-medium whitespace-pre pl-2">Select a Type</p>
          <p className="pl-20 ml-1.5">
            <ChevronDown size={20} />
          </p>
        </div>
      </button>
      <div
        id="hs-basic-collapse-heading-2"
        className="hs-collapse-2 hidden w-full overflow-hidden transition-[height] duration-300"
        aria-labelledby="hs-basic-collapse-2"
      >
        <div className="mt-3">
          <div className={`${!open && "hidden"} grid space-y-2`}>
            {types.map((type, index) => (
              <label
                key={index}
                className="max-w-xs flex p-3 block w-full bg-white border border-gray-200 rounded-md text-sm dark:bg-zinc-900 dark:border-zinc-700 dark:text-gray-400"
              >
                <input
                  type="checkbox"
                  className="shrink-0 mt-0.5 border-gray-200 rounded-full dark:bg-zinc-900 dark:border-zinc-700 dark:checked:bg-zinc-950 dark:checked:border-zinc-900"
                  id={`option-${index + 1}`}
                />
                <span className="text-xs flex align-middle text-zinc-800 ml-3 dark:text-zinc-300">
                  {type?.icon}
                  <span className="pl-2">{type?.name}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypesFilter;
