import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import { v4 as uuidv4 } from "uuid"; // Optional: Use UUID for more control over unique IDs

const AddEvent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { eventName, startDate, endDate, startTime, endTime, place } = data;

    try {
      // Generate a unique ID for the event
      const uniqueID = uuidv4(); // Alternatively, you can omit this and let Firestore auto-generate the ID

      // Firestore: Store event details with unique ID
      await setDoc(doc(fireDB, "events", uniqueID), {
        eventName,
        startDate,
        endDate,
        startTime,
        endTime,
        place,
        createdAt: new Date(),
        id: uniqueID, // Store the ID in the document as well
      });
      toast.success("Event added successfully!");
      navigate("/events"); // Redirect to events page or desired route
    } catch (error) {
      console.error("Error writing to Firestore:", error);
      toast.error("Failed to add event. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen my-20">
        <div className="add-event-form bg-slate-100 px-6 lg:px-12 py-8 border border-slate-400 rounded-xl shadow-md">
          <h2 className="text-center text-3xl font-bold text-slate-600 mb-6">
            Add Event
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Event Name Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Event Name"
                {...register("eventName", {
                  required: "Event Name is required",
                })}
                className={`bg-slate-100 border ${
                  errors.eventName ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none placeholder-slate-400`}
              />
              {errors.eventName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.eventName.message}
                </p>
              )}
            </div>

            {/* Start Date Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Start Date (YYYY-MM-DD)"
                {...register("startDate", {
                  required: "Start Date is required",
                })}
                className={`bg-slate-100 border ${
                  errors.startDate ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none placeholder-slate-400`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            {/* End Date Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="End Date (YYYY-MM-DD)"
                {...register("endDate", { required: "End Date is required" })}
                className={`bg-slate-100 border ${
                  errors.endDate ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none placeholder-slate-400`}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.endDate.message}
                </p>
              )}
            </div>

            {/* Start Time Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Start Time (HH:MM AM/PM)"
                {...register("startTime", {
                  required: "Start Time is required",
                })}
                className={`bg-slate-100 border ${
                  errors.startTime ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none placeholder-slate-400`}
              />
              {errors.startTime && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            {/* End Time Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="End Time (HH:MM AM/PM)"
                {...register("endTime", { required: "End Time is required" })}
                className={`bg-slate-100 border ${
                  errors.endTime ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none placeholder-slate-400`}
              />
              {errors.endTime && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.endTime.message}
                </p>
              )}
            </div>

            {/* Place Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Place"
                {...register("place", { required: "Place is required" })}
                className={`bg-slate-100 border ${
                  errors.place ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none placeholder-slate-400`}
              />
              {errors.place && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.place.message}
                </p>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-slate-600 text-white px-4 py-2 rounded-md w-full hover:bg-slate-800 transition-colors"
            >
              {isSubmitting ? "Adding Event..." : "Add Event"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddEvent;
