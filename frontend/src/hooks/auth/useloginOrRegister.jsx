import { useState } from 'react';

export const useloginOrRegister = () => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
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
  return { LoginRegister, isLogged }
};
