import { type ReactNode, Dispatch } from "react";

export type Action =
  | { type: "CHANGETHEME"; payload: string }
  | { type: "ADDTASK"; payload: Task }
  | { type: "COMPLETEDTASK"; payload: Task }
  | { type: "CLEARCOMPLETED" };

export type ProviderProps = {
  children: ReactNode;
};

export type TypeValue = {
  dispatch: Dispatch<Action>;
  theme: string | null;
  tasks: Task[];
  completedTasks: Task[];
};

export type Task = {
  text: string;
  active: boolean;
  id: string;
  complete: boolean;
};

export type TypeinitailState = {
  theme: string | null;
  tasks: Task[];
  completedTasks: Task[];
};
