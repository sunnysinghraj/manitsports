import Layout from "../../components/layout/Layout";

const UserDashboard = () => {
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
              <h1 className="text-center text-lg text-slate-600">
                <span className="font-bold">Name :</span> Sunny Kumar Singh
              </h1>
              <h1 className="text-center text-lg text-slate-600">
                <span className="font-bold">Email :</span> rajsaurya761@gmail.com
              </h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
