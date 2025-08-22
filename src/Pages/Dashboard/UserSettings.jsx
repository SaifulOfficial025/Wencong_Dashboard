import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UserContext } from "../../ContextAPI/UserContext";

function UserSettings() {
  const { register, handleSubmit, reset } = useForm();
  const { fetchUsers } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchUsers();
      if (res.status === 200 && Array.isArray(res.data)) {
        const validUsers = res.data.filter(u => !u.isDeleted);
        setUsers(validUsers);
        setFilteredUsers(validUsers);
      } else {
        setUsers([]);
        setFilteredUsers([]);
      }
    };
    fetchData();
  }, [fetchUsers]);

  // Get unique usernames and names for dropdowns
  const usernames = Array.from(new Set(users.map(u => u.username)));
  const names = Array.from(new Set(users.map(u => u.name)));

  // Filtering logic
  const onSubmit = (data) => {
    let filtered = users;
    if (data.username) {
      filtered = filtered.filter(u => u.username === data.username);
    }
    if (data.name) {
      filtered = filtered.filter(u => u.name === data.name);
    }
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  // Pagination logic
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

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
              {usernames.map((username, idx) => (
                <option key={idx} value={username}>{username}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Name</label>
            <select
              {...register("name")}
              className="w-full p-2 border rounded bg-[#FDE5E0]"
            >
              <option value="">Select Name</option>
              {names.map((name, idx) => (
                <option key={idx} value={name}>{name}</option>
              ))}
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
            {paginatedUsers.map((user) => (
              <tr key={user.userId} className="border-b">
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className={`px-4 py-2 ${user.status === "active" ? "text-green-600" : "text-red-600"}`}>{user.status}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.contactNumber}</td>
                <td className="px-4 py-2">{user.userGroup}</td>
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
            <select className="border rounded p-1 bg-white dark:bg-white text-gray-700 dark:text-gray-700 dark:border-gray-200" value={itemsPerPage} onChange={handleItemsPerPageChange}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div>
            <span className="dark:text-gray-700">Page {currentPage} of {totalPages} ({totalItems} items)</span>
          </div>
          <div>
            <button className="px-2 border rounded bg-white dark:bg-white text-gray-700 dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-100 dark:border-gray-200" onClick={handlePrevPage} disabled={currentPage === 1}>
              &#8249;
            </button>
            <button className="px-2 border rounded ml-1 bg-white dark:bg-white text-gray-700 dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-100 dark:border-gray-200" onClick={handleNextPage} disabled={currentPage === totalPages}>
              &#8250;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
