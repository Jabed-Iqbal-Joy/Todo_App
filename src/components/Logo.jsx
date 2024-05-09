import { MdOutlineLibraryBooks } from "react-icons/md";

export default function Logo() {
  return (
    <div className="Logo flex items-center gap-5">
      <MdOutlineLibraryBooks size={50} color="#DE6264" />
      <h1 className=" text-2xl font-bold text-logo-color">Things</h1>
    </div>
  );
}
