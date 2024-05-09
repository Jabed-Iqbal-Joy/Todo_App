import { storage } from "./../Utils/Storage";
import { createContext } from "react";
import { getUserData } from "../Urls/auth";

export const AuthContext = createContext();
var username;

export function AuthProvider({ children }) {
  const token = storage.getToken();
  try {
    const response = getUserData(token);
    username = response.username;
  } catch (err) {
    console.log(err.message);
  }

  const value = {
    username,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
