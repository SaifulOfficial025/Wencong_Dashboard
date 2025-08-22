import React, { createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const registerUser = async (payload) => {
    try {
      const response = await fetch("http://10.10.13.83:9365/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { status: 500, message: "Network error" };
    }
  };

  return (
    <UserContext.Provider value={{ registerUser }}>
      {children}
    </UserContext.Provider>
  );
};
