import { useContext, useState } from "react";
import { TasksContext } from "../context/TaskContext";
import { GoNote } from "react-icons/go";
import { HiOutlinePlus } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import { RxCross1, RxTrash } from "react-icons/rx";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTaskById, fetchTasks, updateTask } from "../Urls/task";
import OutsideClickHandler from "react-outside-click-handler";
import { MdDateRange, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckbox } from "react-icons/io";
import { FaBookOpen, FaStar } from "react-icons/fa";
import { RiCheckboxMultipleBlankFill, RiBox1Fill } from "react-icons/ri";
import Calendar from "react-calendar";
import "../App.css";
import { getAllProject } from "../Urls/project";
import dayjs from "dayjs";

export default function TasksList() {
  const {
    isLoading,
    isError,
    data: tasks,
  } = useQuery({
    queryKey: ["getTask"],
    queryFn: fetchTasks,
  });

  if (isLoading) return <h1>Loading</h1>;
  if (isError) return <h1>Error!</h1>;

  return (
    <div className="p-2">
      {tasks?.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </div>
  );
}

function Task({ task }) {
  const { dispatch, expandedTask, set_expandedTask } = useContext(TasksContext);
  const [Expanded, setExpanded] = useState(task.id === expandedTask());
  const [taskStatus, set_taskStatus] = useState(false);
  const queryClient = useQueryClient();

  // dropdown State && Function
  const [when_dropdown, set_when_dropdown] = useState(false);
  const [deadline_dropdown, set_deadline_dropdown] = useState(false);
  const [project_dropdown, set_project_dropdown] = useState(false);
  const when_dropdown_on = () => {
    set_when_dropdown(true);
  };
  const when_dropdown_off = () => {
    set_when_dropdown(false);
  };
  const deadline_dropdown_on = () => {
    set_deadline_dropdown(true);
  };
  const deadline_dropdown_off = () => {
    set_deadline_dropdown(false);
  };
  const project_dropdown_on = () => {
    set_project_dropdown(true);
  };
  const project_dropdown_off = () => {
    set_project_dropdown(false);
  };

  const mutation = useMutation({
    mutationFn: updateTask,
  });

  const { data } = useQuery({
    queryKey: [`task`, task.id],
    queryFn: fetchTaskById,
    enabled: Expanded,
  });

  if (Expanded) {
    task = data;
  }

  if (!Expanded) {
    return (
      <div
        className="flex gap-2 items-center"
        key={task.id}
        onDoubleClick={(e) => {
          set_expandedTask(task.id);
          setExpanded(true);
        }}
      >
        <div
          className="checkbox "
          onClick={() => {
            set_taskStatus(!taskStatus);
          }}
        >
          {taskStatus ? (
            <IoMdCheckbox size={25} color="blue" />
          ) : (
            <MdOutlineCheckBoxOutlineBlank size={25} />
          )}
        </div>
        {/* <input type="checkbox" className="scale-152 ml-2" name="name" id="id" /> */}
        {task?.name?.length ? (
          <p className=" text-gray-600 p-1 text-xl">{task?.name}</p>
        ) : (
          <p className=" text-gray-600 p-1 text-xl">New To-Do</p>
        )}
      </div>
    );
  } else {
    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          set_expandedTask(null);
          setExpanded(false);
        }}
      >
        <div className="bg-white rounded-md shadow-md p-4 mb-2">
          {/*Task Title */}
          <div className="flex items-center py-2 border-b">
            <div
              className="checkbox"
              onClick={() => {
                set_taskStatus(!taskStatus);
              }}
            >
              {taskStatus ? (
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
                mutation.mutate(
                  { id: task?.id, name: e.target.value },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries(["getTask"]);
                    },
                  }
                );
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  set_expandedTask(null);
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
                mutation.mutate({ id: task?.id, note: e.target.value });
              }}
            />
          </div>

          {/* subtasks */}
          <div className="py-2 border-b">
            {task?.subTasks?.length > 0 ? (
              <ul className="mb-1">
                {task?.subTasks?.map((subTask) => {
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
                        (subTask.isCompleted
                          ? " text-gray-400"
                          : "text-gray-700")
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
                        defaultValue={subTask?.value}
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
            {task?.tags?.map((tag) => {
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
            {when_dropdown ? (
              <OutsideClickHandler onOutsideClick={when_dropdown_off}>
                <When_dropdown />
              </OutsideClickHandler>
            ) : null}
            <button
              className="border-none focus:outline-none ml-2 text-md text-gray-400"
              onClick={when_dropdown_on}
            >
              {task?.when === null ? (
                "Set when"
              ) : task?.when === "today" ? (
                <div className="flex items-center space-x-2 p-4  cursor-pointer px-2 py-1 rounded-md hover:bg-blue-100">
                  <FaStar color="#FFCE28" size={18} />
                  <span className="text-gray-500 font-normal text-md">
                    Today
                  </span>
                </div>
              ) : task?.when === "anytime" ? (
                <div className="flex items-center space-x-2 p-4  cursor-pointer rounded-md px-2 py-1 hover:bg-blue-100">
                  <RiCheckboxMultipleBlankFill color="#0CC2EF" size={18} />
                  <span className="text-gray-500 font-normal text-md">
                    Anytime
                  </span>
                </div>
              ) : task?.when === "someday" ? (
                <div className="flex items-center space-x-2 p-4  cursor-pointer rounded-md px-2 py-1 mb-2 hover:bg-blue-100">
                  <RiBox1Fill color="#86C022" size={18} />
                  <span className="text-gray-500 font-normal text-md">
                    Someday
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 p-4  cursor-pointer rounded-md px-2 py-1 mb-2 hover:bg-blue-100">
                  <MdDateRange color="#E87BA0" size={18} />
                  <span className="text-gray-500 font-normal text-md">
                    {task?.when}
                  </span>
                </div>
              )}
            </button>
          </div>

          {/* Project */}
          <div className="flex items-center py-2 border-b">
            <button
              className="border-none focus:outline-none ml-2 text-md text-gray-400"
              onClick={project_dropdown_on}
            >
              Project
            </button>
            {project_dropdown ? (
              <OutsideClickHandler onOutsideClick={project_dropdown_off}>
                <Project_dropdown />
              </OutsideClickHandler>
            ) : null}
          </div>

          {/* Deadline */}
          <div className="flex items-center py-2 border-b">
            {deadline_dropdown ? (
              <OutsideClickHandler onOutsideClick={deadline_dropdown_off}>
                <Deadline_dropdown mutation={mutation} />
              </OutsideClickHandler>
            ) : null}
            <button
              className="border-none focus:outline-none ml-2 text-md text-gray-400"
              onClick={deadline_dropdown_on}
            >
              {task?.date == null ? "Deadline" : task.date}
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    );
  }
}

function When_dropdown() {
  return (
    <div className=" bg-white p-2 shadow-md border-2 border-gray-200 w-[325px] absolute -mt-[350px]">
      <div className="flex items-center space-x-2 p-4  cursor-pointer rounded-md px-2 py-1 hover:bg-blue-100">
        <FaStar color="#FFCE28" size={18} />
        <span className="text-gray-500 font-normal text-md">Today</span>
      </div>
      <div className="flex items-center space-x-2 p-4  cursor-pointer rounded-md px-2 py-1 mb-2 hover:bg-blue-100">
        <RiCheckboxMultipleBlankFill color="#0CC2EF" size={18} />
        <span className="text-gray-500 font-normal text-md">Anytime</span>
      </div>
      {/* <div className="flex items-center space-x-2 p-4  cursor-pointer rounded-md px-2 py-1 mb-2 hover:bg-blue-100">
        <RiBox1Fill color="#86C022" size={18} />
        <span className="text-gray-500 font-normal text-md">Someday</span>
      </div> */}
      <Calendar />
    </div>
  );
}

function Deadline_dropdown({ mutation }) {
  const today = new Date();
  return (
    <div className=" bg-white p-2 shadow-md border-2 border-gray-200 w-[325px] absolute -mt-[300px]">
      <Calendar
        minDate={today}
        onChange={(date) => {
          date = dayjs(date).format("YYYY-MM-DD");
          console.log(date);
        }}
      />
      <button className=" w-full my-2 cursor-pointer p-1 rounded-md bg-gray-200  text-md hover:bg-blue-100">
        Remove Deadline
      </button>
    </div>
  );
}

function Project_dropdown() {
  const { data: projects } = useQuery({
    queryKey: [`projects`],
    queryFn: getAllProject,
  });
  return (
    <div className="bg-white p-2 shadow-md border-2 border-gray-200 w-[250px] absolute -ml-14 mt-4">
      <div className="flex items-center space-x-2 p-4 rounded-md  cursor-pointer px-2 py-1 mb-2 hover:bg-blue-100">
        <RxCross1 size={18} />
        <span className="text-gray-500 font-normal text-md">No Project</span>
      </div>
      {projects?.map((project) => {
        return (
          <div
            key={project.id}
            className="flex items-center space-x-4 p-4 rounded-md  cursor-pointer px-2 py-1 mt-2 hover:bg-blue-100"
          >
            <FaBookOpen size={18} />
            <span className="text-gray-500 font-normal text-md">
              {project.name === null
                ? "New Project"
                : project.name?.length > 20
                ? project.name.substring(0, 19) + "..."
                : project.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
