import React, { useContext } from "react";
import { Link } from "react-router-dom";
import EventContext from "../../context/myContext";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const MyEvents = () => {
  const context = useContext(EventContext);
  const { getAllEvents } = context;

  // Delete event function
  const deleteEvent = async (id) => {
    try {
      await deleteDoc(doc(fireDB, "events", id)); 
      toast.success("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event: ", error);
      toast.error("Failed to delete event");
    }
  };

  return (
    <div className="p-5">
      {/* No Events Message */}
      {getAllEvents.length === 0 ? (
        <div className="text-center text-slate-500">
          <p>No event scheduled</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto mb-5">
          <table className="w-full text-left border border-collapse sm:border-separate border-slate-100 text-slate-600">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-slate-100 bg-slate-200 font-bold"
                >
                  S.No.
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-slate-100 bg-slate-200 font-bold"
                >
                  Event Name
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-slate-100 bg-slate-200 font-bold"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-slate-100 bg-slate-200 font-bold"
                >
                  Time
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-slate-100 bg-slate-200 font-bold"
                >
                  Place
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-slate-100 bg-slate-200 font-bold"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
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
                  <tr key={id} className="text-slate-600">
                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-slate-600">
                      {index + 1}.
                    </td>
                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-slate-100">
                      {eventName}
                    </td>
                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-slate-100">
                      {startDate} to {endDate}
                    </td>
                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-slate-100">
                      {startTime} - {endTime}
                    </td>
                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-slate-100">
                      {place}
                    </td>
                    <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-slate-100">
                      <Link to={`/updateevent/${id}`} className="text-blue-500 hover:underline">Edit</Link>
                      <span className="mx-2">|</span>
                      <button
                        onClick={() => deleteEvent(id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
