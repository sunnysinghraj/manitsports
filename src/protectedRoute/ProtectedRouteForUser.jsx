/* eslint-disable react/prop-types */
import { Navigate } from "react-router"

const ProtectedRouteForUser = ({children}) => {
    const user = JSON.parse(localStorage.getItem('userData'))
    if (user?.work === "User") {
      return children
    }
    else {
      return <Navigate to={'/login'}/>
    }
}

export default ProtectedRouteForUser