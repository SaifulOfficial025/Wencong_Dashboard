import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { SalesContext } from "../../ContextAPI/SalesContext";

function SalesAgent() {
  const { register, handleSubmit } = useForm();
  const { agents, total, page, perPage, loading, fetchAgents, applyFilters, setPage, setPerPage, uniqueAgentNames, uniqueAgentCodes } = useContext(SalesContext);

  const onSubmit = (data) => {
    applyFilters({ username: data.username || "", agentCode: data.agentCode || "", agentGroup: data.agentGroup || "" });
  };

  useEffect(() => {
    fetchAgents({ page: 1, perPage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <option value="Group A">Group A</option>
              <option value="Group B">Group B</option>
              <option value="Group C">Group C</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-[#F24E1E] text-white px-4 py-2 rounded h-fit"
          >
            Search
          </button>
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
            ) : agents && agents.length ? (
              agents.map((agent) => (
                <tr key={agent.agentId} className="border-b">
                  <td className="px-4 py-2">{agent.code}</td>
                  <td className="px-4 py-2">{agent.companyName}</td>
                  <td className="px-4 py-2">{agent.agentGroupId ? `Group ${agent.agentGroupId}` : "-"}</td>
                  <td className="px-4 py-2">{agent.creditTerm || "-"}</td>
                  <td className="px-4 py-2">{agent.creditLimit || "-"}</td>
                  {/* <td className="px-4 py-2">-</td> */}
                  <td className="px-4 py-2 text-blue-500 underline cursor-pointer">
                    <Link to="/dashboard/master_data/sales_agent/edit_sales_agent">View</Link>
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
