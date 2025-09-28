import React, { createContext, useState } from "react";

export const SalesContext = createContext();

const BASE_URL = 'http://10.10.13.83:9365';

export const SalesProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [agents, setAgents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState({ username: "", agentCode: "", agentGroup: "", search: "" });
  const [agentGroups, setAgentGroups] = useState([]);

  // createAgent expects a FormData instance (for multipart/form-data)
  const createAgent = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      // Debug: list formData entries (for development troubleshooting)
      try {
        for (const pair of formData.entries()) {
          // eslint-disable-next-line no-console
          console.log("[SalesContext] formData entry:", pair[0], pair[1]);
        }
      } catch (e) {
        // ignore
      }
      const res = await fetch(`/api/agents/create`, {
        method: "POST",
        // Not setting Content-Type so browser sets multipart/form-data boundary automatically
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data);
      }
      setLoading(false);
      return { status: res.status, data };
    } catch (err) {
      setLoading(false);
      setError(err.message || "Network error");
      return { status: 0, data: { message: err.message || "Network error" } };
    }
  };

  // Fetch agents from API with optional pagination and filters.
  const fetchAgents = async (opts = {}) => {
    const p = opts.page || page;
    const pp = opts.perPage || perPage;
    const f = opts.filters || filters;

    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      // Try to use common query params, backend may ignore unknown ones — fallbacks handled below
      if (p) params.set("page", p);
      if (pp) params.set("limit", pp);
      if (f.search) params.set("search", f.search);
      if (f.username) params.set("username", f.username);
      if (f.agentCode) params.set("code", f.agentCode);
      if (f.agentGroup) params.set("agentGroupId", f.agentGroup);

  const url = `/api/agents${params.toString() ? `?${params.toString()}` : ""}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
      const json = await res.json();

      // Basic error handling
      if (!res.ok) {
        setError(json);
        setLoading(false);
        return { status: res.status, data: [] };
      }

      const data = Array.isArray(json.data) ? json.data : json;

      // Determine total count: prefer common fields, then header, then fallback to length
      let totalCount = 0;
      if (json.total !== undefined) totalCount = json.total;
      else if (json.totalCount !== undefined) totalCount = json.totalCount;
      else if (json.count !== undefined) totalCount = json.count;
      else {
        const headerTotal = res.headers.get("x-total-count");
        totalCount = headerTotal ? Number(headerTotal) : data.length;
      }

      // If backend returned all records (no pagination), do client-side pagination when page/limit were requested
      let finalData = data;
      if ((p || pp) && (!json.total && !json.totalCount && !res.headers.get("x-total-count"))) {
        // perform client-side pagination
        const start = (p - 1) * pp;
        finalData = data.slice(start, start + pp);
      }

      setAgents(finalData);
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
    // reset to page 1 when filters change
    setPage(1);
    return fetchAgents({ page: 1, perPage, filters: merged });
  };

  // Fetch agent groups for selects
  const fetchAgentGroups = async () => {
    try {
  const res = await fetch(`/api/agent-group`, { headers: { Accept: "application/json" } });
  const json = await res.json();
      if (!res.ok) {
        // ignore error but set empty
        return [];
      }
      const data = Array.isArray(json.data) ? json.data : json;
      setAgentGroups(data);
      return data;
    } catch (err) {
      return [];
    }
  };

  // Derived unique values for filter dropdowns
  const uniqueAgentNames = Array.from(new Set(agents.map((a) => a.companyName).filter(Boolean)));
  const uniqueAgentCodes = Array.from(new Set(agents.map((a) => a.code).filter(Boolean)));
  const uniqueAgentGroups = Array.from(new Set(agents.map((a) => (a.agentGroupId ? `Group ${a.agentGroupId}` : a.agentGroupId)).filter(Boolean)));

  return (
    <SalesContext.Provider
      value={{
        createAgent,
        loading,
        error,
        agents,
        total,
        page,
        perPage,
        filters,
        fetchAgents,
        applyFilters,
        setPage: (p) => fetchAgents({ page: p, perPage, filters }),
        setPerPage: (pp) => fetchAgents({ page: 1, perPage: pp, filters }),
        uniqueAgentNames,
        uniqueAgentCodes,
        uniqueAgentGroups,
        agentGroups,
        fetchAgentGroups,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export default SalesContext;
