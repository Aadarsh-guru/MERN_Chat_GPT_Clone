import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState('')

    axios.defaults.headers.common["Authorization"] = auth;

    useEffect(() => {
        if (!auth) {
            setAuth(JSON.parse(localStorage.getItem('token')))
        }
    }, [auth])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider