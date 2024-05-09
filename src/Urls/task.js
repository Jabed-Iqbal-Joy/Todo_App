import { axios } from "../Utils/Axios";

export async function fetchTasks() {
  const response = await axios.get("/tasks");
  return response?.data?.tasks;
}

export async function fetchTaskById({ queryKey }) {
  const id = queryKey[1];
  const response = await axios.get(`/task/${id}`);
  return response?.data?.task;
}

export async function createTask(data) {
  return await axios.post("/task", data);
}

export async function updateTask(data) {
  return await axios.put(`/task/${data.id}`, data);
}
