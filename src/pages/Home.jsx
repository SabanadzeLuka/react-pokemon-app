import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import Logo from "../assets/logo.png";
import Themes from "../components/Themes";
import Gender from "../components/Gender";
import TypesFilter from "../components/TypesFilter";
import WeightFilter from "../components/WeightFilter";
import HeightFilter from "../components/HeightFilter";
import InfiniteScroll from "../components/InfiniteScroll";

const Home = () => {
  const [open, setOpen] = useState(true);

  return (
    <section className="flex gap-6">
      <div
        className={`bg-white dark:bg-zinc-900 min-h-screen h-full border-r-2 border-zinc-200 dark:border-zinc-700 ${
          open ? "w-64" : "w-16"
        } duration-300 text-zinc-800 dark:text-zinc-300 px-4 fixed left-0 top-0`}
      >
        <div className="py-3 flex justify-end">
          <img
            src={Logo}
            width={200}
            height={200}
            className={`cursor-pointer ${!open && "pl-1"}`}
            onClick={() => setOpen(!open)}
          />
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {/* Wrap the content inside a scrollable div */}
          <div className="h-[calc(80vh-5rem)] overflow-y-auto overflow-x-hidden">
            <div
              className="mt-1 flex flex-col relative"
              onClick={() => setOpen(true)}
            >
              <Themes open={open} />
              <div className="mt-6">
                <div className="mt-3">
                  <Gender open={open} />
                </div>
                <div className="mt-3">
                  <TypesFilter open={open} />
                </div>
              </div>
              <div className="mt-10">
                <WeightFilter open={open} />
              </div>
              <div className="mt-10">
                <HeightFilter open={open} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`m-3 ml-72 flex justify-center items-center w-full text-xl text-zinc-900 dark:text-zinc-300 duration-100 font-semibold ${
          !open ? "ml-24 duration-100 md:ml-24" : ""
        }`}
      >
        <InfiniteScroll open={open} />
      </div>
    </section>
  );
};

export default Home;
