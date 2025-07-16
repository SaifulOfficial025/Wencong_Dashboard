import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function UserSettings() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="p-6 bg-[#FFF3F0] min-h-screen text-[#F24E1E] font-semibold mb-4">
      {/* Filter Options */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-[#F24E1E] font-semibold mb-4">Filter Options</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
          <div>
            <label className="block text-sm mb-1">Username</label>
            <select
              {...register("username")}
              className="w-full p-2 border rounded bg-[#FDE5E0]"
            >
              <option value="">Select Username</option>
              <option value="ABC123">ABC123</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Name</label>
            <select
              {...register("name")}
              className="w-full p-2 border rounded bg-[#FDE5E0]"
            >
              <option value="">Select Name</option>
              <option value="ALAN">ALAN</option>
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
          <Link to="/dashboard/settings/users/add_new_user">
            <button className="flex items-center justify-center bg-[#ffe4df] text-[#f04e24] border border-[#f04e24] px-4 py-2 rounded text-sm">
              + Add New User
            </button>
          </Link>
        </div>
        <table className="w-full text-left border-t">
          <thead className="bg-[#F24E1E] text-white">
            <tr>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact Number</th>
              <th className="px-4 py-2">User Group</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {Array(7)
              .fill()
              .map((_, i) => (
                <tr key={i} className="border-b">
                  <td className="px-4 py-2">ABC123</td>
                  <td className="px-4 py-2">ALAN</td>
                  <td className="px-4 py-2 text-green-600">Active</td>
                  <td className="px-4 py-2">abc123@gmail.com</td>
                  <td className="px-4 py-2">+60123-1234567</td>
                  <td className="px-4 py-2">Admin</td>
                  <td className="px-4 py-2 text-blue-500 underline cursor-pointer">
                    <Link to="/dashboard/settings/users/edit_user">View</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

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

export default UserSettings;
