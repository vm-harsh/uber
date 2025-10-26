import React, { createContext, useState } from 'react'




export const UserContext = createContext();

const UserProvider = ({children}) => {
  const serverURL = "http://localhost:3000";
  const [user,setUser] = useState(null);

  const value = {serverURL,user,setUser}

  return (
    <div>
      <UserContext.Provider value={value}>
        {children}
      </UserContext.Provider>
    </div>
  )
}

export default UserProvider