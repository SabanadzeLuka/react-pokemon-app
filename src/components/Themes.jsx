import { useEffect, useState } from "react";
import { Sun, MoonStar, MonitorSmartphone, ChevronDown } from "lucide-react";

function Themes({ open }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "Auto"
  );
  const options = [
    {
      icon: <Sun size={18} />,
      text: "Light",
    },
    {
      icon: <MoonStar size={18} />,
      text: "Dark",
    },
    {
      icon: <MonitorSmartphone size={18} />,
      text: "Auto",
    },
  ];

  const onWindowMatch = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    switch (theme) {
      case "Dark":
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "Dark");
        break;
      case "Light":
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "Light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);
  return (
    <div>
      <button
        type="button"
        className={`${
          !open && "w-8"
        } inline-flex h-10 w-56 justify-around items-center rounded-md transition-all text-sm dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800`}
        id="hs-basic-collapse"
        data-hs-collapse="#hs-basic-collapse-heading"
      >
        <p className="flex items-center py-2 px-2 rounded-md text-xl text-zinc-800 dark:text-zinc-300 ">
          {options.find((option) => option.text === theme)?.icon}
        </p>
        <div
          className={`${
            !open && "hidden"
          } flex justify-center items-center gap-6`}
        >
          <p className="font-medium">{theme}</p>
          <p className="pl-28">
            <ChevronDown size={20} />
          </p>
        </div>
      </button>
      <div
        id="hs-basic-collapse-heading"
        className="hs-collapse hidden w-30 overflow-hidden transition-[height] duration-300"
        aria-labelledby="hs-basic-collapse"
      >
        <div className="mt-3">
          {options.map((option, index) => (
            <div
              key={index}
              className={`${!open && "hidden"} py-2 first:pt-0 last:pb-0`}
            >
              <button
                type="button"
                id="hs-basic-collapse"
                data-hs-collapse="#hs-basic-collapse-heading"
                className="w-48"
              >
                <p
                  className={`${
                    theme === option.text
                      ? "bg-zinc-100 rounded-md dark:bg-zinc-900 dark:rounded-md"
                      : ""
                  } cursor-pointer flex items-center font-medium gap-x-3.5 py-2 px-3 ml-4 ${
                    !open && "ml-0 py-0 px-0"
                  } rounded-sm text-xs hover:rounded-md text-zinc-800 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800`}
                  onClick={() => setTheme(option.text)}
                >
                  {option.icon}
                  {option.text}
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Themes;
