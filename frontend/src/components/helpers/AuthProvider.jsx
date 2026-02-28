import React, { createContext,  useContext,  useEffect,  useState } from 'react'
import { useSearchParams } from "react-router-dom";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [errorLogged, setErrorLogged] = useState('');
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);
  const [LoggedRateLimit, setLoggedRateLimit] = useState(false);
  const [emailSend, setEmailSend] = useState('');
      
    const [searchParams] = useSearchParams();

    const tokenTemp = searchParams.get("token");
    const logout = async() => {
        await fetch(`${import.meta.env.VITE_PAGE_URL}/auth/logout`, {
          method: "POST",
          credentials: "include"
        });

      setIsLogged(false);
      setUser(null);
  }
  let emailTimeout;
    const sendEmailRegister = async ({ email }) => {
      setEmailSend("");
      clearTimeout(emailTimeout);
      const respEmail = await fetch(`${import.meta.env.VITE_PAGE_URL}/auth/register-sendEmail`, {
            method: "POST",
            credentials: "include",
            headers: {
          "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
      })
    const msg = await respEmail.text();
    if (respEmail.ok) { 
      setEmailSend(msg);
      emailTimeout = setTimeout(() => {
        setEmailSend('');
      }, 2000);
    }
    if (!respEmail.ok) {
      setEmailSend(msg);
      emailTimeout = setTimeout(() => {
        setEmailSend('');
      }, 2000);
    }
  }
    const LoginRegister = async ({ type, email, password }) => {
      if (type == "login") {
        const resLogin = await fetch(`${import.meta.env.VITE_PAGE_URL}/auth/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });
        const data = await resLogin.json();
        const msg = data.message;
        if (!resLogin.ok) {
          if (msg?.includes("wait a few minutes")) {
            setLoggedRateLimit(true);
          }
        setErrorLogged(msg || "Password or email invalids");
          setTimeout(() => {
            setErrorLogged('');
          }, 2000);
          return;
        }
        localStorage.setItem("token", data.token);
        setIsLogged(true);
      }
    }
    const RegisterFinish = async ({ type, password }) => {    
         if(type=="register"){
          const res = await fetch(`${import.meta.env.VITE_PAGE_URL}/auth/register?tokenTemp=${tokenTemp}`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ password })
          });
        const msg = await res.text();
          if (!res.ok) {
            setRegisterSuccess(false);
            setErrorRegister(msg);
            setTimeout(() => {
              setErrorRegister('');
            }, 2000);
            return;
          }
          setRegisterSuccess(true);
        }
      }
  const buttonRegisterFinish = async(type, password)=>{
    if(type && password)
    await RegisterFinish({type, password});
    return;
  }
  const buttonLogin = async (type, email, password) => {
    if (!password && email) {
      await sendEmailRegister({email:email})
      return;
    }
    if (!isLogged && type) {
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
    const res = await fetch(`${import.meta.env.VITE_PAGE_URL}/user/data`, {
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
    });
    if (!res.ok) {
      logout(); return;
    }
    const data = await res.json();
    setUser(data);
  };
  useEffect(() => {
    if(isLogged)
    fetchUser();
  
  }, [isLogged])
    return (
      <AuthContext.Provider value={{ isLogged, user, buttonLogin, logout, errorLogged, registerSuccess, setRegisterSuccess, errorRegister, emailSend, LoggedRateLimit,buttonRegisterFinish}}>
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