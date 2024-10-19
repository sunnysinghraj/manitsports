import { useState } from "react"
import MyContext from "./myContext"

const MyState = ({children}) => {
  const name= "Sunny Kumar Singh"
  return (
    <MyContext.Provider value={name}>
        {children}
    </MyContext.Provider>
  )
}

export default MyState;
