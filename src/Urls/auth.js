import { axios } from "../Utils/Axios";

export async function login(data) {
  return await axios.post("/login", data);
}

export async function signup(data) {
  return await axios.post("/register", data);
}

export async function getUserData(data) {
  const response = await axios.get("/userData", data);
  return response?.data?.username;
}
