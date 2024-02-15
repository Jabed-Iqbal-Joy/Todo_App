import { useContext, useState } from "react";
import { TasksContext } from "../context/TaskContext";
import { GoNote } from "react-icons/go";
import { HiOutlinePlus } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import { RxTrash } from "react-icons/rx";

export default function TasksList() {
  const { tasks } = useContext(TasksContext);
  // console.log(tasks);
  return (
    <div className="p-2">
      {tasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </div>
  );
}

function Task({ task }) {
  const { dispatch } = useContext(TasksContext);
  const [Expanded, setExpanded] = useState(task.Expanded);

  if (!task.Expanded) {
    return (
      <div
        className="flex gap-2 items-center"
        key={task.id}
        onDoubleClick={(e) => {
          task.Expanded = true;
          setExpanded(task.Expanded);
        }}
      >
        {/* <button className="block h-4 w-4 border-gray-600 border-2" /> */}
        <input type="checkbox" className="scale-152 ml-2" name="name" id="id" />
        {task.title.length ? (
          <p className=" text-gray-600 p-1 text-xl">{task.title}</p>
        ) : (
          <p className=" text-gray-600 p-1 text-xl">New To-Do</p>
        )}
      </div>
    );
  } else {
    return (
      <div className="bg-white rounded-md shadow-md p-4 mb-2">
        <div className="flex items-center py-2 border-b">
          {/*Task Title */}
          <input type="checkbox" name="name" id="id" />
          <input
            className="border-none focus:outline-none ml-2"
            placeholder="New To-Do"
            type="text"
            aria-autocomplete="list"
            defaultValue={task.title}
            onChange={(e) => {
              dispatch({
                type: "UPDATE_TASK",
                id: task.id,
                title: e.target.value,
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                task.Expanded = false;
                setExpanded(task.Expanded);
              }
            }}
          />
        </div>
        {/* Task - Notes */}
        <div className="flex items-center py-2 border-b">
          <GoNote color="gray" />
          <input
            className="border-none focus:outline-none ml-2 text-md"
            placeholder="Notes"
            type="text"
            defaultValue={task.notes}
            onChange={(e) => {
              dispatch({
                type: "UPDATE_TASK",
                id: task.id,
                notes: e.target.value,
              });
            }}
          />
        </div>

        {/* subtasks */}
        <div className="py-2 border-b">
          {task.subTasks.length > 0 ? (
            <ul className="mb-1">
              {task.subTasks.map((subTask) => {
                const toggle = () => {
                  dispatch({
                    type: "UPDATE_SUBTASK",
                    id: task.id,
                    subTaskId: subTask.id,
                    isCompleted: !subTask.isCompleted,
                  });
                };
                return (
                  <li
                    className={
                      `text-md flex items-center space-x-2 w-full ml-1` +
                      (subTask.isCompleted ? " text-gray-400" : "text-gray-700")
                    }
                    key={subTask.id}
                  >
                    {!subTask.isCompleted ? (
                      <button
                        className="ml-1 w-3 h-3 border border-gray-500 rounded-full"
                        onClick={toggle}
                      ></button>
                    ) : (
                      <button onClick={toggle}>
                        <FaCheck fill="#165abc" size={12} />
                      </button>
                    )}
                    <input
                      defaultValue={subTask.value}
                      onChange={(e) => {
                        dispatch({
                          type: "UPDATE_SUBTASK",
                          id: task.id,
                          subTaskId: subTask.id,
                          value: e.target.value,
                        });
                      }}
                      className="border-none focus:outline-none ml-2 text-sm w-full"
                    />

                    <button
                      onClick={() => {
                        dispatch({
                          type: "DELETE_SUBTASK",
                          id: task.id,
                          subTaskId: subTask.id,
                        });
                      }}
                    >
                      <RxTrash height={12} width={15} color="black" />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}

          <div className="flex items-center py-0">
            <HiOutlinePlus color="gray" />
            <input
              className="border-none focus:outline-none ml-2 text-md"
              placeholder="New Subtask"
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch({
                    type: "ADD_SUBTASK",
                    id: task.id,
                    value: e.target.value,
                  });
                  e.target.value = "";
                }
              }}
            />
          </div>
        </div>
        {/* Tags */}
        <div className="flex items-center py-2 border-b">
          {task.tags.map((tag) => {
            return (
              <div
                key={tag.id}
                className="px-3 py-1 text-sm text-blue-500 bg-blue-100 rounded-xl mr-1"
              >
                <span>{tag.value}</span>
                <button
                  className="ml-2"
                  onClick={(e) => {
                    dispatch({
                      type: "DELETE_TAG",
                      id: task.id,
                      tagId: tag.id,
                    });
                  }}
                >
                  x
                </button>
              </div>
            );
          })}
          <input
            className="border-none focus:outline-none ml-2 text-md"
            placeholder="Add tags"
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dispatch({
                  type: "ADD_TAG",
                  id: task.id,
                  value: e.target.value,
                });
                e.target.value = "";
              }
            }}
          />
        </div>

        {/* Set when - Date */}
        <div className="flex items-center py-2 border-b">
          <input
            className="border-none focus:outline-none ml-2 text-md"
            placeholder="Set when"
            type="text"
            // onClick={c_dropdown()}
          />
        </div>

        {/* Project */}
        <div className="flex items-center py-2 border-b">
          <input
            className="border-none focus:outline-none ml-2 text-md"
            placeholder="Project"
            type="text"
          />
        </div>

        {/* Deadline */}
        <div className="flex items-center py-2 border-b">
          <input
            className="border-none focus:outline-none ml-2 text-md"
            placeholder="Deadline"
            type="text"
          />
        </div>
      </div>
    );
  }
}

// function c_dropdown() {
//   return (
//     <div className="dropdown h-60 w-80 bg-red-500">
//       <button className="dropbtn">Dropdown</button>
//       <div className="dropdown-content">
//         <a href="#">Link 1</a>
//         <a href="#">Link 2</a>
//         <a href="#">Link 3</a>
//       </div>
//     </div>
//   );
// }
