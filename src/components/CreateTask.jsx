import { useContext } from "react";
import { MdAdd } from "react-icons/md";
import { TasksContext } from "../context/TaskContext";
import { nanoid } from "nanoid";
export default function CreateTask() {
  const { tasks, dispatch } = useContext(TasksContext);
  return (
    <div>
      <button
        className="bg-none font-mono border-gray-400 border-b-2 w-full text-left p-2 flex items-center text-black hover:text-red-500"
        onClick={() => {
          dispatch({
            type: "CREATE_TASK",
            id: nanoid(),
            title: "",
            Expanded: true,
          });
        }}
      >
        <MdAdd color="red" size={25} /> Add Task
      </button>
    </div>
  );
}
