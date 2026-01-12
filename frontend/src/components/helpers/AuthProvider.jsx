import React, { createContext,  useContext,  useState } from 'react'
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
    const logout = () => {
      localStorage.removeItem("token");
      setIsLogged(false);
    }
    const LoginRegister = async ({ type, email, password }) => {
      const res = await fetch(`http://localhost:8085/auth/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!res.ok) {
        throw new Error("Incorrect Credentials");
      }
      
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setIsLogged(true);
    };
  const buttonLogin = async (type, email, password) => {
    if (!isLogged) {
      if (type) {
        await LoginRegister({
          type: type,
          email: email,
          password: password,
        })
      }
    } else {
      console.log("You already logged it");
    }
  }
      
    return (
      <AuthContext.Provider value={{ isLogged, buttonLogin, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth = () => {
  const context = useContext(AuthContext); 

  if (!context) {
    throw new Error("useAuth error");
  }

  return context;
};