import React from "react";
import { useForm } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

function Promotion() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  // Dummy data for the table rows based on the image
  const tableData = Array(7)
    .fill()
    .map((_, i) => ({
      promotionName: "Promotion 1",
      status: "Active",
      promotionPeriod: "01/02/2024 - 01/12/2024",
    }));

  return (
    <div className="p-6 bg-white min-h-screen text-[#F24E1E] font-semibold rounded-lg">
      {/* Filter Options */}
      <div className="p-4 rounded-lg mb-6">
        <h2 className="text-[#F24E1E] font-semibold mb-4">Filter Options</h2>
        <hr className="border-[#F04E24] mb-8" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end"
        >
          {/* Promotion Name Dropdown */}
          <div className="relative md:col-span-1">
            <select
              {...register("promotionName")}
              className="w-full p-2 border border-rose-100 rounded bg-[#FDE5E0] focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
            >
              <option value="">Promotion Name</option>
              <option value="promo1">Promotion 1</option>
              <option value="promo2">Promotion 2</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>

          {/* Promotion Period - Grouped for tighter spacing */}
          <div className="md:col-span-3 flex items-center gap-2">
            {" "}
            {/* Changed to col-span-3 and added flex for internal layout */}
            <div className="relative flex-grow">
              {" "}
              {/* flex-grow to make input take available space */}
              <input
                type="date"
                {...register("promotionPeriodFrom")}
                className="w-full p-2 border border-rose-100 rounded bg-[#FDE5E0] focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
              />
            </div>
            <span className="text-gray-700">to</span>{" "}
            {/* "to" text with reduced spacing */}
            <div className="relative flex-grow">
              {" "}
              {/* flex-grow to make input take available space */}
              <input
                type="date"
                {...register("promotionPeriodTo")}
                className="w-full p-2 border border-rose-100 rounded bg-[#FDE5E0] focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Input */}
          <div className="relative md:col-span-1">
            <input
              type="text"
              placeholder="Status"
              {...register("status")}
              className="w-full p-2 border border-rose-100 rounded bg-[#FDE5E0] focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-[#F24E1E] text-white px-4 py-2 rounded w-full md:col-span-1"
          >
            Search
          </button>
        </form>
        <hr className="border-[#F04E24] mb-8 mt-10" />
      </div>

      {/* Table Section */}
      <div className="mt-6 bg-white rounded-lg shadow overflow-x-auto">
        <div className="flex justify-end px-4 py-2">
          <Link to="/dashboard/master_data/sales_agent_group/add_promotion">
            <button className="bg-[#F24E1E] text-white px-4 py-2 rounded text-sm flex items-center">
              Add new
            </button>
          </Link>
        </div>

        <table className="w-full text-left border-t">
          <thead className="bg-[#F24E1E] text-white">
            <tr>
              <th className="px-4 py-2">Promotion Name</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Promotion Period</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {tableData.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="px-4 py-2">{item.promotionName}</td>
                <td className="px-4 py-2">{item.status}</td>
                <td className="px-4 py-2">{item.promotionPeriod}</td>
                <td className="px-4 py-2 text-blue-500 underline cursor-pointer">
                  {" "}
                  <Link to="/dashboard/master_data/sales_agent_group/edit_promotion_details">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 text-sm bg-white dark:bg-white">
          <div className="flex items-center gap-2">
            <select className="border rounded p-1 text-gray-700 dark:text-gray-700 dark:bg-white dark:border-gray-200">
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span className="text-gray-700 dark:text-gray-700">items</span>
          </div>
          <div className="text-gray-700 dark:text-gray-700">
            Page 1 of 1 (10 items)
          </div>
          <div className="flex">
            <button className="px-2 py-1 border rounded text-gray-700 dark:text-gray-700 bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 dark:border-gray-200">
              &#8249;
            </button>
            <button className="px-2 py-1 border rounded ml-1 text-gray-700 dark:text-gray-700 bg-white dark:bg-white hover:bg-gray-100 dark:hover:bg-gray-100 dark:border-gray-200">
              &#8250;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promotion;
