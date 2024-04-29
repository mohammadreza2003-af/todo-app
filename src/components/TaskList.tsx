import { Icon } from "@iconify/react/dist/iconify.js";
import { useGContext } from "../contexts/globalContext";
import { type Task } from "../contexts/types";
import { generateUniqueId } from "../utils/helper";

const TaskList = () => {
  const { tasks, setStateChange, setMode, mode, loading } = useGContext();

  const handleCompletedTask: (item: Task) => void = async (item) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };
    try {
      const response = await fetch(`/api/actived/${item.id}`, options);
      if (!response.ok) throw new Error("Problem in server.");
      setStateChange(generateUniqueId());
    } catch (e) {
      console.error(e);
    }
  };
  const handleClearCompleted = async () => {
    try {
      const response = await fetch("/api/clear_all", {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Problem in server.");
      setStateChange(generateUniqueId());
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeletetTask = async (task: Task) => {
    try {
      const response = await fetch(`/api/delete_task/${task.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Problem in server.");
      setStateChange(generateUniqueId());
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="w-full justify-center items-center h-[120px] bg-slate-600 rounded-lg overflow-hidden flex flex-col gap-y-4 p-4 mt-8 dark:bg-white shadow-lg">
        <h2 className="font-bold text-2xl text-pink-400 dark:text-blue-500">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-600 rounded-lg overflow-hidden flex flex-col gap-y-4 p-4 mt-8 dark:bg-white shadow-lg">
      {tasks.length > 0 && (
        <div>
          <ul>
            {tasks.map((item) => (
              <div key={item.id}>
                <li className="w-full relative flex justify-start items-center rounded-lg overflow-hidden mt-8 shadow-md bg-slate-600 text-white dark:bg-white dark:text-slate-600 p-4 border-b-2 border-slate-300">
                  <button
                    onClick={() => handleCompletedTask(item)}
                    className="mr-4"
                  >
                    {item.actived ? (
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
                  <h2 className={`${item.actived ? "" : "line-through"}`}>
                    {item.task}
                  </h2>
                  <Icon
                    icon="typcn:delete-outline"
                    width={36}
                    onClick={() => handleDeletetTask(item)}
                    className="absolute top-4 right-4 cursor-pointer dark:hover:text-pink-400 hover:text-blue-500 transitionA"
                  />
                </li>
              </div>
            ))}
            {/* {mode === "active" &&
              tasks.map((item) => (
                <>
                  {item.actived === true && (
                    <li
                      key={item.id}
                      className="w-full relative flex justify-start items-center rounded-lg overflow-hidden mt-8 shadow-md bg-slate-600 text-white dark:bg-white dark:text-slate-600 p-4 border-b-2 border-slate-300"
                    >
                      <button
                        onClick={() => handleCompletedTask(item)}
                        className="mr-4"
                      >
                        {item.actived ? (
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
                      <h2 className={`${item.actived ? "" : "line-through"}`}>
                        {item.task}
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
                    <h2 className={`${item.actived ? "" : "line-through"}`}>
                      {item.task}
                    </h2>
                    <Icon
                      icon="typcn:delete-outline"
                      width={36}
                      onClick={() => handleDeletetTask(item)}
                      className="absolute top-4 right-4 cursor-pointer dark:hover:text-pink-400 hover:text-blue-500 transitionA"
                    />
                  </li>
                </>
              ))} */}
          </ul>
        </div>
      )}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium sm:block hidden dark:text-slate-500 text-white">
            {tasks.reduce((acc) => {
              acc++;
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
                mode === "actived"
                  ? "text-blue-500"
                  : "dark:text-slate-500 text-white hover:text-pink-500"
              }`}
              onClick={() => setMode("actived")}
            >
              Actived
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
            if (item.actived === true) {
              acc++;
            }
            return acc;
          }, 0)}{" "}
          items left
        </span>
      </div>
    </div>
  );
};

export default TaskList;
