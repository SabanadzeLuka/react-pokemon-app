import React, { useState } from "react";
import { TbArrowAutofitHeight } from "react-icons/tb";

function HeightFilter({ open }) {
  const [minimumHeight, setMinimumHeight] = useState(0);
  const [maximumHeight, setMaximumHeight] = useState(1000);

  const minimumHeightHandler = (event) => {
    setMinimumHeight(parseInt(event.target.value));
    console.log(parseInt(event.target.value));
  };

  const maximumHeightHandler = (event) => {
    setMaximumHeight(parseInt(event.target.value));
  };

  return (
    <div>
      <p className="text-medium text-sm mb-4 pt-2 pl-2 text-zinc-900 h-10 rounded-md dark:text-zinc-300 flex text-center gap-2 cursor-pointer align-middle hover:bg-zinc-200 dark:hover:bg-zinc-800">
        <TbArrowAutofitHeight size={18} />
        <span className={`${!open && "hidden"}`}>Filter by Height</span>
      </p>
      <label
        htmlFor="minmax-range2"
        className={`${
          !open && "hidden"
        } block text-sm text-zinc-900 dark:text-zinc-300`}
      >
        <span className="flex items-center gap-2 ml-7">
          <span className="text-sm font-medium">Minimum Height</span>
          <span>{minimumHeight} Kg</span>
        </span>
      </label>
      <input
        id="minmax-range2"
        type="range"
        min="0"
        max="1000"
        step="50"
        value={minimumHeight}
        onChange={minimumHeightHandler}
        className={`${
          !open && "hidden"
        } w-40 h-2 ml-7 bg-zinc-900 rounded-md appearance-none cursor-pointer dark:bg-zinc-300`}
      />

      <label
        htmlFor="minmax-range3"
        className={`${
          !open && "hidden"
        } block mt-3 text-sm text-zinc-900 dark:text-zinc-300`}
      >
        <span className="flex items-center gap-2 ml-7">
          <span className="text-sm font-medium">Maximum Height</span>
          <span>{maximumHeight} Kg</span>
        </span>
      </label>
      <input
        id="minmax-range3"
        type="range"
        min="0"
        max="1000"
        step="50"
        value={maximumHeight}
        onChange={maximumHeightHandler}
        className={`${
          !open && "hidden"
        } w-40 h-2 ml-7 bg-zinc-900 rounded-md appearance-none cursor-pointer dark:bg-zinc-300`}
      />
    </div>
  );
}

export default HeightFilter;
