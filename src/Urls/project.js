import { axios } from "../Utils/Axios";

export async function getAllProject() {
  const response = await axios.get("/projects");
  return response?.data?.projects;
}
