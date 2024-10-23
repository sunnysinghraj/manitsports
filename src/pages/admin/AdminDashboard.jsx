import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import EventDetails from "./EventDetails";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);

  // Effect to load admin data from local storage
  useEffect(() => {
    const storedAdmin = localStorage.getItem("userData");
    // console.log("Stored Admin:", storedAdmin); // Debugging log

    if (storedAdmin) {
      try {
        const parsedAdmin = JSON.parse(storedAdmin);
        // console.log("Parsed Admin:", parsedAdmin); // Debugging log
        // Check if the user is an admin based on the "work" field
        if (parsedAdmin.work === "Admin") {
          setAdmin(parsedAdmin);
        }
      } catch (error) {
        // console.error("Error parsing admin from localStorage:", error);
        toast.error('Failed to fetch admin. Please try again later.');
      }
    }
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-5 lg:py-8 my-10">
        {/* Top */}
        <div className="top">
          {/* Main */}
          <div className="bg-slate-200 py-5 rounded-xl border border-slate-400">
            {/* Image */}
            <div className="flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                alt="admin-image"
                className="h-24 w-24"
              />
            </div>
            {/* Text */}
            <div className="">
              {admin ? (
                <>
                  <h1 className="text-center text-lg text-slate-600">
                    <span className="font-bold">Admin Name :</span> {admin.name}
                  </h1>
                  <h1 className="text-center text-lg text-slate-600">
                    <span className="font-bold">Email :</span> {admin.email}
                  </h1>
                </>
              ) : (
                <h1 className="text-center text-lg text-slate-600">
                  Admin details not found.
                </h1>
              )}
            </div>
            {/* Navigate Button */}
            <div className="flex justify-center mt-5">
              <Link to="/AddEvents">
                <button className="bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded-md font-bold">
                  AddEvents
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <EventDetails />
    </Layout>
  );
};

export default AdminDashboard;
