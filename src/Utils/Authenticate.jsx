import { storage } from "./Storage";
import { Navigate, Outlet } from "react-router-dom";

export default function Authenticate() {
  var token = storage.getToken();
  return token ? <Navigate to="/app/inbox" /> : <Outlet />;
}
