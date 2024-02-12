import { useState } from "react";
import { useGContext } from "../contexts/globalContext";
import { type Task } from "../contexts/types";
import { Icon } from "@iconify/react/dist/iconify.js";
const Task = () => {
  const { dispatch } = useGContext();
  const [textTask, setTextTask] = useState<string>("");

  function generateUniqueId() {
    const timestamp = new Date().getTime().toString(16);
    const randomPart = Math.random().toString(16).substr(2, 8);
    return `${timestamp}-${randomPart}`;
  }
  const handleAddTask = () => {
    if (textTask.length > 0) {
      const temp: Task = {
        active: true,
        complete: false,
        id: generateUniqueId(),
        text: textTask,
      };
      dispatch({ type: "ADDTASK", payload: temp });
      setTextTask("");
    }
  };
  return (
    <div className="w-full flex justify-between items-center rounded-lg overflow-hidden mt-8 bg-slate-600 text-white dark:bg-white dark:text-slate-600 p-4">
      <input
        value={textTask}
        onChange={(e) => setTextTask(e.target.value)}
        placeholder="Create a new todo..."
        type="text"
        className="bg-slate-600 text-white dark:bg-white dark:text-slate-600  w-[90%]"
      />
      <button onClick={handleAddTask}>
        <Icon
          icon="gg:add"
          width={32}
          className="dark:hover:text-pink-400 hover:text-blue-500 transitionA"
        />
      </button>
    </div>
  );
};

export default Task;
