import React, { createContext } from "react";
import { BASE_URL } from "../config";

export const PromotionContext = createContext();

export const PromotionProvider = ({ children }) => {
	// Create Promotion
	const createPromotion = async (name, status, startDate, endDate) => {
		try {
			const response = await fetch(`${BASE_URL}/api/promotion/create`, {
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

	// Create Promotion with promotionProducts in one payload
	const createPromotionWithProducts = async (payload) => {
		try {
			const response = await fetch(`${BASE_URL}/api/promotion/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});
			const data = await response.json();
			// include status for callers
			return { status: response.status, ...data };
		} catch (error) {
			return { status: 500, message: "Network error" };
		}
	};

	// Create Promotion-Agent Group Association
	const createPromotionAgentGroup = async (payload) => {
		try {
			const response = await fetch(
				`${BASE_URL}/api/promotion-agent-group/create`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				}
			);
			const data = await response.json();
			return data;
		} catch (error) {
			return { status: 500, message: "Network error" };
		}
	};

	// Fetch promotions
	const fetchPromotions = async () => {
		try {
			const response = await fetch(`${BASE_URL}/api/promotion`, {
				headers: { Accept: "application/json" },
			});
			const data = await response.json();
			return data;
		} catch (error) {
			return { status: 500, message: "Network error", data: [] };
		}
	};

	const updatePromotion = async (promotionId, payload) => {
		try {
			const response = await fetch(
				`${BASE_URL}/api/promotion/${promotionId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				}
			);
			const data = await response.json();
			return { status: response.status, ...data };
		} catch (error) {
			return { status: 500, message: "Network error" };
		}
	};

	return (
		<PromotionContext.Provider
			value={{
				createPromotion,
				createPromotionWithProducts,
				createPromotionAgentGroup,
				fetchPromotions,
				updatePromotion,
			}}
		>
			{children}
		</PromotionContext.Provider>
	);
};
