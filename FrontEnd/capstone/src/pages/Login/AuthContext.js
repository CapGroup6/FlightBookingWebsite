import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
    token: null,
    username: null,
    login: () => {},
    logout: () => {}
});

export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({
        token: null,
        username: null
    });

    // 初始化时从localStorage中加载authState
    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            console.log("Loaded from localStorage:", { token, username }); // 添加这一行来检查从localStorage加载的数据
            if (token && username) {
                setAuthState({ token, username });
            }
        }
    }, []);

    const login = (token, username) => {
      if (typeof window !== "undefined") {
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          setAuthState({ token, username });
          console.log("Login set in localStorage and state", { token, username });
      }
  };

    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        }
        setAuthState({ token: null, username: null });
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
