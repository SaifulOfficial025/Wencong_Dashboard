import React, { createContext, useState } from "react";

export const OrderContext = createContext();

const BASE_URL = 'http://10.10.13.83:9365';

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Create order
  const createOrder = async (payload) => {
    try {
      const res = await fetch(`${BASE_URL}/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return { status: res.status, data };
    } catch (err) {
      return { status: 0, data: { message: err.message || "Network error" } };
    }
  };

  // Fetch orders with optional pagination/filters
  const fetchOrders = async (opts = {}) => {
    const p = opts.page || page;
    const pp = opts.perPage || perPage;

    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (p) params.set("page", p);
      if (pp) params.set("limit", pp);
      // allow passing filters via opts.filters
      if (opts.filters) {
        Object.keys(opts.filters).forEach((k) => {
          if (opts.filters[k] !== undefined && opts.filters[k] !== "") {
            params.set(k, opts.filters[k]);
          }
        });
      }

      const url = `${BASE_URL}/order${params.toString() ? `?${params.toString()}` : ""}`;
      const res = await fetch(url);
      const json = await res.json();

      if (!res.ok) {
        setError(json);
        setLoading(false);
        return { status: res.status, data: [] };
      }

      const data = Array.isArray(json.data) ? json.data : (json.data || json);

      // determine total count
      let totalCount = 0;
      if (json.total !== undefined) totalCount = json.total;
      else if (json.totalCount !== undefined) totalCount = json.totalCount;
      else if (json.count !== undefined) totalCount = json.count;
      else {
        const headerTotal = res.headers.get("x-total-count");
        totalCount = headerTotal ? Number(headerTotal) : (Array.isArray(data) ? data.length : 0);
      }

      // client-side pagination if needed
      let finalData = data;
      if ((p || pp) && (!json.total && !json.totalCount && !res.headers.get("x-total-count"))) {
        const start = (p - 1) * pp;
        finalData = (data || []).slice(start, start + pp);
      }

      setOrders(finalData || []);
      setTotal(totalCount);
      setPage(p);
      setPerPage(pp);
      setLoading(false);
      return { status: res.status, data: finalData };
    } catch (err) {
      setLoading(false);
      setError(err.message || "Network error");
      return { status: 0, data: [] };
    }
  };

  const fetchOrderById = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/order/${id}`);
      const json = await res.json();
      if (!res.ok) return { status: res.status, data: null };
      return { status: res.status, data: json.data || json };
    } catch (err) {
      return { status: 0, data: null };
    }
  };

  return (
    <OrderContext.Provider
      value={{
        createOrder,
        fetchOrders,
        fetchOrderById,
        orders,
        total,
        page,
        perPage,
        setPage: (p) => fetchOrders({ page: p, perPage }),
        setPerPage: (pp) => fetchOrders({ page: 1, perPage: pp }),
        loading,
        error,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
