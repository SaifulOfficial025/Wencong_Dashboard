import React from "react";
import { useForm } from "react-hook-form";
import { TiExport } from "react-icons/ti";

function AgentSalesReport() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-[#FFF3F0] min-h-screen">
      {/* Filter Options */}
      <div className="bg-white dark:bg-white p-3 sm:p-4 rounded shadow">
        <h2 className="text-[#F24E1E] dark:text-[#F24E1E] font-semibold mb-4">
          Filter Options
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {/* Date Range */}
          <div className="col-span-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-700 mb-1 block">
              Date Range
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="date"
                {...register("startDate")}
                className="w-full p-2 border rounded bg-[#FDE5E0] dark:bg-[#FDE5E0] dark:text-black"
              />
              <span className="text-[#F24E1E] dark:text-[#F24E1E]">to</span>
              <input
                type="date"
                {...register("endDate")}
                className="w-full p-2 border rounded bg-[#FDE5E0] dark:bg-[#FDE5E0] dark:text-black"
              />
            </div>
          </div>

          {/* Sales Agent */}
          <div className="col-span-1 mt-4 sm:mt-0.5">
            {" "}
            {/* Added mt-4 for a gap on smaller screens, kept sm:mt-0.5 for larger */}
            <label className="text-sm font-medium text-gray-700 dark:text-gray-700 mb-1 block">
              Sales Agent
            </label>
            <select
              {...register("salesAgent")}
              className="w-full p-2 border rounded bg-[#FDE5E0] dark:bg-[#FDE5E0] dark:text-black"
            >
              <option value="">Select Agent</option>
              <option value="Company ABC">Company ABC</option>
            </select>
          </div>

          {/* Agent Code */}
          <div className="col-span-1 mt-0.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-700 mb-1 block">
              Agent Code
            </label>
            <select
              {...register("agentCode")}
              className="w-full p-2 border rounded bg-[#FDE5E0] dark:bg-[#FDE5E0] dark:text-black"
            >
              <option value="">Select Code</option>
              <option value="400-001">400-001</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="col-span-1 flex items-center mt-5">
            <button
              type="submit"
              className="bg-[#F24E1E] dark:bg-[#F24E1E] text-white dark:text-white px-4 py-2 rounded w-full hover:bg-orange-600 dark:hover:bg-orange-600"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {/* Table Section */}
      <div className="mt-4 sm:mt-6 bg-white rounded shadow overflow-x-auto">
        <div className="flex justify-end px-3 sm:px-4 py-2">
          <button className="flex items-center justify-center bg-[#ffe4df] text-[#f04e24] border border-[#f04e24] px-4 py-2 rounded text-sm">
            Export <TiExport />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-t min-w-[600px]">
            <thead className="bg-[#F24E1E] text-white">
              <tr>
                <th className="px-4 py-2">Doc.No</th>
                <th className="px-4 py-2">Agent Code</th>
                <th className="px-4 py-2">Sales Agent</th>
                <th className="px-4 py-2">Total Order</th>
                <th className="px-4 py-2">Total Qty</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {Array(7)
                .fill()
                .map((_, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-4 py-2">SO-000034</td>
                    <td className="px-4 py-2">400-001</td>
                    <td className="px-4 py-2">Company ABC</td>
                    <td className="px-4 py-2">
                      {[34, 345, 22, 4, 2, 5, 22][i]}
                    </td>
                    <td className="px-4 py-2">
                      {[34, 1055, 1055, 1055, 1055, 1055, 34][i]}
                    </td>
                    <td className="px-4 py-2">RM2,450.34</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-4 py-3 text-xs sm:text-sm bg-white dark:bg-white text-gray-700 dark:text-gray-700 space-y-2 sm:space-y-0">
          <div>
            <select className="border rounded p-1 bg-white dark:bg-white text-gray-700 dark:text-gray-700 dark:border-gray-200">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div>
            <span className="dark:text-gray-700">Page 1 of 1 (10 items)</span>
          </div>
          <div>
            <button className="px-2 border rounded bg-white dark:bg-white text-gray-700 dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-100 dark:border-gray-200">
              &#8249;
            </button>
            <button className="px-2 border rounded ml-1 bg-white dark:bg-white text-gray-700 dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-100 dark:border-gray-200">
              &#8250;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentSalesReport;
