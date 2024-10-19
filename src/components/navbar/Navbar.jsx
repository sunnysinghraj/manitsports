import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navList = (
    <ul className="flex flex-auto flex-wrap pl-3 space-x-3 text-white font-medium text-md px-5">
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
          to={"/user-dashboard"}
        >
          User
        </NavLink>
      </li>
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
          to={"/event"}
        >
          Events
        </NavLink>
      </li>
    </ul>
  );
  return (
    <nav className=" bg-slate-600 sticky top-0 min-h-20 z-50">
      <div className="flex flex-col flex-auto items-center justify-center py-5 lg:flex-row lg:justify-between lg:py-7 lg:px-7 hover:">
        <div className="text-white ">
          <span>&lt;</span>
          <span>MANIT</span> <span className="font-bold">SPORTS /&gt;</span>
        </div>
        <div className="flex justify-center items-center">{navList}</div>
      </div>
    </nav>
  );
};

export default Navbar;
