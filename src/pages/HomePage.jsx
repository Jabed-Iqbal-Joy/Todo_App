import { MdOutlineLibraryBooks } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function HomePage() {
  return (
    <div className=" mx-24">
      <div className="Navbar  p-4 flex justify-between">
        <Logo />
        <div className="Btn">
          <button className="text-lg rounded-lg p-2 font-medium text-black hover:bg-gray-200">
            Features
          </button>
          <Link to="/auth/login">
            <button className="text-lg rounded-lg p-2 font-medium text-black  hover:bg-gray-200">
              LogIn
            </button>
          </Link>
          <Link to="/auth/signup">
            <button className="text-lg rounded-lg p-2 font-medium text-black  hover:bg-gray-200">
              Registration
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
