import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  // Effect to load user data from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    // console.log("Stored User:", storedUser); // Debugging log

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // console.log("Parsed User:", parsedUser); // Debugging log
        setUser(parsedUser);
      } catch (error) {
        // console.error("Error parsing user from localStorage:", error);
            toast.error("Error occured.kindly login again")
      }
    }
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-5 lg:py-8 my-10">
        {/* Top */}
        <div className="top">
          {/* main */}
          <div className="bg-slate-200 py-5 rounded-xl border border-slate-400">
            {/* image */}
            <div className="flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                alt="user-image"
                className="h-24 w-24"
              />
            </div>
            {/* text */}
            <div className="">
              {user ? (
                <>
                  <h1 className="text-center text-lg text-slate-600">
                    <span className="font-bold">Name :</span> {user.name}
                  </h1>
                  <h1 className="text-center text-lg text-slate-600">
                    <span className="font-bold">Email :</span> {user.email}
                  </h1>
                  <h1 className="text-center text-lg text-slate-600">
                    <span className="font-bold">Branch :</span> {user.branch}
                  </h1>
                  <h1 className="text-center text-lg text-slate-600">
                    <span className="font-bold">Scholar No :</span> {user.scholarNo}
                  </h1>
                  <h1 className="text-center text-lg text-slate-600">
                    <span className="font-bold">Sport :</span> {user.sport}
                  </h1>
                  <h1 className="text-center text-lg text-slate-600">
                    <span className="font-bold">Role :</span> {user.role}
                  </h1>
                  <h1 className="text-center text-lg text-slate-600">
                    <span className="font-bold">Work :</span> {user.work}
                  </h1>
                </>
              ) : (
                <h1 className="text-center text-lg text-slate-600">
                  User details not found.
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
