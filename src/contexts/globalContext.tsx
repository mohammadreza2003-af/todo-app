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
import httpClient from "../utils/httpClient";

const globalContext = createContext<TypeValue | undefined>(undefined);

const GContext: React.FC<ProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [stateChange, setStateChange] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [authState, setAuthState] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("all");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await httpClient.get("/api/@me");
        if (response.status === 200) {
          setUser(response.data);
          JSON.stringify(localStorage.setItem("authState", "true"));
          setAuthState(true);
        }
      } catch (e) {
        console.log("Not authenticated");
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    let url = "";

    if (mode === "all") {
      url = "/api";
    } else if (mode === "actived") {
      url = "/api/active";
    } else {
      url = "/api/complete";
    }

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const data = await response.json();
        localStorage.setItem("tasks", JSON.stringify(data.tasks));
        console.log(data, "block");
        setTasks(data.tasks);
      } catch (e) {
        console.error("Error fetching tasks:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [stateChange, mode]);

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
    authState,
    user,
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
