import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronDown  } from "lucide-react";
import { useForm } from "react-hook-form";
import { CiImageOn } from "react-icons/ci";

function EditSalesAgent() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

  return (
    <div className="p-4 font-sans max-w-full mx-auto">
      {/* Header */}
      <div className="mb-4">
        <Link to={"/dashboard/master_data/sales_agent"} className="flex items-center text-sm text-gray-700 mb-2">
          <ChevronLeft size={16} className="mr-1" />
          <span>Back to Sales Agent</span>
        </Link>
      </div>
      <div className="bg-[#F04E24] text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-semibold">Edit Sales Agent Details</h1>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-b-lg shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Sales Agent Detail Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Sales Agent Detail</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Agent Code */}
              <div>
                <label htmlFor="agent-code" className="block text-sm font-medium text-[#F04E24] mb-2">
                  Agent Code
                </label>
                <input
                  id="agent-code"
                  type="text"
                  {...register("agentCode")}
                  defaultValue="Agent 1001"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
              {/* Agent Name */}
              <div>
                <label htmlFor="agent-name" className="block text-sm font-medium text-[#F04E24] mb-2">
                  Agent Name
                </label>
                <input
                  id="agent-name"
                  type="text"
                  {...register("agentName")}
                  defaultValue="Company ABC"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#F04E24] mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  defaultValue="company123@gmail.com"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>


            </div>
              <div className='grid grid-cols-2 gap-6'>
              {/* Contact Number */}
              <div>
                <label htmlFor="contact-number" className="block text-sm font-medium text-[#F04E24] mb-2">
                  Contact Number
                </label>
                <input
                  id="contact-number"
                  type="tel"
                  {...register("contactNumber")}
                  defaultValue="+60123-1234567"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
                
              {/* Additional Contact Number */}
              <div>
                <label htmlFor="additional-contact-number" className="block text-sm font-medium text-[#F04E24] mb-2">
                  Additional Contact Number
                </label>
                <input
                  id="additional-contact-number"
                  type="tel"
                  {...register("additionalContactNumber")}
                  defaultValue="+60123-1234567"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
              </div>
          </div>

          {/* Divider */}
          <hr className="border-[#F04E24] mb-8" />

          {/* Others Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Others</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Agent Group Column */}
              <div>
                <label htmlFor="agent-group" className="block text-sm font-medium text-[#F04E24] mb-2">
                  Agent Group
                </label>
                <div className="relative">
                  <select
                    id="agent-group"
                    {...register("agentGroup", { required: true })}
                    defaultValue="Group B"
                    className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
                  >
                    <option value="">Select Agent Group</option>
                    <option value="Group A">Group A</option>
                    <option value="Group B">Group B</option>
                    <option value="Group C">Group C</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              {/* Status Column */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-[#F04E24] mb-2">
                  Status
                </label>
                <div className="relative">
                  <select
                    id="status"
                    {...register("status", { required: true })}
                    defaultValue="Active"
                    className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              {/* Account Book Column */}
              <div>
                <label htmlFor="account-book" className="block text-sm font-medium text-[#F04E24] mb-2">
                  Account Book
                </label>
                <div className="relative">
                  <select
                    id="account-book"
                    {...register("accountBook", { required: true })}
                    defaultValue="Hunter Boom Sdn Bhd"
                    className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
                  >
                    <option value="">Select Account Book</option>
                    <option value="Hunter Boom Sdn Bhd">Hunter Boom Sdn Bhd</option>
                    <option value="Another Book">Another Book</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              {/* Credit Limit Column */}
              <div>
                <label htmlFor="credit-limit" className="block text-sm font-medium text-[#F04E24] mb-2">
                  Credit Limit
                </label>
                <input
                  id="credit-limit"
                  type="text"
                  {...register("creditLimit")}
                  defaultValue="RM30,000.00"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>

              {/* Credit Term Column */}
              <div>
                <label htmlFor="credit-term" className="block text-sm font-medium text-[#F04E24] mb-2">
                  Credit Term
                </label>
                <input
                  id="credit-term"
                  type="text"
                  {...register("creditTerm")}
                  defaultValue="30days"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-[#F04E24] mb-2">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  {...register("address")}
                  defaultValue="No 123, Jalan BAAAAA, 33, Taman XXXX"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>

              {/* Postal Code */}
              <div>
                <label htmlFor="postal-code" className="block text-sm font-medium text-[#F04E24] mb-2">
                  Postal Code
                </label>
                <input
                  id="postal-code"
                  type="text"
                  {...register("postalCode")}
                  defaultValue="81100"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-[#F04E24] mb-2">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  {...register("city")}
                  defaultValue="XXX"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>

              {/* State */}
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-[#F04E24] mb-2">
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  {...register("state")}
                  defaultValue="Johor"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="bg-[#F04E24] hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:ring-offset-2"
              >
                Update Data
              </button>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-[#F04E24] mb-8" />

          {/* Login Detail Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Login Detail</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-[#F04E24] mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
              {/* New Password */}
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-[#F04E24] mb-2">
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  {...register("newPassword")}
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
              {/* Confirm Password */}
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-[#F04E24] mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  {...register("confirmPassword")}
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-[#F04E24] hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:ring-offset-2"
              >
                Change
              </button>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-[#F04E24] mb-8" />

          {/* Upload Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Upload</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* View (SSM / Director) Column */}
              <div>
                <label htmlFor="view-ssm" className="block text-sm font-medium text-[#F04E24] mb-2">
                  View (SSM / Director)
                </label>
                <div className="relative w-full h-12 bg-[#FFF0ED] border border-[#F24E1E] border-dashed rounded-md flex items-center justify-center cursor-pointer overflow-hidden py-2">
                  {/* Hidden file input */}
                  <input
                    id="view-ssm"
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    aria-label="View file"
                  />
                  {/* View icon (using an SVG for customizability and consistency) */}
                  <CiImageOn />
                </div>
              </div>

              {/* Update (SSM / Director) Column */}
              <div>
                <label htmlFor="update-ssm" className="block text-sm font-medium text-[#F04E24] mb-2">
                  Update (SSM / Director)
                </label>
                <div className="relative w-full h-12 bg-[#FFF0ED] border border-[#F24E1E] border-dashed rounded-md flex items-center justify-center cursor-pointer overflow-hidden py-2">
                  {/* Hidden file input */}
                  <input
                    id="update-ssm"
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    aria-label="Update file"
                  />
                  {/* Upload icon */}
                  <svg
                    className="w-6 h-6 text-[#F24E1E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditSalesAgent