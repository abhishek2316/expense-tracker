import React, {createContext, useState} from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const updateUser = (userData) => {
        setUser(userData);
    };

    const cleanUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider
         value={{
            user,
            updateUser,
            cleanUser
         }}
        >
            {children}
        </UserContext.Provider>
    );
}   

export default UserProvider;