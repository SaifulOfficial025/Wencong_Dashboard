import React, { createContext, useState, useCallback } from "react";
import { BASE_URL } from "../config";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const registerUser = useCallback(async (payload) => {
		try {
			const response = await fetch(`${BASE_URL}/api/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});
			const data = await response.json();
			return { status: response.status, data };
		} catch (err) {
			return {
				status: 0,
				data: { message: err.message || "Network error" },
			};
		}
	}, []);

	// Fetch all users
	const fetchUsers = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(`${BASE_URL}/api/auth/users`);
			const json = await res.json();
			const data = json.data !== undefined ? json.data : json;
			setUsers(Array.isArray(data) ? data : []);
			setLoading(false);
			return { status: res.status, data };
		} catch (err) {
			setLoading(false);
			setError(err.message || "Network error");
			return { status: 0, data: [] };
		}
	}, []);

	// Fetch single user by id
	const fetchUserById = useCallback(async (id) => {
		try {
			const res = await fetch(`${BASE_URL}/api/auth/users/${id}`);
			const json = await res.json();
			const data = json.data !== undefined ? json.data : json;
			return { status: res.status, data };
		} catch (err) {
			return { status: 0, data: null };
		}
	}, []);

	// Update user
	const updateUser = useCallback(async (id, payload) => {
		try {
			const res = await fetch(`${BASE_URL}/api/auth/users/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});
			const json = await res.json();
			return { status: res.status, data: json };
		} catch (err) {
			return {
				status: 0,
				data: { message: err.message || "Network error" },
			};
		}
	}, []);

	return (
		<UserContext.Provider
			value={{
				registerUser,
				fetchUsers,
				fetchUserById,
				updateUser,
				users,
				loading,
				error,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
