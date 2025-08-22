import React, { createContext } from "react";

export const PromotionContext = createContext();

export const PromotionProvider = ({ children }) => {
  // Create Promotion
  const createPromotion = async (name, status, startDate, endDate) => {
    try {
      const response = await fetch("http://10.10.13.83:9365/api/promotion/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, status, startDate, endDate }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { status: 500, message: "Network error" };
    }
  };

  // Create Promotion-Agent Group Association
  const createPromotionAgentGroup = async (payload) => {
    try {
      const response = await fetch("http://10.10.13.83:9365/api/promotion-agent-group/create", {
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
    <PromotionContext.Provider value={{ createPromotion, createPromotionAgentGroup }}>
      {children}
    </PromotionContext.Provider>
  );
};
