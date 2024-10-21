import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    setUser(storedUser);
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);  // Clear user state
    navigate("/login");
  };

  // Navbar links with conditional rendering for users
  const navList = (
    <ul className="flex flex-auto flex-wrap pl-3 space-x-3 text-white font-medium text-md px-5">
      {/* Home */}
      <li>
        <NavLink
          className={(e) =>
            e.isActive ? "text-blue-500" : "hover:text-blue-500"
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>

      {/* Contact */}
      <li>
        <NavLink
          className={(e) =>
            e.isActive ? "text-blue-500" : "hover:text-blue-500"
          }
          to={"/contact"}
        >
          Contact
        </NavLink>
      </li>

      {/* About */}
      <li>
        <NavLink
          className={(e) =>
            e.isActive ? "text-blue-500" : "hover:text-blue-500"
          }
          to={"/about"}
        >
          About
        </NavLink>
      </li>

      {/* Conditional rendering based on user role */}
      {!user ? (
        <>
          {/* No user logged in */}
          <li>
            <NavLink
              className={(e) =>
                e.isActive ? "text-blue-500" : "hover:text-blue-500"
              }
              to={"/login"}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(e) =>
                e.isActive ? "text-blue-500" : "hover:text-blue-500"
              }
              to={"/register"}
            >
              Register
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(e) =>
                e.isActive ? "text-blue-500" : "hover:text-blue-500"
              }
              to={"/events"}
            >
              Events
            </NavLink>
          </li>
        </>
      ) : user?.work === "User" ? (
        <>
          {/* User logged in */}
          <li>
            <NavLink
              className={(e) =>
                e.isActive ? "text-blue-500" : "hover:text-blue-500"
              }
              to={"/user-dashboard"}
            >
              User
            </NavLink>
          </li>
          <li className="cursor-pointer hover:text-blue-500" onClick={logout}>
            Logout
          </li>
          <li>
            <NavLink
              className={(e) =>
                e.isActive ? "text-blue-500" : "hover:text-blue-500"
              }
              to={"/teams"}
            >
              Teams
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(e) =>
                e.isActive ? "text-blue-500" : "hover:text-blue-500"
              }
              to={"/events"}
            >
              Events
            </NavLink>
          </li>
        </>
      ) : user?.work === "Admin" ? (
        <>
          {/* Admin logged in */}
          <li>
            <NavLink
              className={(e) =>
                e.isActive ? "text-blue-500" : "hover:text-blue-500"
              }
              to={"/admin-dashboard"}
            >
              Admin
            </NavLink>
          </li>
          <li className="cursor-pointer hover:text-blue-500" onClick={logout}>
            Logout
          </li>
          <li>
            <NavLink
              className={(e) =>
                e.isActive ? "text-blue-500" : "hover:text-blue-500"
              }
              to={"/teams"}
            >
              Teams
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(e) =>
                e.isActive ? "text-blue-500" : "hover:text-blue-500"
              }
              to={"/events"}
            >
              Events
            </NavLink>
          </li>
        </>
      ) : null}
    </ul>
  );

  return (
    <nav className="bg-slate-600 sticky top-0 min-h-20 z-50">
      <div className="flex flex-col flex-auto items-center justify-center py-5 lg:flex-row lg:justify-between lg:py-7 lg:px-7">
        {/* Left: Brand Name */}
        <div className="text-white">
          <span>&lt;</span>
          <span>MANIT</span> <span className="font-bold">SPORTS /&gt;</span>
        </div>

        {/* Right: Navigation Links */}
        <div className="flex justify-center items-center">
          {navList}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
