import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Themes from "../components/Themes";
import Gender from "../components/Gender";

const Home = () => {
  const menus = [
    { name: "dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "user", link: "/", icon: AiOutlineUser },
    { name: "messages", link: "/", icon: FiMessageSquare },
    { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "File Manager", link: "/", icon: FiFolder },
    { name: "Cart", link: "/", icon: FiShoppingCart },
    { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
    { name: "Setting", link: "/", icon: RiSettings4Line },
  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div
        className={`bg-white dark:bg-zinc-900 sticky min-h-screen border-r-2 border-zinc-200 dark:border-zinc-700 ${
          open ? "w-64" : "w-16"
        } duration-300 text-zinc-800 dark:text-zinc-300 px-4`}
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
          <div
            className="mt-10 flex flex-col relative"
            onClick={() => setOpen(true)}
          >
            <Themes open={open} />
            <div className="mt-3">
              <Gender open={open} />
            </div>
          </div>

          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800  rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                className={`whitespace-pre duration-300 ${
                  !open && "opacity-0 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-zinc-900 dark:text-zinc-300 rounded-md px-0 py-0 w-0 overflow-hidden`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="m-3 text-xl text-zinc-900 dark:text-zinc-300 font-semibold">
        <div>
          <h1>Hi</h1>
        </div>
      </div>
    </section>
  );
};

export default Home;
