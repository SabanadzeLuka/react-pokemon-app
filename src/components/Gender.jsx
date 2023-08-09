import React, { useState } from "react";
import { GiMale, GiFemale } from "react-icons/gi";
import { FaGenderless } from "react-icons/fa";
import { LiaTransgenderSolid } from "react-icons/lia";
import { ChevronDown } from "lucide-react";

function Gender({ open }) {
  const genders = [
    { name: "Male", icon: <GiMale size={18} /> },
    { name: "Female", icon: <GiFemale size={18} /> },
    { name: "Genderless", icon: <FaGenderless size={18} /> },
  ];
  return (
    <div>
      <button
        type="button"
        className={`${
          !open && "w-8"
        } inline-flex justify-center w-56 h-10 items-center rounded-md transition-all text-sm dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800`}
        id="hs-basic-collapse-1"
        data-hs-collapse="#hs-basic-collapse-heading-1"
      >
        <p className={`${!open && "pl-0"} pl-1.5`}>
          <LiaTransgenderSolid size={20} />
        </p>
        <div
          className={`${!open && "hidden"} flex justify-center items-center`}
        >
          <p className="font-medium whitespace-pre pl-2">Select a Gender</p>
          <p className="pl-16 ml-1.5">
            <ChevronDown size={20} />
          </p>
        </div>
      </button>
      <div
        id="hs-basic-collapse-heading-1"
        className="hs-collapse-1 hidden w-full overflow-hidden transition-[height] duration-300"
        aria-labelledby="hs-basic-collapse-1"
      >
        <div className="mt-3">
          <div className={`${!open && "hidden"} grid space-y-2`}>
            {genders.map((gender, index) => (
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
                  {gender?.icon}
                  <span className="pl-2">{gender?.name}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gender;
