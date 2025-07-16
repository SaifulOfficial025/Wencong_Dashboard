import React from 'react'
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";


function EditUser() {
    const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
     <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="dark:text-black">
          <Link to={"/dashboard/settings/users/"} className="flex justify-left mb-2">
            <ChevronLeft size={16} />
            <span className="text-sm">Back to User</span>
          </Link>
        </div>
        <div className="bg-[#F04E24] text-white p-4 rounded-t-lg">
          <div className="flex items-center gap-2 mb-2">
          </div>
          <h1 className="text-xl font-semibold"> Edit User</h1>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-b-lg shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {/* Login Detail Section */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-700 mb-4">User Detail</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#F04E24] mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    {...register("username", { required: true })}
                    className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F04E24] mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F04E24] mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    {...register("confirmPassword", { required: true })}
                    className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-[#F04E24] mb-8" />

            {/* User Detail Section */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-700 mb-4">User Detail</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#F04E24] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F04E24] mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    {...register("contactNumber", { required: true })}
                    className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F04E24] mb-2">
                    User Group
                  </label>
                  <div className="relative">
                    <select
                      {...register("userGroup", { required: true })}
                      className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
                    >
                      <option value="">Select User Group</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-[#F04E24] mb-8" />

            {/* Permission Detail Section */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-700 mb-4">Permission Detail</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#F04E24] mb-2">
                    User Level
                  </label>
                  <div className="relative">
                    <select
                      {...register("userLevel", { required: true })}
                      className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
                    >
                      <option value="">Select User Level</option>
                      <option value="level1">Level 1</option>
                      <option value="level2">Level 2</option>
                      <option value="level3">Level 3</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F04E24] mb-2">
                    Permission
                  </label>
                  <div className="relative">
                    <select
                      {...register("permission", { required: true })}
                      className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
                    >
                      <option value="">Select Permission</option>
                      <option value="read">Read</option>
                      <option value="write">Write</option>
                      <option value="admin">Admin</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#F04E24] mb-2">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      {...register("status", { required: true })}
                      className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
                    >
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#F04E24] hover:bg-orange-600 text-white px-6 py-2  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:ring-offset-2"
              >
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default EditUser