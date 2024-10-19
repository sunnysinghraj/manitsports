import { NavLink } from "react-router-dom";

function MyButton({ link, name }) {
  return (
    <NavLink to={link}>
      <button className="hover:bg-slate-900 px-5 py-2.5 bg-slate-600 text-white border-none rounded-md min-w-[92px]">
        {name}
      </button>
    </NavLink>
  );
}

export default MyButton;
