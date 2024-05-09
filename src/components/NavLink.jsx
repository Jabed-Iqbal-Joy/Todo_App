import { Link, Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function NavLink({ label, icon, href, isActive }) {
  return (
    <div className="div">
      <Link to={href}>
        <div
          className={`flex items-center space-x-4 p-4  cursor-pointer px-2 py-1 ${
            isActive ? "bg-gray-200" : ""
          }`}
        >
          {icon}
          <span className="text-gray-500 font-normal text-xl">{label}</span>
        </div>
      </Link>
      <Outlet />
    </div>
  );
}
