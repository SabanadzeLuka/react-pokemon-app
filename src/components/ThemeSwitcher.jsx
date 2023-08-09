import { useEffect, useState } from "react";
import { Sun, MoonStar, MonitorSmartphone, ChevronDown } from "lucide-react";

function ThemeSwitcher({ open }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "System"
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
      text: "System",
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
    <div className="hs-dropdown inline-flex relative">
      <button
        id="hs-dropdown-with-title"
        type="button"
        className="hs-dropdown-toggle inline-flex justify-center items-center rounded-md transition-all text-sm dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 "
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
          <p className="pl-20">
            <ChevronDown size={20} />
          </p>
        </div>
      </button>
      <div
        className="hs-dropdown-menu transition-[opacity,margin]  duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[10rem] bg-white rounded-lg dark:bg-zinc-900"
        aria-labelledby="hs-dropdown"
      >
        {options.map((option, index) => (
          <div key={index} className="py-2 first:pt-0 last:pb-0">
            <p
              className={`${
                theme === option.text
                  ? "bg-zinc-100 rounded-md dark:bg-zinc-900 dark:rounded-md"
                  : ""
              } cursor-pointer flex items-center font-medium gap-x-3.5 py-2 px-3 ml-12 rounded-sm text-xs hover:rounded-md text-zinc-800 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800`}
              onClick={() => setTheme(option.text)}
            >
              {option.icon}
              {option.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThemeSwitcher;
