import Sidebar from "./Sidebar";

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 py-14 px-20">{children}</div>
    </div>
  );
}
