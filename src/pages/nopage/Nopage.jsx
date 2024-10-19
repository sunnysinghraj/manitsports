import React from "react";
import { NavLink } from "react-router-dom";
const Nopage = () => {
  return (
    <div className="flex flex-col justify-center items-center m-auto my-8 ">
      <div className="my-5">
        <img className="max-h-96 rounded-3xl"
          src="https://img.freepik.com/vektoren-premium/404-fehlerseite-nicht-gefunden-konzept-illustration_108061-170.jpg?w=740"
          alt="img"
        />
      </div>
      <div className="text-slate-600 border-spacing-6 my-5 text-wrap text-center">you may have entered a wrong url</div>
      <div className="">
        <NavLink to="/" className="text-blue-600 hover:underline hover:text-slate-600">Go Back To Home</NavLink>
      </div>
    </div>
  );
};

export default Nopage;
