import React, { createContext,  useContext,  useEffect,  useState } from 'react'
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [errorLogged, setErrorLogged] = useState(false);
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false)
    const logout = () => {
      localStorage.removeItem("token");
      setIsLogged(false);
      setUser(null);
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
      setErrorLogged(true);
      setRegisterSuccess(false);
      setErrorRegister(true);
      setTimeout(() => {
            setErrorRegister(false);
          setErrorLogged(false);
        }, 3000);
        return;
      }
    if (type === 'login') {   
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setIsLogged(true);
    }
    if(type==='register'){
       setRegisterSuccess(true);
    }
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
  const fetchUser = async () => { 
    const token = localStorage.getItem("token");
    if(!token){return}
    const res = await fetch("http://localhost:8085/user/data", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) {
      logout(); return;
    }
    const data = await res.json();
    console.log(data);
    setUser(data);
  };
  useEffect(() => {
    if(isLogged)
    fetchUser();
  
  }, [isLogged])
    return (
      <AuthContext.Provider value={{ isLogged, user, buttonLogin, logout, errorLogged, registerSuccess, setRegisterSuccess, errorRegister}}>
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