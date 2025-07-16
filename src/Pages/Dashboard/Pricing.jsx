import React from "react";
import { useForm } from "react-hook-form";
import { IoIosSave } from "react-icons/io";

function Pricing() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  // Dummy data for the table rows based on the image
  const tableData = Array(7)
    .fill()
    .map((_, i) => ({
      productCode: "400-001",
      productName: "10尺满地黄金 | 10B KAKI EMAS",
      defaultPrice: "RM108.00",
      agentGroupA: "RM98.00",
      agentGroupB: "RM88.00",
      agentGroupC: "RM78.00",
    }));

  return (
    <div className="p-6 bg-white min-h-screen text-[#F24E1E] font-semibold rounded-lg">
      {/* Search Filter Options */}
      <div className="p-4 rounded-lg mb-6">
        <h2 className="text-gray-700 font-semibold mb-4">Search</h2>
        <hr className="border-[#F04E24] mb-8" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end"
        >
          {" "}
          {/* Changed grid-cols-4 to grid-cols-2 */}
          {/* Single Search Input Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..." // Generic placeholder for a single search field
              {...register("searchQuery")} // Changed register name to a generic one
              className="w-full p-2 border border-rose-100 rounded bg-[#FDE5E0] focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
            />
          </div>
          {/* Search Button */}
          <button
            type="submit"
            className="bg-[#F24E1E] text-white px-4 py-2 rounded w-full"
          >
            Search
          </button>
        </form>
        <hr className="border-[#F04E24] mb-8 mt-10" />
      </div>

      {/* Table Section */}
      <div className="mt-6 bg-white rounded-lg shadow overflow-x-auto">
        <div className="flex justify-end px-4 py-2">
          <button className="bg-[#ffe4df] text-[#f04e24] border border-[#f04e24]  px-4 py-2 rounded text-sm flex items-center">
            <IoIosSave className="mr-3 w-4 h-4 text-[#f04e24]" />
            <span className="mr-1">Save</span>
            {/* Save icon (using an SVG) */}
          </button>
        </div>

        <table className="w-full text-left border-t">
          <thead className="bg-[#F24E1E] text-white">
            <tr>
              <th className="px-4 py-2">Product Code</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Default Price</th>
              <th className="px-4 py-2">Agent Group A</th>
              <th className="px-4 py-2">Agent Group B</th>
              <th className="px-4 py-2">Agent Group C</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {tableData.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="px-4 py-2">{item.productCode}</td>
                <td className="px-4 py-2">{item.productName}</td>
                <td className="px-4 py-2">{item.defaultPrice}</td>
                <td className="px-4 py-2 bg-[#FFE4DF]">{item.agentGroupA}</td>
                <td className="px-4 py-2 bg-[#FFF3F0]">{item.agentGroupB}</td>
                <td className="px-4 py-2 bg-[#FDE5E0]">{item.agentGroupC}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination - Removed as per image */}
      </div>
    </div>
  );
}

export default Pricing;
