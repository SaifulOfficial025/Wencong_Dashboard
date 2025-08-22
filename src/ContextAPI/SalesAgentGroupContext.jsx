import React, { createContext } from "react";

export const SalesAgentGroupContext = createContext();

export const SalesAgentGroupProvider = ({ children }) => {
  // Create agent group
  const createAgentGroup = async (name, status) => {
    try {
      const response = await fetch("http://10.10.13.83:9365/api/agent-group/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, status }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { status: 500, message: "Network error" };
    }
  };

  // Fetch agent groups
  const fetchAgentGroups = async () => {
    try {
      const response = await fetch("http://10.10.13.83:9365/api/agent-group");
      const data = await response.json();
      return data;
    } catch (error) {
      return { status: 500, message: "Network error", data: [] };
    }
  };

  return (
    <SalesAgentGroupContext.Provider value={{ createAgentGroup, fetchAgentGroups }}>
      {children}
    </SalesAgentGroupContext.Provider>
  );
};
