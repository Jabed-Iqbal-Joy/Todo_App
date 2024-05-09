import { MdAdd } from "react-icons/md";
import { nanoid } from "nanoid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../Urls/task";
import { useContext } from "react";
import { TasksContext } from "../context/TaskContext";
export default function CreateTask() {
  const { set_expandedTask } = useContext(TasksContext);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: (response) => {
      set_expandedTask(response.data.id);
      queryClient.invalidateQueries(["getTask"]);
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  return (
    <div>
      <button
        className="bg-none font-mono border-gray-400 border-b-2 w-full text-left p-2 flex items-center text-black hover:text-red-500"
        onClick={() => {
          mutation.mutate({ name: "" });
        }}
      >
        <MdAdd color="red" size={25} /> Add Task
      </button>
    </div>
  );
}
