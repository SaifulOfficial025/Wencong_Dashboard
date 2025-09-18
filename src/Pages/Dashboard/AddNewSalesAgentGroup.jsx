import React, { useContext } from "react";
import { SalesAgentGroupContext } from "../../ContextAPI/SalesAgentGroupContext";
import { useForm } from "react-hook-form";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

function AddNewSalesAgentGroup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createAgentGroup } = useContext(SalesAgentGroupContext);

  const onSubmit = async (data) => {
    const res = await createAgentGroup(data.groupName, data.status);
    window.alert(res.message);
  };

  return (
    <div className="max-w-full mx-auto">
      {/* Header */}
      <div className="text-black">
        <Link
          to="/dashboard/master_data/sales_agent_group"
          className="flex justify-left mb-2 text-black"
        >
          <ChevronLeft size={16} className="text-black" />
          <span className="text-sm text-black">Back to Sales Agent Group</span>
        </Link>
      </div>

      {/* Title */}
      <div className="bg-[#F04E24] text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-semibold">Add New Sales Agent Group</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-b-lg shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 text-black">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Agent Group Detail
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Group Name */}
              <div>
                <label className="block text-sm font-medium text-[#F04E24] mb-2">
                  Group Name
                </label>
                <input
                  type="text"
                  {...register("groupName", { required: true })}
                  className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-[#F04E24] mb-2">
                  Status
                </label>
                <div className="relative">
                  <select
                    {...register("status", { required: true })}
                    className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#F04E24] hover:bg-orange-600 text-white px-6 py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:ring-offset-2"
            >
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewSalesAgentGroup;
