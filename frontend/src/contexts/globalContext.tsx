import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  TypeinitailState,
  TypeValue,
  Action,
  ProviderProps,
  Task,
  User,
} from "./types";
import { rootElement } from "../constants/theme";
import useToken from "../hooks/useToken";

const globalContext = createContext<TypeValue | undefined>(undefined);

const GContext: React.FC<ProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [stateChange, setStateChange] = useState("");
  const [mode, setMode] = useState<string>("all");
  const [userInfo, setUserInfo] = useState<User | null>(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    return storedUserInfo && JSON.parse(storedUserInfo || "");
  });

  const { token } = useToken();

  const setInfo = () => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo || "");
      setUserInfo(parsedUserInfo);
    }
  };
  const httpUrl = import.meta.env.VITE_APP_SERVER;

  useEffect(() => {
    setInfo();
  }, [stateChange]);

  useEffect(() => {
    let url = "";

    if (mode === "all") {
      url = `${httpUrl}/api`;
    } else if (mode === "actived") {
      url = `${httpUrl}/api/active`;
    } else {
      url = `${httpUrl}/api/complete`;
    }

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: userInfo?.id,
          }),
        });
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const data = await response.json();
        localStorage.setItem("tasks", JSON.stringify(data.tasks));
        setTasks(data.tasks);
      } catch (e) {
        console.error("Error fetching tasks:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userInfo, mode]);

  const initialState: TypeinitailState = {
    theme: localStorage.getItem("theme") ?? "dark",
    tasks: tasks ?? [],
  };

  const reducer = (
    state: TypeinitailState,
    action: Action
  ): TypeinitailState => {
    switch (action.type) {
      case "CHANGETHEME":
        return { ...state, theme: action.payload };
      default:
        return state;
    }
  };

  const [{ theme }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (theme === "dark") {
      rootElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      rootElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const values: TypeValue = {
    theme,
    dispatch,
    tasks: tasks,
    completedTasks: [],
    setStateChange,
    setMode,
    mode,
    loading,
    userInfo,
    httpUrl,
  };

  return (
    <globalContext.Provider value={values}>{children}</globalContext.Provider>
  );
};

const useGContext: () => TypeValue = () => {
  const context = useContext(globalContext);
  if (!context) {
    throw new Error("Global context is missing");
  }
  return context;
};

export { GContext, useGContext };
