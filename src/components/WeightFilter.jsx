import React, { useState } from "react";
import { GiWeight } from "react-icons/gi";

function WeightFilter({ open }) {
  const [minimumWeight, setMinimumWeight] = useState(0);
  const [maximumWeight, setMaximumWeight] = useState(1000);

  const minimumWeightHandler = (event) => {
    setMinimumWeight(parseInt(event.target.value));
    console.log(parseInt(event.target.value));
  };

  const maximumWeightHandler = (event) => {
    setMaximumWeight(parseInt(event.target.value));
  };

  return (
    <div>
      <p className="text-medium text-sm mb-4 pt-2 pl-2 text-zinc-900 h-10 rounded-md dark:text-zinc-200 flex text-center gap-2 cursor-pointer align-middle hover:bg-zinc-200 dark:hover:bg-zinc-800">
        <GiWeight size={18} />
        <span className={`${!open && "hidden"}`}>Filter by Weight</span>
      </p>
      <label
        htmlFor="minmax-range"
        className={`${
          !open && "hidden"
        } block text-sm text-zinc-900 dark:text-zinc-300`}
      >
        <span className="flex items-center gap-2 ml-7">
          <span className="text-sm font-medium">Minimum Weight</span>
          <span>{minimumWeight} Kg</span>
        </span>
      </label>
      <input
        id="minmax-range"
        type="range"
        min="0"
        max="1000"
        step="50"
        value={minimumWeight}
        onChange={minimumWeightHandler}
        className={`${
          !open && "hidden"
        } w-40 h-2 ml-7 bg-zinc-900 rounded-md appearance-none cursor-pointer dark:bg-zinc-300`}
      />

      <label
        htmlFor="minmax-range1"
        className={`${
          !open && "hidden"
        } block mt-3 text-sm text-zinc-900 dark:text-zinc-300`}
      >
        <span className="flex items-center gap-2 ml-7">
          <span className="text-sm font-medium">Maximum Weight</span>
          <span>{maximumWeight} Kg</span>
        </span>
      </label>
      <input
        id="minmax-range1"
        type="range"
        min="0"
        max="1000"
        step="50"
        value={maximumWeight}
        onChange={maximumWeightHandler}
        className={`${
          !open && "hidden"
        } w-40 h-2 ml-7 bg-zinc-900 rounded-md appearance-none cursor-pointer dark:bg-zinc-300`}
      />
    </div>
  );
}

export default WeightFilter;
