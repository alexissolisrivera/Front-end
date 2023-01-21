import React, { useState, useEffect } from 'react';
const UserContext = React.createContext({});

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const initialUser = JSON.parse(localStorage.getItem("user"))
        setUser(initialUser);
    }, []);

    const login = (data) => {
        setUser({
            id: data.user.id,
            name: data.user.full_name,
        });

        window.localStorage.setItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN, data.token);
        window.localStorage.setItem("user", JSON.stringify({
            id: data.user.id,
            name: data.user.full_name,
        }));
    }

    const logout = () => {
        window.localStorage.removeItem(process.env.REACT_APP_LOCALSTORAGE_TOKEN);
        window.localStorage.removeItem("user");
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;