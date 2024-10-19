import Layout from "../layout/Layout";

export default function About() {
  return (
    <>
      <Layout>
        <div className="py-16 bg-white">
          <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
            <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
              <div className="md:5/12 lg:w-5/12">
                <img className="rounded-md"
                  src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="image"
                />
              </div>
              <div className="md:7/12 lg:w-6/12">
                <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                Our development is driven by the passion of dedicated developers
                </h2>
                <p className="mt-6 text-gray-600">
                  Developer:
                  <ul>
                    <li>Name: Sunny Kumar Singh</li>
                    <li>Scholar Number: 211112263</li>
                  </ul>
                </p>
                <p className="mt-4 text-gray-600">
                  Made using React+Vite+Firebase with pinch of Material UI and
                  icond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
