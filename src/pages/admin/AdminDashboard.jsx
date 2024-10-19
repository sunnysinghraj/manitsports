import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";

const AdminDashboard = () => {
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
              <h1 className="text-center text-lg text-slate-600">
                <span className="font-bold">Admin Name :</span> Admin User
              </h1>
              <h1 className="text-center text-lg text-slate-600">
                <span className="font-bold">Email :</span> admin@example.com
              </h1>
            </div>
            {/* Navigate Button */}
            <div className="flex justify-center mt-5">
              <Link to="/events">
                <button className="bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded-md font-bold">
                  Go to Events
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
