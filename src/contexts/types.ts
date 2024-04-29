import { type ReactNode, Dispatch, SetStateAction } from "react";

export type Action =
  | { type: "CHANGETHEME"; payload: string }
  | { type: "ADDTASK"; payload: Task }
  | { type: "COMPLETEDTASK"; payload: Task }
  | { type: "CLEARCOMPLETED" }
  | { type: "DELETETASK"; payload: Task };

export type ProviderProps = {
  children: ReactNode;
};

export type TypeValue = {
  dispatch: Dispatch<Action>;
  theme: string | null;
  tasks: Task[];
  completedTasks: Task[];
  setStateChange: Dispatch<SetStateAction<string>>;
  setMode: Dispatch<SetStateAction<string>>;
  mode: string;
  loading: boolean;
  authState: boolean;
  user: User | null;
};

export type Task = {
  task: string;
  actived: boolean;
  id: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

export type TypeinitailState = {
  theme: string | null;
  tasks: Task[];
};

export type User = {
  email: string;
  id: string;
};
