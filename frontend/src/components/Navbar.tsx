import { Icon } from "@iconify/react/dist/iconify.js";
import { options } from "../constants/theme";
import { useGContext } from "../contexts/globalContext";
import httpClient from "../utils/httpClient";
import { useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import {
  convertSecondsToFormattedTime,
  getTokenExpiration,
} from "../utils/helper";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { theme, dispatch, userInfo } = useGContext();
  const { removeToken, token } = useToken();
  const exp = getTokenExpiration(token || "");
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState<number>(
    exp?.timeRemaining || 0
  );
  const handleChangeTheme = (text: string) => {
    dispatch({ type: "CHANGETHEME", payload: text });
  };
  const logout = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await httpClient.post("/api/logout");
      console.log(response);
      removeToken();
      navigate("/");
      navigate(0);
    } catch (e) {
      console.log("Error logout");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime: number) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div
        className={`w-full flex justify-between items-center ${
          theme === "dark" ? "dark:bg-white" : "bg-slate-600"
        } p-4 rounded-lg shadow-lg mb-8`}
      >
        <h1
          className={`dark:text-slate-600 cursor-pointer text-white font-bold text-xl dark:hover:text-pink-400 hover:text-blue-500 transitionA`}
        >
          {userInfo?.username}
        </h1>
        <div className="flex items-center justify-center gap-x-4">
          <span className="font-bold text-md text-pink-400 dark:text-blue-500">
            RemainingTime: {convertSecondsToFormattedTime(remainingTime)}
          </span>
          <button
            onClick={() => logout()}
            className="font-bold text-xl text-pink-400 dark:text-blue-500"
          >
            Logout
          </button>
        </div>
      </div>
      <div
        className={`w-full flex justify-between items-center ${
          theme === "dark" ? "dark:bg-white" : "bg-slate-600"
        } p-4 rounded-lg shadow-lg`}
      >
        <h1
          className={`dark:text-slate-600 cursor-pointer text-white font-bold text-2xl tracking-[16px] dark:hover:text-pink-400 hover:text-blue-500 transitionA`}
        >
          TODO
        </h1>
        <div className="flex items-center justify-center gap-x-4">
          {options.map((item) => (
            <button
              onClick={() => handleChangeTheme(item.text)}
              key={item.text}
            >
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
    </>
  );
};

export default Navbar;
