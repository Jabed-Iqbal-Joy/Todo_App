import { storage } from "./Storage";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  var token = storage.getToken();
  return token ? <Outlet /> : <Navigate to="/" />;
}
