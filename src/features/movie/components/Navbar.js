import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  return (
    <nav className="w-full z-50 p-4 fixed top-0 left-0 shadow-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
      <div className="flex justify-between items-center px-10">
        {/* App Title */}
        <div className="text-xl font-bold">Watchlist App</div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-10">
          {/* Home Link */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-lg transition duration-200 ${
                  isActive
                    ? "text-blue-500"
                    : "text-gray-600 dark:text-gray-300"
                } hover:text-gray-900 dark:hover:text-white`
              }
            >
              <AiFillHome size={20} />
              <span>Home</span>
            </NavLink>
          </li>

          {/* Watchlist Link */}
          <li>
            <NavLink
              to="/watchlist"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-lg transition duration-200 ${
                  isActive
                    ? "text-blue-500"
                    : "text-gray-600 dark:text-gray-300"
                } hover:text-gray-900 dark:hover:text-white`
              }
            >
              <FaBookmark size={20} />
              <span>Watchlist</span>
            </NavLink>
          </li>
          <DarkModeToggle />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
