import { useState } from "react";
import { useGContext } from "../contexts/globalContext";
import { type Task } from "../contexts/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { generateUniqueId } from "../utils/helper";
import { PopupMessageFailed, PopupMessageSuccess } from "../utils/toasts";
import useToken from "../hooks/useToken";
const Task = () => {
  const { dispatch, setStateChange, userInfo, httpUrl } = useGContext();
  const [textTask, setTextTask] = useState<string>("");

  const { token } = useToken();

  const handleSubmitTask = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: userInfo?.id,
        task: textTask,
        isCompleted: false,
        isActived: true,
      }),
    };

    const response = await fetch(`${httpUrl}/api/create_task`, options);

    if (response.status !== 201 && response.status !== 200) {
      const errorData = await response.json();
      PopupMessageFailed("The task was not added");

      alert(errorData.message);
    } else {
      setStateChange(`${generateUniqueId()}`);
      PopupMessageSuccess("Added task.");
    }

    if (textTask.length > 0) {
      const temp: Task = {
        actived: true,
        completed: false,
        id: generateUniqueId(),
        task: textTask,
        created_at: "",
        updated_at: "",
      };
      dispatch({ type: "ADDTASK", payload: temp });
      setTextTask("");
    }
  };
  return (
    <form
      onSubmit={handleSubmitTask}
      className="w-full flex justify-between items-center rounded-lg overflow-hidden mt-8 bg-slate-600 text-white dark:bg-white dark:text-slate-600 p-4"
    >
      <input
        value={textTask}
        onChange={(e) => setTextTask(e.target.value)}
        placeholder="Create a new todo..."
        type="text"
        className="bg-slate-600 text-white dark:bg-white dark:text-slate-600  w-[90%]"
      />
      <button type="submit">
        <Icon
          icon="gg:add"
          width={32}
          className="dark:hover:text-pink-400 hover:text-blue-500 transitionA"
        />
      </button>
    </form>
  );
};

export default Task;
