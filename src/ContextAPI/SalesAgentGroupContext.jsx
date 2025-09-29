import React, { createContext } from "react";
import { BASE_URL } from "../config";

export const SalesAgentGroupContext = createContext();

export const SalesAgentGroupProvider = ({ children }) => {
	// Create agent group
	const createAgentGroup = async (name, status) => {
		try {
			const response = await fetch(`${BASE_URL}/api/agent-group/create`, {
				method: "POST",
				headers: {
					Accept: "application/json",
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
			const response = await fetch(`${BASE_URL}/api/agent-group`, {
				headers: { Accept: "application/json" },
			});
			const data = await response.json();
			return data;
		} catch (error) {
			return { status: 500, message: "Network error", data: [] };
		}
	};

	return (
		<SalesAgentGroupContext.Provider
			value={{ createAgentGroup, fetchAgentGroups }}
		>
			{children}
		</SalesAgentGroupContext.Provider>
	);
};
