import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 py-14 px-20 ml-52">{children}</div>
    </div>
  );
}
