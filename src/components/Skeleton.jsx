import React from "react";

function Skeleton() {
  return (
    <>
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="col-span-3 md:col-span-2 lg:col-span-1 w-64 h-[340px] border-zinc-200 rounded-2xl dark:border-zinc-700 bg-white dark:bg-zinc-900 animate-pulse"
        >
          <div className="flex flex-col">
            <div
              className="h-40 rounded-b-full bg-zinc-500 dark:bg-zinc-800"
            >
              <p className="text-start ml-3 pl-3 mt-2 text-sm bg-white dark:bg-zinc-900 w-16 rounded-2xl h-8 pt-1.5 text-zinc-800 dark:text-zinc-300 animate-pulse">
                #
              </p>
            </div>
            <div className="h-40 flex flex-col justify-center items-center relative bottom-20">
              <span className="w-44 h-36 block bg-gray-200 rounded-md dark:bg-zinc-700 animate-pulse"></span>
              <h1
                className="top-6 relative text-zinc-800 dark:text-zinc-300 h-4 bg-gray-200 rounded-md dark:bg-zinc-700 animate-pulse"
                style={{ width: "60%" }}
              ></h1>
              <div className="flex gap-3">
                {Array.from({ length: 2 }, (_, k) => (
                  <span
                    key={k}
                    className="relative top-10 text-base font-normal w-20 h-7 text-center dark:text-zinc-800 text-white bg-gray-200 rounded-md dark:bg-zinc-700 animate-pulse"
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Skeleton;
