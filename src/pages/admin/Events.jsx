import React, { useContext } from "react";
import EventContext from "../../context/myContext";
import Layout from "../../components/layout/Layout";

const MyEvents = () => {
  const { getAllEvents } = useContext(EventContext);

  return (
    <Layout>
      <div className="py-5 flex justify-center items-center my-10">
        <h1 className="text-xl text-black-300 font-bold">All Events</h1>
      </div>

      {/* Check if there are events and render accordingly */}
      {getAllEvents.length === 0 ? (
        <div className="flex justify-center my-5">
          <p className="text-slate-600 font-medium">No events scheduled</p>
        </div>
      ) : (
        // Table
        <div className="w-full overflow-x-auto mb-5">
          <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
            <tbody>
              <tr>
                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara"
                >
                  S.No.
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara"
                >
                  Event Name
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                >
                  Time
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100"
                >
                  Place
                </th>
              </tr>
              {getAllEvents.map((event, index) => {
                const {
                  id,
                  eventName,
                  startDate,
                  endDate,
                  startTime,
                  endTime,
                  place
                } = event;
                return (
                  <tr key={id} className="text-slate-300">
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                      {index + 1}.
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                      {eventName}
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                      {startDate} to {endDate}
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                      {startTime} - {endTime}
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                      {place}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default MyEvents;
 