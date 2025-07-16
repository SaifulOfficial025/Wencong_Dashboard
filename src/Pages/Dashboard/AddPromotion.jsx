import React from "react";
import { useForm } from "react-hook-form";
import { ChevronLeft, ChevronDown, Plus, } from "lucide-react";
import { Link } from "react-router-dom"; 

function AddPromotion() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
  <div className="p-4 font-sans max-w-full mx-auto">
    {/* Header */}
    <div className="mb-4">
      <Link to="/dashboard/master_data/promotion" className="flex items-center text-sm text-gray-700 mb-2">
        <ChevronLeft size={16} className="mr-1" />
        <span>Back to Promotion</span>
      </Link>
    </div>
    <div className="bg-[#F04E24] text-white p-4 rounded-t-lg">
      <h1 className="text-xl font-semibold">Add New Promotion Details</h1>
    </div>

    {/* Form Container */}
    <div className="bg-white dark:bg-white rounded-b-lg shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        {/* Promotion Detail Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-700 mb-4">Promotion Detail</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="promotion-name" className="block text-sm font-medium text-[#F04E24] mb-2">Promotion Name</label>
              <input
                id="promotion-name"
                type="text"
                {...register("promotionName", { required: true })}
                className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 text-gray-800 dark:text-gray-800 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-[#F04E24] mb-2">Status</label>
              <div className="relative">
                <select
                  id="status"
                  {...register("status", { required: true })}
                  className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 text-gray-800 dark:text-gray-800 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-end gap-2 mt-6">
            <div className="flex-1 min-w-[150px]">
              <label htmlFor="from-date" className="block text-sm font-medium text-[#F04E24] mb-2">From Date</label>
              <input
                id="from-date"
                type="date"
                {...register("fromDate", { required: true })}
                className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 text-gray-800 dark:text-gray-800 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
              />
            </div>
            <div className="text-gray-700 mb-2">to</div>
            <div className="flex-1 min-w-[150px]">
              <label htmlFor="to-date" className="block text-sm font-medium text-[#F04E24] mb-2">Date</label>
              <input
                id="to-date"
                type="date"
                {...register("toDate", { required: true })}
                className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 text-gray-800 dark:text-gray-800 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button type="button" className="bg-[#F04E24] hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:ring-offset-2 flex items-center gap-1">
              <Plus size={16} /> Add New
            </button>
          </div>
        </div>

        <hr className="border-[#F04E24] mb-8" />

        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="product-name" className="block text-sm font-medium text-[#F04E24] mb-2">Product Name</label>
              <div className="relative">
                <select
                  id="product-name"
                  {...register("productName", { required: true })}
                  className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 text-gray-800 dark:text-gray-800 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
                >
                  <option value="">Select Product</option>
                  <option value="product1">Product 1</option>
                  <option value="product2">Product 2</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
            <div>
              <label htmlFor="agent-group" className="block text-sm font-medium text-[#F04E24] mb-2">Agent Group</label>
              <div className="relative">
                <select
                  id="agent-group"
                  {...register("agentGroup", { required: true })}
                  className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 text-gray-800 dark:text-gray-800 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
                >
                  <option value="">Select Agent Group</option>
                  <option value="groupA">Group A</option>
                  <option value="groupB">Group B</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
            <div>
              <label htmlFor="min-quantity" className="block text-sm font-medium text-[#F04E24] mb-2">Minimum Quantity</label>
              <input
                id="min-quantity"
                type="number"
                {...register("minQuantity", { required: true })}
                className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 text-gray-800 dark:text-gray-800 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="max-quantity" className="block text-sm font-medium text-[#F04E24] mb-2">Maximum Quantity</label>
              <input
                id="max-quantity"
                type="number"
                {...register("maxQuantity", { required: true })}
                className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 text-gray-800 dark:text-gray-800 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="operation" className="block text-sm font-medium text-[#F04E24] mb-2">Operation</label>
              <div className="relative">
                <select
                  id="operation"
                  {...register("operation", { required: true })}
                  className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 text-gray-800 dark:text-gray-800 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
                >
                  <option value="">Select Operation</option>
                  <option value="fixed">Fixed Price Promotion</option>
                  <option value="percent">Percent Promotion</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
            <div>
              <label htmlFor="value" className="block text-sm font-medium text-[#F04E24] mb-2">Value</label>
              <input
                id="value"
                type="number"
                step="0.01"
                {...register("value", { required: true })}
                className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 text-gray-800 dark:text-gray-800 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button type="submit" className="bg-[#F04E24] hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:ring-offset-2">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
);





}

export default AddPromotion;
