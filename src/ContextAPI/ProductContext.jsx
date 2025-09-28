import React, { createContext, useState } from "react";

export const ProductContext = createContext();

const BASE_URL = 'http://10.10.13.83:9365';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ name: "", code: "", category: "" });

  const fetchProducts = async (opts = {}) => {
    const p = opts.page || page;
    const pp = opts.perPage || perPage;
    const f = opts.filters || filters;

    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (p) params.set("page", p);
      if (pp) params.set("limit", pp);
      if (f.name) params.set("name", f.name);
      if (f.code) params.set("code", f.code);
      if (f.category) params.set("productCategoryId", f.category);

      const url = `${BASE_URL}/product${params.toString() ? `?${params.toString()}` : ""}`;
      const res = await fetch(url);
      const json = await res.json();

      if (!res.ok) {
        setError(json);
        setLoading(false);
        return { status: res.status, data: [] };
      }

      const data = Array.isArray(json.data) ? json.data : json;

      // total count heuristics
      let totalCount = 0;
      if (json.total !== undefined) totalCount = json.total;
      else if (json.totalCount !== undefined) totalCount = json.totalCount;
      else {
        const headerTotal = res.headers.get("x-total-count");
        totalCount = headerTotal ? Number(headerTotal) : data.length;
      }

      // Client-side paginate if backend returns whole list
      let finalData = data;
      if ((p || pp) && (!json.total && !json.totalCount && !res.headers.get("x-total-count"))) {
        const start = (p - 1) * pp;
        finalData = data.slice(start, start + pp);
      }

      setProducts(finalData);
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

  const applyFilters = async (newFilters = {}) => {
    const merged = { ...filters, ...newFilters };
    setFilters(merged);
    setPage(1);
    return fetchProducts({ page: 1, perPage, filters: merged });
  };

  const uniqueNames = Array.from(new Set(products.map((p) => p.name).filter(Boolean)));
  const uniqueCodes = Array.from(new Set(products.map((p) => p.code).filter(Boolean)));

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        page,
        perPage,
        total,
        fetchProducts,
        applyFilters,
        setPage: (p) => fetchProducts({ page: p, perPage, filters }),
        setPerPage: (pp) => fetchProducts({ page: 1, perPage: pp, filters }),
        uniqueNames,
        uniqueCodes,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
