import React from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

function SalesAgentGroup() {
  const groupData = [
    {
      groupName: "ABC Group",
      status: "Active",
    },
    {
      groupName: "ABC Group",
      status: "Active",
    },
    {
      groupName: "ABC Group",
      status: "Active",
    },
  ];

  return (
    <div className="bg-white p-5 min-h-full rounded-lg shadow-md">
      <div className="max-w-full mx-auto">
        {/* Add New Button */}
        <div className="flex justify-end mb-4">
          <Link to="/dashboard/master_data/sales_agent_group/add_new_sales_agent_group">
            <button className="flex items-center justify-center bg-[#ffe4df] text-[#f04e24] border border-[#f04e24] px-4 py-2 rounded text-sm">
              + Add New Sales Agent Group
            </button>
          </Link>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F04E24] text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Sales Agent Group Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {groupData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.groupName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.status}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Link to={`/dashboard/master_data/sales_agent_group/edit_sales_agent_group/`}>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesAgentGroup;
