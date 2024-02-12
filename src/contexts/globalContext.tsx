import { createContext, useReducer, useContext, useEffect } from "react";
import {
  TypeinitailState,
  TypeValue,
  Action,
  ProviderProps,
  type Task,
} from "./types";
import { rootElement } from "../constants/theme";

const initailState: TypeinitailState = {
  theme: localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark",
  completedTasks: [],
  tasks: [],
};

const globalContext = createContext<TypeValue | undefined>(undefined);

const reducer = (state: TypeinitailState, action: Action) => {
  switch (action.type) {
    case "CHANGETHEME":
      return { ...state, theme: action.payload };
    case "ADDTASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "COMPLETEDTASK":
      // eslint-disable-next-line no-case-declarations
      const updatedTasks: Task[] = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, active: false, complete: true };
        }
        return task;
      });
      return {
        ...state,
        completedTasks: [...state.completedTasks, action.payload],
        tasks: updatedTasks,
      };
    case "CLEARCOMPLETED":
      // eslint-disable-next-line no-case-declarations
      const updatedTasks2: Task[] = state.tasks.filter(
        (task) => task.active === true
      );
      return { ...state, completedTasks: [], tasks: updatedTasks2 };
    case "DELETETASK":
      // eslint-disable-next-line no-case-declarations
      const updatedTasks3: Task[] = state.tasks.filter(
        (task) => task.id !== action.payload.id
      );
      return { ...state, tasks: updatedTasks3 };
    default:
      return state;
  }
};

const GContext: React.FC<ProviderProps> = ({ children }) => {
  const [{ theme, tasks, completedTasks }, dispatch] = useReducer(
    reducer,
    initailState
  );
  console.log(tasks);
  useEffect(() => {
    switch (theme) {
      case "dark":
        rootElement.classList.add("dark");
        localStorage.setItem("theme", "dark");

        break;
      case "light":
        rootElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        return;
    }
  }, [theme]);

  const values: TypeValue = {
    theme,
    dispatch,
    tasks,
    completedTasks,
  };
  return (
    <globalContext.Provider value={values}>{children}</globalContext.Provider>
  );
};
const useGContext: () => TypeValue = () => {
  const context = useContext(globalContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
};

export { GContext, useGContext };
