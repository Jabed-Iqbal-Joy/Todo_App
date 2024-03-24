import {
  FaInbox,
  FaStar,
  FaCalendarDay,
  FaClipboardCheck,
  FaTrash,
} from "react-icons/fa";
import { RiCheckboxMultipleBlankFill } from "react-icons/ri";
import { RiBox1Fill } from "react-icons/ri";
import NavLink from "./NavLink";
import { useLocation } from "react-router-dom";

const links = [
  {
    label: "Inbox",
    icon: <FaInbox color="#66B2ff" size={20} />,
    href: "/",
    className: "mb-4",
  },
  {
    label: "Today",
    icon: <FaStar color="#FFCE28" size={20} />,
    href: "/today",
  },
  {
    label: "Anytime",
    icon: <RiCheckboxMultipleBlankFill color="#0CC2EF" size={20} />,
    href: "/anytime",
  },
  {
    label: "Upcoming",
    icon: <FaCalendarDay color="#FF447D" size={20} />,
    href: "/upcoming",
  },
  {
    label: "Someday",
    icon: <RiBox1Fill color="#86C022" size={20} />,
    href: "/someday",
    className: "mb-4",
  },
  {
    label: "Logbook",
    icon: <FaClipboardCheck color="#56D835" size={20} />,
    href: "/logbook",
  },
  {
    label: "Trash",
    icon: <FaTrash color="#898989" size={20} />,
    href: "/trash",
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <div className="sidebar block h-screen w-52 bg-zinc-50 border-r flex flex-col fixed top-0">
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
