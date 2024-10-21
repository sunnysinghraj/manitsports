/* eslint-disable react/prop-types */
import { Navigate } from "react-router"

 const ProtectedRouteForAdmin = ({children}) => {
    const user = JSON.parse(localStorage.getItem('userData'))
    if (user?.work === "Admin") {
      return children
    }
    else {
      return <Navigate to={'/login'}/>
    }
}

export default ProtectedRouteForAdmin