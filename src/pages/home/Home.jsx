import React from "react";
import Layout from "../../components/layout/Layout";
import { NavLink } from "react-router-dom";
import MyButton from "../../components/myButtons/MyButtons";
const Home = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center py-6 space-y-3 my-10">
        <div className="">
          <img
            src="/homePic.png"
            alt=""
            className="max-h-[181px] max-w-[180px]"
          />
        </div>
        <div className="">
          <p className="m-auto font-bold text-slate-600  text-wrap text-center">
            Welcome To NIT BHOPAL SPORTS
          </p>
        </div>
        <div className="">
          <p className="m-auto font-bold text-slate-600  text-wrap text-centre">
            Sports do not build character, They reveal it.
          </p>
        </div>
        <div className=""></div>
        <MyButton link="/login" name="login" />
        <MyButton link="/register" name="register" />
      </div>
    </Layout>
  );
};

export default Home;
