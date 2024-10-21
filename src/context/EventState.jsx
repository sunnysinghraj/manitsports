/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import myContext from './myContext';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';

function EventState({ children }) { 

    // Event State
    const [getAllEvents, setGetAllEvents] = useState([]);

    const getAllEventsFunction = async () => {
        try {
            const q = query(
                collection(fireDB, "events"),
                orderBy('createdAt') // Adjust the field based on your Firestore structure
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
            console.log(error);
        }
    };

    useEffect(() => {
        getAllEventsFunction();
    }, []);

    return (
        <myContext.Provider value={{
            getAllEvents
        }}>
            {children}
        </myContext.Provider>
    );
}

export default EventState;
