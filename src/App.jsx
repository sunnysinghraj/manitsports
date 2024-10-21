import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Button } from "@material-tailwind/react";
import Home from "./pages/home/Home";
import Nopage from "./pages/nopage/Nopage";
import About from "./components/about/About";
import ScrollTop from "./components/scrollTop/ScrollTop";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import Contact from "./components/contact/Contact";
import Teams from "./components/teams/Teams";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Events from "./pages/admin/Events";
import EventState from "./context/EventState";
import  ProtectedRouteForAdmin  from "./protectedRoute/ProtectedRouteForAdmin";
import  ProtectedRouteForUser  from "./protectedRoute/ProtectedRouteForUser";
import AddEvents from "./pages/admin/AddEvents";
function App() {
  return (
    <EventState>
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Nopage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/teams" element={<Teams />} />
          {/* <Route
            path="/user-dashboard"
            element={
              <ProtectedRouteForUser>
                <UserDashboard />
              </ProtectedRouteForUser>
            }
          /> */}
          {/* <Route                                                 
            path="/admin-dashboard"
            element={
              <ProtectedRouteForUser>
                <AdminDashboard />
              </ProtectedRouteForUser>
            }
          /> */}
          {/* <Route
            path="/addevents"
            element={
              <ProtectedRouteForUser>
                <AddEvents />
              </ProtectedRouteForUser>
            }
          /> */}
          <Route path="/events" element={<Events />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/addevents" element={<AddEvents />} />
        </Routes>
      </Router>
    </EventState>
  );
}

export default App;
