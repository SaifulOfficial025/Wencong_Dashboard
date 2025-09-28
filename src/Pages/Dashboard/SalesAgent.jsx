import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { SalesContext } from "../../ContextAPI/SalesContext";
import { SalesAgentGroupContext } from "../../ContextAPI/SalesAgentGroupContext";

function SalesAgent() {
  const { register, handleSubmit, reset } = useForm();
  const { agents, total, page, perPage, loading, fetchAgents, applyFilters, setPage, setPerPage, uniqueAgentNames, uniqueAgentCodes, filters } = useContext(SalesContext);
  const { fetchAgentGroups } = useContext(SalesAgentGroupContext);
  const [agentGroups, setAgentGroups] = useState([]);
  const [displayAgents, setDisplayAgents] = useState([]);

  const onSubmit = async (data) => {
    // immediate client-side filter so table updates right away
    try {
      const filtered = (agents || []).filter((a) => {
        const matchName = data.username ? (a.companyName || a.name || "").toString() === data.username.toString() : true;
        const matchCode = data.agentCode ? (a.code || "").toString() === data.agentCode.toString() : true;
        const matchGroup = data.agentGroup ? ((a.agentGroupId || a.agentGroup || a.groupId || "").toString() === data.agentGroup.toString()) : true;
        return matchName && matchCode && matchGroup;
      });
      setDisplayAgents(filtered);
    } catch (e) {
      // ignore
    }

    await applyFilters({ username: data.username || "", agentCode: data.agentCode || "", agentGroup: data.agentGroup || "" });
    // keep form in sync
    reset({ username: data.username || "", agentCode: data.agentCode || "", agentGroup: data.agentGroup || "" });
  };

  const onClear = async () => {
    await applyFilters({ username: "", agentCode: "", agentGroup: "" });
    reset({ username: "", agentCode: "", agentGroup: "" });
    // reset local display
    setDisplayAgents(agents || []);
  };

  useEffect(() => {
    // initial load of agents and groups
    fetchAgents({ page: 1, perPage });
    const loadGroups = async () => {
      const res = await fetchAgentGroups();
      const data = res.data !== undefined ? res.data : res;
      setAgentGroups(Array.isArray(data) ? data : []);
    };
    loadGroups();

    // initialize form values from current filters
    reset({
      username: filters?.username || "",
      agentCode: filters?.agentCode || "",
      agentGroup: filters?.agentGroup || "",
    });

    // initialize display agents
    setDisplayAgents(agents || []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep local display list in sync with context agents when server updates occur
  useEffect(() => {
    setDisplayAgents(agents || []);
  }, [agents]);

  return (
    <div className="p-6 bg-[#FFF3F0] min-h-screen text-[#F24E1E] font-semibold mb-4">
      {/* Filter Options */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-[#F24E1E] font-semibold mb-4">Filter Options</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap gap-4 items-end"
        >
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm mb-1 text-black">
              Sales Agent Name
            </label>
            <select
              {...register("username")}
              className="w-full p-2 border rounded bg-[#FDE5E0] text-black"
            >
              <option value="">Select Agent</option>
              {uniqueAgentNames && uniqueAgentNames.length ? (
                uniqueAgentNames.map((n, i) => (
                  <option value={n} key={i}>
                    {n}
                  </option>
                ))
              ) : (
                <option value="">No agents</option>
              )}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm mb-1 text-black">Agent Code</label>
            <select
              {...register("agentCode")}
              className="w-full p-2 border rounded bg-[#FDE5E0] text-black"
            >
              <option value="">Select Code</option>
              {uniqueAgentCodes && uniqueAgentCodes.length ? (
                uniqueAgentCodes.map((c, i) => (
                  <option value={c} key={i}>
                    {c}
                  </option>
                ))
              ) : (
                <option value="">No codes</option>
              )}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm mb-1 text-black">Agent Group</label>
            <select
              {...register("agentGroup")}
              className="w-full p-2 border rounded bg-[#FDE5E0] text-black"
            >
              <option value="">Select Group</option>
              {agentGroups.length ? (
                agentGroups.map((g) => (
                  <option key={g.id ?? g.agentGroupId} value={g.id ?? g.agentGroupId}>{g.name}</option>
                ))
              ) : (
                <>
                  <option value="Group A">Group A</option>
                  <option value="Group B">Group B</option>
                  <option value="Group C">Group C</option>
                </>
              )}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-[#F24E1E] text-white px-4 py-2 rounded h-fit"
            >
              Search
            </button>
            <button
              type="button"
              onClick={onClear}
              className="bg-white text-[#F24E1E] border border-[#F24E1E] px-4 py-2 rounded h-fit"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <div className="flex justify-end px-4 py-2">
          <Link to="/dashboard/master_data/sales_agent/add_new_sales_agent">
            <button className="flex items-center justify-center bg-[#ffe4df] text-[#f04e24] border border-[#f04e24] px-4 py-2 rounded text-sm">
              + Add New Sales Agent
            </button>
          </Link>
        </div>

        <table className="w-full text-left border-t">
          <thead className="bg-[#F24E1E] text-white">
            <tr>
              <th className="px-4 py-2">Agent Code</th>
              <th className="px-4 py-2">Sales Agent</th>
              <th className="px-4 py-2">Agent Group</th>
              <th className="px-4 py-2">Credit Term</th>
              <th className="px-4 py-2">Credit Limit</th>
              {/* <th className="px-4 py-2">Outstanding</th> */}
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : displayAgents && displayAgents.length ? (
              displayAgents.map((agent) => (
                <tr key={agent.agentId || agent.id} className="border-b">
                  <td className="px-4 py-2">{agent.code}</td>
                  <td className="px-4 py-2">{agent.companyName || agent.name}</td>
                  <td className="px-4 py-2">{(agentGroups.find(g => (g.id ?? g.agentGroupId) === agent.agentGroupId)?.name) || (agent.agentGroupId ? `Group ${agent.agentGroupId}` : "-")}</td>
                  <td className="px-4 py-2">{agent.creditTerm || "-"}</td>
                  <td className="px-4 py-2">{agent.creditLimit || "-"}</td>
                  {/* <td className="px-4 py-2">-</td> */}
                  <td className="px-4 py-2 text-blue-500 underline cursor-pointer">
                    <Link to={`/dashboard/master_data/sales_agent/edit_sales_agent/${agent.id || agent.agentId}`}>View</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center">
                  No agents found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-4 py-3 text-xs sm:text-sm bg-white text-gray-700 space-y-2 sm:space-y-0">
          <div>
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              className="border rounded p-1 bg-white text-gray-700"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div>
            <span className="">Page {page} of {Math.max(1, Math.ceil((total || 0) / perPage))} ({total || 0} items)</span>
          </div>
          <div>
            <button
              onClick={() => page > 1 && setPage(page - 1)}
              className="px-2 border rounded bg-white text-gray-700 hover:bg-gray-100"
              disabled={page <= 1}
            >
              &#8249;
            </button>
            <button
              onClick={() => page < Math.ceil((total || 0) / perPage) && setPage(page + 1)}
              className="px-2 border rounded ml-1 bg-white text-gray-700 hover:bg-gray-100"
              disabled={page >= Math.ceil((total || 0) / perPage)}
            >
              &#8250;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesAgent;
