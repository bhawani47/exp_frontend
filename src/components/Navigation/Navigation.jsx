import { useState, useContext } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { AuthContext } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import ErrorToast from "../ErrorBox";

const DesktopMenu = () => {
const { logout, isAuthenticated ,user } = useContext(AuthContext);
console.log(user)
  return (
    <div className="hidden sm:flex gap-4">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {isAuthenticated ? (
            <>
              <li className="text-base-content font-semibold px-4 py-2">
              {user.name}

              </li>
              <li>
                <Link className="text-base-content">Profile Settings</Link>
              </li>
              <li>
                <a onClick={() => logout()} className="text-base-content">
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <>
              <li>
                <Link to='/login' className="text-base-content">Login</Link>
              </li>
              <li>
                <Link to='/register' className="text-base-content">Sign Up</Link>
              </li>
            </>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

const MobileMenu = () => {
  const { logout, isAuthenticated, user, error } = useContext(AuthContext);
  const [isLoggedIn] = useState(true);
  const [userName] = useState("John Doe");


  return (
    <div className="sm:hidden">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {isAuthenticated ? (
            <>
              <li className="text-base-content font-semibold px-4 py-2">
                {user.name}
              </li>
              <li>
                <a className="text-base-content">Profile Settings</a>
              </li>
              <li>
                <a onClick={() => logout()} className="text-base-content">
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login' className="text-base-content">Login</Link>
              </li>
              <li>
                <Link to='/register' className="text-base-content">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

const Navigation = () => {
  return (
   <>
    <ErrorToast />
    <nav className="w-full h-16 p-1 px-10 flex justify-between items-center z-50 bg-black text-primary-content">
      <h1 className="sm:text-2xl text-xl font-bold tracking-wide">
        <Link to="/">Expense Tracker</Link>
      </h1>
      <div className="sm:w-1/3 w-3/5 flex gap-4 justify-end items-center">
        <ThemeSwitcher />
        <DesktopMenu />
        <MobileMenu />
      </div>
    </nav>
   </>
  );
};

export default Navigation;
