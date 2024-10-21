import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig"; 
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";

const UpdateEvent = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // Get event ID from URL

  // Fetch the event data when the component is mounted
  const fetchEvent = async () => {
    try {
      const eventDoc = await getDoc(doc(fireDB, "events", id));
      if (eventDoc.exists()) {
        const eventData = eventDoc.data();
        // Set the form fields with event data
        setValue("eventName", eventData.eventName);
        setValue("startDate", eventData.startDate);
        setValue("endDate", eventData.endDate);
        setValue("startTime", eventData.startTime);
        setValue("endTime", eventData.endTime);
        setValue("place", eventData.place);
        setValue("description", eventData.description);
      } else {
        toast.error("Event not found.");
        navigate("/events");
      }
    } catch (error) {
      console.error("Error fetching event:", error);
      toast.error("Failed to fetch event.");
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const onSubmit = async (data) => {
    const { eventName, startDate, endDate, startTime, endTime, place, description } = data;

    try {
      // Update the event in Firestore using the same event ID from URL (params)
      await setDoc(doc(fireDB, "events", id), {
        eventName,
        startDate,
        endDate,
        startTime,
        endTime,
        place,
        description,
        updatedAt: new Date(), // Track the update time
        id, // Keep the same event ID
      }, { merge: true }); // Use merge to only update the fields provided without overwriting the document

      toast.success("Event updated successfully!");
      navigate("/events");
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen my-20">
        <div className="update-event-form bg-slate-100 px-6 lg:px-12 py-8 border border-slate-400 rounded-xl shadow-md">
          <h2 className="text-center text-3xl font-bold text-slate-600 mb-6">
            Update Event
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Event Name Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Event Name"
                {...register("eventName", { required: "Event Name is required" })}
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
                {...register("startDate", { required: "Start Date is required" })}
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
                {...register("startTime", { required: "Start Time is required" })}
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

            {/* Description Input */}
            <div className="mb-4">
              <textarea
                placeholder="Description"
                {...register("description", { required: "Description is required" })}
                className={`bg-slate-100 border ${
                  errors.description ? "border-red-500" : "border-slate-400"
                } px-4 py-2 w-full rounded-md outline-none placeholder-slate-400`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-slate-600 text-white px-4 py-2 rounded-md w-full hover:bg-slate-800 transition-colors"
            >
              {isSubmitting ? "Updating Event..." : "Update Event"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateEvent;
