import { Icon } from "@iconify/react/dist/iconify.js";
import { options } from "../constants/theme";
import { useGContext } from "../contexts/globalContext";

const Navbar = () => {
  const { theme, dispatch } = useGContext();
  const handleChangeTheme = (text: string) => {
    dispatch({ type: "CHANGETHEME", payload: text });
  };

  return (
    <div
      className={`w-full flex justify-between items-center ${
        theme === "dark" ? "dark:bg-white" : "bg-slate-600"
      } p-4 rounded-lg shadow-lg`}
    >
      <h1
        className={`dark:text-slate-600 text-white font-bold text-2xl tracking-[16px]`}
      >
        TODO
      </h1>
      <div className="flex items-center justify-center gap-x-4">
        {options.map((item) => (
          <button onClick={() => handleChangeTheme(item.text)} key={item.text}>
            <Icon
              width={32}
              icon={item.icon}
              className={`${
                theme === item.text ? "text-pink-400" : "text-blue-400"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
