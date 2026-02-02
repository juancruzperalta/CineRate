import React, { createContext,  useContext,  useEffect,  useState } from 'react'
import { useSearchParams } from 'react-router-dom';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [errorLogged, setErrorLogged] = useState('');
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);
  const [LoggedRateLimit, setLoggedRateLimit] = useState(false);
  const [tokenTemp, setTokenTemp] = useState(null);
  const [emailSend, setEmailSend] = useState('');
  const [searchParams] = useSearchParams();
    const logout = () => {
      localStorage.removeItem("token");
      setIsLogged(false);
      setUser(null);
  }

  useEffect(() => {
    setTokenTemp(searchParams.get("token"));
  }, [searchParams]);
  const sendEmailRegister = async ({ email }) => {
    const respEmail = await fetch(`${import.meta.env.VITE_PAGE_URL}/auth/register-sendEmail`, {
          method: "POST",
          headers: {
        "Content-Type": "application/json"
          },
          body: JSON.stringify({email})
    })
    const msg = await respEmail.text();
    if (respEmail.ok) { 
      setEmailSend(msg);
      setTimeout(() => {
        setEmailSend('');
      }, 3000);
    }
    if (!respEmail.ok) {
      setEmailSend(msg);
    }
  }
    const LoginRegister = async ({ type, email, password }) => {
      if (type == "login") {
        const resLogin = await fetch(`${import.meta.env.VITE_PAGE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });
        const msg = await resLogin.text();
        if (msg.includes("wait a few minutes")) {
          setLoggedRateLimit(true);
        }
        setErrorLogged(msg);
        if (!resLogin.ok) {
          setErrorLogged(msg);
          setTimeout(() => {
            setErrorLogged('');
          }, 3000);
          return;
        }
        const data = await resLogin.json();
        localStorage.setItem("token", data.token);
        setIsLogged(true);
      }
      if(type=="register"){
         if (tokenTemp) {
          const res = await fetch(`${import.meta.env.VITE_PAGE_URL}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ tokenTemp, email, password })
          });
               const msg = await res.text();
          if (!res.ok) {
            setRegisterSuccess(false);
            setErrorRegister(msg);
            setTimeout(() => {
              setErrorRegister('');
            }, 3000);
            return;
          }
          setRegisterSuccess(true);
        }
      }
    }
  const buttonLogin = async (type, email, password) => {
    if (!password) {
      await sendEmailRegister({email:email})
    }
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
    const res = await fetch(`${import.meta.env.VITE_PAGE_URL}/user/data`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
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
      <AuthContext.Provider value={{ isLogged, user, buttonLogin, logout, errorLogged, registerSuccess, setRegisterSuccess, errorRegister, emailSend, LoggedRateLimit}}>
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