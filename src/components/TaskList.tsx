import { Icon } from "@iconify/react/dist/iconify.js";
import { useGContext } from "../contexts/globalContext";
import { type Task } from "../contexts/types";
import { useState } from "react";

const TaskList = () => {
  const [mode, setMode] = useState<string>("all");
  const { tasks, dispatch, completedTasks } = useGContext();
  const handleCompletedTask: (item: Task) => void = (item) => {
    if (item.active === false) return;
    dispatch({ type: "COMPLETEDTASK", payload: item });
  };
  const handleClearCompleted = () => {
    console.log("T");
    dispatch({ type: "CLEARCOMPLETED" });
  };

  const handleDeletetTask = (task: Task) => {
    dispatch({ type: "DELETETASK", payload: task });
  };
  return (
    <div>
      {tasks.length > 0 && (
        <div className="w-full bg-slate-600 rounded-lg overflow-hidden flex flex-col gap-y-4 p-4 mt-8 dark:bg-white shadow-lg">
          <ul>
            {mode === "all" &&
              tasks.map((item) => (
                <>
                  <li
                    key={item.id}
                    className="w-full relative flex justify-start items-center rounded-lg overflow-hidden mt-8 shadow-md bg-slate-600 text-white dark:bg-white dark:text-slate-600 p-4 border-b-2 border-slate-300"
                  >
                    <button
                      onClick={() => handleCompletedTask(item)}
                      className="mr-4"
                    >
                      {item.active ? (
                        <Icon
                          icon="mdi:tick-circle-outline"
                          className="dark:hover:text-pink-400 hover:text-blue-500 transitionA"
                          width={32}
                        />
                      ) : (
                        <Icon
                          icon="mdi:tick-circle"
                          className="dark:hover:text-pink-400 hover:text-blue-500 transitionA"
                          width={32}
                        />
                      )}
                    </button>
                    <h2 className={`${item.active ? "" : "line-through"}`}>
                      {item.text}
                    </h2>
                    <Icon
                      icon="typcn:delete-outline"
                      width={36}
                      onClick={() => handleDeletetTask(item)}
                      className="absolute top-4 right-4 cursor-pointer dark:hover:text-pink-400 hover:text-blue-500 transitionA"
                    />
                  </li>
                </>
              ))}
            {mode === "active" &&
              tasks.map((item) => (
                <>
                  {item.active === true && (
                    <li
                      key={item.id}
                      className="w-full relative flex justify-start items-center rounded-lg overflow-hidden mt-8 shadow-md bg-slate-600 text-white dark:bg-white dark:text-slate-600 p-4 border-b-2 border-slate-300"
                    >
                      <button
                        onClick={() => handleCompletedTask(item)}
                        className="mr-4"
                      >
                        {item.active ? (
                          <Icon
                            icon="mdi:tick-circle-outline"
                            className="dark:hover:text-pink-400 hover:text-blue-500 transitionA"
                            width={32}
                          />
                        ) : (
                          <Icon
                            icon="mdi:tick-circle"
                            className="dark:hover:text-pink-400 hover:text-blue-500 transitionA"
                            width={32}
                          />
                        )}
                      </button>
                      <h2 className={`${item.active ? "" : "line-through"}`}>
                        {item.text}
                      </h2>
                      <Icon
                        icon="typcn:delete-outline"
                        width={36}
                        onClick={() => handleDeletetTask(item)}
                        className="absolute top-4 right-4 cursor-pointer dark:hover:text-pink-400 hover:text-blue-500 transitionA"
                      />
                    </li>
                  )}
                </>
              ))}
            {mode === "completed" &&
              completedTasks.map((item) => (
                <>
                  <li
                    key={item.id}
                    className="w-full relative flex justify-start items-center rounded-lg overflow-hidden mt-8 shadow-md bg-slate-600 text-white dark:bg-white dark:text-slate-600 p-4 border-b-2 border-slate-300"
                  >
                    <button
                      onClick={() => handleCompletedTask(item)}
                      className="mr-4"
                    >
                      <Icon
                        icon="mdi:tick-circle"
                        width={32}
                        className="dark:hover:text-pink-400 hover:text-blue-500 transitionA"
                      />
                    </button>
                    <h2 className={`${item.active ? "" : "line-through"}`}>
                      {item.text}
                    </h2>
                    <Icon
                      icon="typcn:delete-outline"
                      width={36}
                      onClick={() => handleDeletetTask(item)}
                      className="absolute top-4 right-4 cursor-pointer dark:hover:text-pink-400 hover:text-blue-500 transitionA"
                    />
                  </li>
                </>
              ))}
          </ul>
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium sm:block hidden dark:text-slate-500 text-white">
              {tasks.reduce((acc, item) => {
                if (item.active === true) {
                  acc++;
                }
                return acc;
              }, 0)}{" "}
              items left
            </span>
            <div className="flex items-center gap-x-4">
              <button
                className={`text-lg font-medium transitionA ${
                  mode === "all"
                    ? "text-blue-500"
                    : "dark:text-slate-500 text-white hover:text-pink-500"
                }`}
                onClick={() => setMode("all")}
              >
                All
              </button>
              <button
                className={`text-lg font-medium transitionA ${
                  mode === "active"
                    ? "text-blue-500"
                    : "dark:text-slate-500 text-white hover:text-pink-500"
                }`}
                onClick={() => setMode("active")}
              >
                Active
              </button>
              <button
                className={`text-lg font-medium transitionA ${
                  mode === "completed"
                    ? "text-blue-500"
                    : "dark:text-slate-500 text-white hover:text-pink-500"
                }`}
                onClick={() => setMode("completed")}
              >
                Completed
              </button>
            </div>
            <button
              className="text-lg font-medium transitionA dark:text-slate-500 text-white hover:text-pink-500"
              onClick={() => handleClearCompleted()}
            >
              Clear Completed
            </button>
          </div>
          <span className="text-lg font-medium sm:hidden text-center dark:text-slate-500 text-white">
            {tasks.reduce((acc, item) => {
              if (item.active === true) {
                acc++;
              }
              return acc;
            }, 0)}{" "}
            items left
          </span>
        </div>
      )}
    </div>
  );
};

export default TaskList;
