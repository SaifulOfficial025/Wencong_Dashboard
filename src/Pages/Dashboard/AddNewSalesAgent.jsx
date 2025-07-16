import React from "react";
import { useForm } from "react-hook-form";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";


function AddNewSalesAgent() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };


  return (
    <div className="max-w-full mx-auto">
      {/* Header */}
      <div className="text-black">
        <Link to="/dashboard/master_data/sales_agent" className="flex justify-left mb-2 text-black">
          <ChevronLeft size={16} className="text-black" />
          <span className="text-sm text-black">Back to Sales Agent</span>
        </Link>
      </div>

      {/* Title */}
      <div className="bg-[#F04E24] text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-semibold">Add New Sales Agent</h1>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-b-lg shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 text-black">
          {/* Login Detail */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Login Detail</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["username", "password", "confirmPassword"].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-medium text-[#F04E24] mb-2">
                    {field === "confirmPassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field.includes("password") ? "password" : "text"}
                    {...register(field, { required: true })}
                    className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          <hr className="border-[#F04E24] mb-8" />

          {/* Sales Agent Detail */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Sales Agent Detail</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Agent Name", name: "name", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Contact Number", name: "contactNumber", type: "tel" },
                { label: "Additional Contact Number", name: "additionalContactNumber", type: "tel" },
              ].map((item, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-medium text-[#F04E24] mb-2">{item.label}</label>
                  <input
                    type={item.type}
                    {...register(item.name, { required: true })}
                    className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>

          <hr className="border-[#F04E24] mb-8" />

          {/* Others Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Others</h2>

            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {[
                { id: "agentGroup", label: "Agent Group", options: ["Group A", "Group B", "Group C"] },
                { id: "status", label: "Status", options: ["Active", "Inactive", "Pending"] },
              ].map(({ id, label, options }) => (
                <div key={id}>
                  <label className="block text-sm font-medium text-[#F04E24] mb-2">{label}</label>
                  <div className="relative">
                    <select
                      {...register(id, { required: true })}
                      className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                    >
                      <option value="">Select {label}</option>
                      {options.map(opt => (
                        <option key={opt} value={opt.toLowerCase().replace(" ", "")}>{opt}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#F04E24] mb-2">Credit Limit</label>
                <div className="relative">
                  <select
                    {...register("creditLimit", { required: true })}
                    className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                  >
                    <option value="">Select Credit Limit</option>
                    <option value="10">10</option>
                    <option value="100">100</option>
                    <option value="1000">1000</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F04E24] mb-2">Credit Term</label>
                <input
                  type="text"
                  {...register("creditTerm", { required: true })}
                  className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#F04E24] mb-2">Account Book</label>
                <div className="relative">
                  <select
                    {...register("accountBook", { required: true })}
                    className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                  >
                    <option value="">Select Account Book</option>
                    <option value="book1">Book 1</option>
                    <option value="book2">Book 2</option>
                    <option value="book3">Book 3</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F04E24] mb-2">Upload (SSM / Director)</label>
                <div className="relative w-full h-12 bg-[#FFF0ED] border border-[#F24E1E] border-dashed rounded-md flex items-center justify-center cursor-pointer overflow-hidden">
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    aria-label="Upload file"
                  />
                  <svg
                    className="w-6 h-6 text-[#F24E1E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
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

export default AddNewSalesAgent