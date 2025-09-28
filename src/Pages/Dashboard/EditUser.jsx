import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../ContextAPI/UserContext";

function EditUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchUserById, updateUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [initialUser, setInitialUser] = useState(null);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // build payload according to backend expectation
      const payload = {
        username: data.username,
        // include email from fetched user since there's no email input on this form
        email: initialUser?.email || "",
        name: data.name,
        contactNumber: data.contactNumber,
        userGroup: data.userGroup,
        userLevel: data.userLevel,
        permission: data.permission,
        status: data.status,
      };

      // include password only when user provided one (non-empty)
      if (data.password && String(data.password).trim().length > 0) {
        // client-side password strength validation to avoid server 400
        const pwd = String(data.password);
        const hasUpper = /[A-Z]/.test(pwd);
        const hasLower = /[a-z]/.test(pwd);
        const hasNumber = /[0-9]/.test(pwd);
        const minLen = pwd.length >= 6;
        if (!hasUpper || !hasLower || !hasNumber || !minLen) {
          setLoading(false);
          alert(
            "Password must be at least 6 characters and include uppercase, lowercase and a number"
          );
          return;
        }

        payload.password = data.password;
      }

      const res = await updateUser(id, payload);
      setLoading(false);
      if (res.status >= 200 && res.status < 300) {
        alert("User updated successfully");
        navigate("/dashboard/settings/users/");
      } else {
        alert(res.data?.message || "Failed to update user");
      }
    } catch (err) {
      setLoading(false);
      alert(err.message || "Network error");
    }
  };

  // load user
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!id) return;
      try {
        const res = await fetchUserById(id);
        const u = res.data;
          if (mounted && u) {
            // save initial user for rendering non-standard option values
            setInitialUser(u);
            // populate form
            reset({
              username: u.username || u.email || "",
              name: u.name || "",
              contactNumber: u.contactNumber || u.phone || "",
              userGroup: u.userGroup || "",
              userLevel: u.userLevel || "",
              permission: u.permission || "",
              status: u.status || "",
            });
        }
      } catch (err) {
        console.error(err);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [id, fetchUserById, reset]);

  return (
    <div className="max-w-full mx-auto">
      {/* Header */}
      <div className="dark:text-black">
        <Link
          to={"/dashboard/settings/users/"}
          className="flex justify-left mb-2"
        >
          <ChevronLeft size={16} />
          <span className="text-sm">Back to User</span>
        </Link>
      </div>
      <div className="bg-[#F04E24] text-white p-4 rounded-t-lg">
        <div className="flex items-center gap-2 mb-2"></div>
        <h1 className="text-xl font-semibold"> Edit User</h1>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-b-lg shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Login Detail Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              User Detail
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#F04E24] mb-2">
                  Username
                </label>
                <input
                  type="text"
                  {...register("username", { required: true })}
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F04E24] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F04E24] mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    validate: (val) => {
                      const pwd = watch("password");
                      // only validate if password is provided
                      if (!pwd) return true;
                      return val === pwd || "Passwords do not match";
                    },
                  })}
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent text-black"
                />
                <p className="text-xs text-gray-500 mt-1">Leave password fields blank to keep the current password.</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-[#F04E24] mb-8" />

          {/* User Detail Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              User Detail
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#F04E24] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F04E24] mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  {...register("contactNumber", { required: true })}
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F04E24] mb-2">
                  User Group
                </label>
                <div className="relative">
                  <select
                    {...register("userGroup", { required: true })}
                    className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none text-black"
                  >
                    <option value="">Select User Group</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-[#F04E24] mb-8" />

          {/* Permission Detail Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Permission Detail
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#F04E24] mb-2">
                  User Level
                </label>
                <div className="relative">
                  <select
                    {...register("userLevel", { required: true })}
                    className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none text-black"
                  >
                    <option value="">Select User Level</option>
                    {/* if API returned a value not in our list, show it so the select displays */}
                    {initialUser && initialUser.userLevel && !["level1", "level2", "level3"].includes(String(initialUser.userLevel)) && (
                      <option value={initialUser.userLevel}>{String(initialUser.userLevel)}</option>
                    )}
                    <option value="level1">Level 1</option>
                    <option value="level2">Level 2</option>
                    <option value="level3">Level 3</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F04E24] mb-2">
                  Permission
                </label>
                <div className="relative">
                  <select
                    {...register("permission", { required: true })}
                    className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none text-black"
                  >
                    <option value="">Select Permission</option>
                    <option value="read">Read</option>
                    <option value="write">Write</option>
                    <option value="admin">Admin</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
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
                    className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none text-black"
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
              className="bg-[#F04E24] hover:bg-orange-600 text-white px-6 py-2  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:ring-offset-2"
            >
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
