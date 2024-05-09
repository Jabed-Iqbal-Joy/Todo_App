import Layout from "../components/Layout";
import { useContext, useState } from "react";
import { TasksContext } from "../context/TaskContext";
import { GoNote } from "react-icons/go";
import { HiOutlinePlus } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import { RxTrash } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import { RiCheckboxMultipleBlankFill, RiBox1Fill } from "react-icons/ri";
import Calendar from "react-calendar";
import "../App.css";

export default function Demopage() {
  const { tasks } = useContext(TasksContext);

  return (
    <Layout>
      <h1>Demopage</h1>
      <div className="p-2">
        {tasks.map((task) => {
          return <Task key={task.id} task={task} />;
        })}
      </div>
    </Layout>
  );
}

function Task({ task }) {
  const { dispatch } = useContext(TasksContext);
  const [Expanded, setExpanded] = useState(task.Expanded);

  const [check, set_check] = useState(false);

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
        {/*Task Title */}
        <div className="flex items-center py-2 border-b">
          <div
            className="checkbox "
            onClick={() => {
              setcheck(!check);
            }}
          >
            {check ? (
              <IoMdCheckbox size={17} color="blue" />
            ) : (
              <MdOutlineCheckBoxOutlineBlank size={17} />
            )}
          </div>
          <input
            className="border-none focus:outline-none ml-2 w-full"
            placeholder="New To-Do"
            type="text"
            aria-autocomplete="list"
            defaultValue={task?.name}
            onChange={(e) => {
              mutation.mutate({ id: task?.id, name: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                set_expandedTask(null);
                queryClient.invalidateQueries(["getTask"]);
                setExpanded(false);
              }
            }}
          />
        </div>
        {/* Task - Notes */}
        <div className="flex items-center py-2 border-b w-full">
          <GoNote color="gray" />
          <input
            className="border-none focus:outline-none ml-2 text-md"
            placeholder="Notes"
            type="text"
            defaultValue={task?.note}
            onChange={(e) => {
              mutation.mutate({ id: task.id, note: e.target.value });
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
          <When_dropdown />
          <button className="border-none focus:outline-none ml-2 text-md text-gray-400">
            Set When
          </button>
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

function When_dropdown() {
  return (
    <div className=" bg-white p-2 shadow-md border-2 border-gray-200 w-[325px] absolute -mt-[350px]">
      <div className="flex items-center space-x-2 p-4  cursor-pointer px-2 py-1 hover:bg-blue-100">
        <FaStar color="#FFCE28" size={18} />
        <span className="text-gray-500 font-normal text-md">Today</span>
      </div>
      <div className="flex items-center space-x-2 p-4  cursor-pointer px-2 py-1 hover:bg-blue-100">
        <RiCheckboxMultipleBlankFill color="#0CC2EF" size={18} />
        <span className="text-gray-500 font-normal text-md">Anytime</span>
      </div>
      <div className="flex items-center space-x-2 p-4  cursor-pointer px-2 py-1 hover:bg-blue-100">
        <RiBox1Fill color="#86C022" size={18} />
        <span className="text-gray-500 font-normal text-md">Someday</span>
      </div>
      <Calendar />
    </div>
  );
}
