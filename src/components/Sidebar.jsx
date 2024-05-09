import {
  FaInbox,
  FaStar,
  FaCalendarDay,
  FaClipboardCheck,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { RiCheckboxMultipleBlankFill } from "react-icons/ri";
import { RiBox1Fill } from "react-icons/ri";
import NavLink from "./NavLink";
import { useLocation } from "react-router-dom";
import { storage } from "../Utils/Storage";
import { getUserData } from "../Urls/auth";
import { useQuery } from "@tanstack/react-query";

const links = [
  {
    label: "Inbox",
    icon: <FaInbox color="#66B2ff" size={20} />,
    href: "/app/inbox",
    className: "mb-4",
  },
  {
    label: "Today",
    icon: <FaStar color="#FFCE28" size={20} />,
    href: "/app/today",
  },
  {
    label: "Upcoming",
    icon: <FaCalendarDay color="#FF447D" size={20} />,
    href: "/app/upcoming",
  },
  {
    label: "Anytime",
    icon: <RiCheckboxMultipleBlankFill color="#0CC2EF" size={20} />,
    href: "/app/anytime",
    className: "mb-4",
  },

  // {
  //   label: "Someday",
  //   icon: <RiBox1Fill color="#86C022" size={20} />,
  //   href: "/app/someday",
  //   className: "mb-4",
  // },
  {
    label: "Logbook",
    icon: <FaClipboardCheck color="#56D835" size={20} />,
    href: "/app/logbook",
  },
  {
    label: "Trash",
    icon: <FaTrash color="#898989" size={20} />,
    href: "/app/trash",
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const token = storage.getToken();
  const { data: username } = useQuery({
    queryKey: ["username"],
    queryFn: getUserData,
  });
  return (
    <div className="sidebar block h-screen w-60 bg-zinc-50 border-r flex flex-col fixed top-0">
      <div
        className={`mt-2 mx-auto  flex items-center space-x-4 p-4  cursor-pointer px-2 py-1 hover:bg-gray-200 `}
      >
        <FaUser />
        <span className="text-black font-normal text-xl">{username}</span>
      </div>
      <ul className="p-3">
        {links.map((link, index) => {
          return (
            <li key={index} className={link.className}>
              <NavLink {...link} isActive={link.href === pathname} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
