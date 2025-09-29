import React, { createContext, useState, useCallback } from "react";
import { BASE_URL } from "../config";

export const PricingContext = createContext();

export const PricingProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [agentGroups, setAgentGroups] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchPricing = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(`${BASE_URL}/api/pricing`);
			const json = await res.json();
			// normalize response shape
			const p = Array.isArray(json.products)
				? json.products
				: json.products || [];
			const g = Array.isArray(json.agentGroups)
				? json.agentGroups
				: json.agentGroups || [];
			setProducts(p);
			setAgentGroups(g);
			setLoading(false);
			return {
				status: res.status,
				data: { products: p, agentGroups: g },
			};
		} catch (err) {
			setLoading(false);
			setError(err.message || "Network error");
			return {
				status: 0,
				data: { products: [], agentGroups: [] },
				error: err.message,
			};
		}
	}, []);

	const updatePricings = useCallback(
		async (pricings = []) => {
			// pricings: [{ productId, agentGroupId, price }, ...]
			try {
				const res = await fetch(`${BASE_URL}/api/pricing/update`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ pricings }),
				});
				const json = await res.json();
				// on success, optionally re-fetch pricing
				if (res.ok) {
					// refresh local copy
					fetchPricing().catch(() => {});
				}
				return { status: res.status, data: json };
			} catch (err) {
				return { status: 0, error: err.message };
			}
		},
		[fetchPricing]
	);

	return (
		<PricingContext.Provider
			value={{
				products,
				agentGroups,
				fetchPricing,
				updatePricings,
				loading,
				error,
			}}
		>
			{children}
		</PricingContext.Provider>
	);
};

export default PricingContext;
