import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import MyButton from "../../components/myButtons/MyButtons";

const Home = () => {
  const [user, setUser] = useState(null);

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

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center py-6 space-y-3 my-10">
        <div className="">
          <img
            src="/homePic.png"
            alt="Welcome Image"
            className="max-h-[181px] max-w-[180px]"
          />
        </div>
        <div className="">
          <p className="m-auto font-bold text-slate-600 text-wrap text-center">
            Welcome To NIT BHOPAL SPORTS
          </p>
        </div>
        <div className="">
          <p className="m-auto font-bold text-slate-600 text-wrap text-center">
            Sports do not build character, They reveal it.
          </p>
        </div>

        {/* Conditionally render buttons or user's name */}
        <div className="flex flex-col items-center py-10 space-y-4">
          {user ? (
            <p className="font-bold text-slate-600">
              Welcome, {user.name} !
            </p>
          ) : (
            <>
              <MyButton link="/login" name="Login" />
              <MyButton link="/register" name="Register" />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
