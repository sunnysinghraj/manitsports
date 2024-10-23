/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import myContext from "./myContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";

function EventState({ children }) {
  // Event State
  const [getAllEvents, setGetAllEvents] = useState([]);
  const [getAllUsers, setGetAllUsers] = useState([]);

  // Function to fetch events
  const getAllEventsFunction = async () => {
    try {
      const q = query(
        collection(fireDB, "events"),
        orderBy("createdAt") 
      );
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let eventArray = [];
        QuerySnapshot.forEach((doc) => {
          eventArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllEvents(eventArray);
      });
      return () => unsubscribe();
    } catch (error) {
      // console.log(error);
      toast.error('Failed to fetch events. Please try again later.');
    }
  };

  // Function to fetch users
  const getAllUsersFunction = async () => {
    try {
      const q = query(collection(fireDB, "users"));
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let userArray = [];
        QuerySnapshot.forEach((doc) => {
          userArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllUsers(userArray);
      });
      return () => unsubscribe();
    } catch (error) {
      // console.log(error);
      toast.error('Failed to fetch students. Please try again later.');
    }
  };

  useEffect(() => {
    getAllEventsFunction();
    getAllUsersFunction(); 
  }, []);

  return (
    <myContext.Provider
      value={{
        getAllEvents,
        getAllUsers, 
      }}
    >
      {children}
    </myContext.Provider>
  );
}

export default EventState;
