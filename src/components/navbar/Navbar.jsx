import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Load user data from localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const storedUser = JSON.parse(storedUserData);
        setUser(storedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null); // Clear user state
    navigate("/login");
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navbar links with conditional rendering for users
  const navList = (
    <ul
      className={`flex flex-col lg:flex-row lg:space-x-3 lg:pl-3 text-white font-medium text-md px-5 ${
        isMobileMenuOpen ? "block" : "hidden"
      } lg:flex`}
    >
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
      <div className="flex flex-col lg:flex-row items-center justify-between py-5 lg:py-7 lg:px-7">
        {/* Left: Brand Name */}
        <div className="text-white ml-4 lg:ml-0">
          <span>&lt;</span>
          <span>MANIT</span> <span className="font-bold">SPORTS /&gt;</span>
        </div>

        {/* Hamburger icon placed below the brand on the left */}
        <div className="lg:hidden flex flex-col items-start mt-4 ml-4">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Right: Navigation Links (hidden on small screens) */}
        <div className="hidden lg:flex justify-center items-center">
          {navList}
        </div>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden block sm:block md:block w-full mt-2">
            {navList}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
