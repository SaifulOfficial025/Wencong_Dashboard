import React, { useRef, useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { CiImageOn } from "react-icons/ci";
import { SalesContext } from "../../ContextAPI/SalesContext";

function AddSalesAgent() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const { createAgent, loading, error, agentGroups, fetchAgentGroups } = useContext(SalesContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Create FormData with correct field mapping
      const formData = new FormData();
      
      // Map form fields to API expected fields
      const fieldMapping = {
        agentCode: "code",
        agentName: "agentName",
        contactNumber: "contactNumber",
        additionalContactNumber: "addContactNumber",
        // do not include email in payload unless backend expects it
        address: "address",
        postalCode: "addressPostalCode",
        city: "addressCity", 
        state: "addressState",
        agentGroup: "agentGroupId", // Convert to number
        status: "status",
        accountBook: "accountBook",
        creditLimit: "creditLimit",
        creditTerm: "creditTerm",
        username: "username",
        newPassword: "password",
        // Skip confirmPassword as it's not needed in API
      };

      // Validate and normalize fields before appending
      // Password rules: at least one uppercase, one lowercase, one number, >= 6 chars
      const pwd = data.newPassword;
      if (pwd !== undefined && pwd !== null && pwd !== "") {
        if (typeof pwd !== "string") {
          alert("Password must be a string");
          return;
        }
        const pwdErrors = [];
        if (!/(?=.*[a-z])/.test(pwd) || !/(?=.*[A-Z])/.test(pwd) || !/(?=.*\d)/.test(pwd)) {
          pwdErrors.push("Password must contain at least one uppercase letter, one lowercase letter, and one number");
        }
        if (pwd.length < 6) pwdErrors.push("Password must be at least 6 characters long");
        if (pwdErrors.length) {
          alert(pwdErrors.join("; "));
          return;
        }
      }

      // Status: ensure string and one of allowed values
      let statusVal = data.status;
      if (statusVal !== undefined && statusVal !== null && statusVal !== "") {
        statusVal = String(statusVal).toLowerCase();
        if (!["active", "inactive"].includes(statusVal)) {
          alert("Status must be one of: active, inactive");
          return;
        }
      }

      // Credit limit normalization will be done when appending; but check format early

      // Append file if selected
      if (selectedFile) {
        formData.append("file", selectedFile, selectedFile.name);
      }

      // Build FormData entries (append after file so order is file then fields)
      Object.keys(data).forEach((key) => {
        // Skip fields backend should not receive
        if (key === "confirmPassword" || key === "email") return;

        let apiFieldName = fieldMapping[key] || key;
        let value = data[key];

        if (key === "agentGroup") {
          value = value ? String(value) : value;
        }

        if (key === "creditLimit") {
          // normalize creditLimit to a currency-style string with two decimals
          const num = Number(String(value).replace(/,/g, ""));
          if (Number.isNaN(num)) {
            alert("Credit limit must be a valid number (e.g., 1000.00)");
            return;
          }
          value = num.toFixed(2);
        }

        if (key === "status") {
          // we validated/normalized earlier
          value = statusVal || value;
          apiFieldName = "status";
        }

        if (key === "newPassword") {
          // map newPassword -> password
          apiFieldName = "password";
          value = data.newPassword;
        }

        // Only append non-empty values to avoid sending unwanted empty properties
        if (value !== undefined && value !== null && value !== "") {
          formData.append(apiFieldName, value);
        }
      });

      // Call API through context
      const response = await createAgent(formData);
      
      if (response && response.status === 201) {
        // Reset form and file then navigate back to the sales agent list
        reset();
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        navigate("/dashboard/master_data/sales_agent");
        return;
      } else {
        alert(
          (response && (response.message || (response.data && response.data.message))) ||
            "Failed to create agent"
        );
      }
    } catch (err) {
      alert("Error creating agent: " + (err.message || "Unknown error"));
    }
  };

  // Load agent groups when component mounts
  useEffect(() => {
    if (!agentGroups || agentGroups.length === 0) {
      fetchAgentGroups().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 font-sans max-w-full mx-auto">
      {/* Header */}
      <div className="mb-4">
        <Link
          to={"/dashboard/master_data/sales_agent"}
          className="flex items-center text-sm text-gray-700 mb-2"
        >
          <ChevronLeft size={16} className="mr-1" />
          <span>Back to Sales Agent</span>
        </Link>
      </div>
      <div className="bg-[#F04E24] text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-semibold">Add Sales Agent Details</h1>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-b-lg shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Sales Agent Detail Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Sales Agent Detail
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Agent Code */}
              <div>
                <label
                  htmlFor="agent-code"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  Agent Code
                </label>
                <input
                  id="agent-code"
                  type="text"
                  {...register("agentCode")}
                  className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
              {/* Agent Name */}
              <div>
                <label
                  htmlFor="agent-name"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  Agent Name
                </label>
                <input
                  id="agent-name"
                  type="text"
                  {...register("agentName")}
                  className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
              {/* Email */}
              {/* <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div> */}
            </div>
            <div className="grid grid-cols-2 gap-6">
              {/* Contact Number */}
              <div>
                <label
                  htmlFor="contact-number"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  Contact Number
                </label>
                <input
                  id="contact-number"
                  type="tel"
                  {...register("contactNumber")}
                  className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>

              {/* Additional Contact Number */}
              <div>
                <label
                  htmlFor="additional-contact-number"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  Additional Contact Number
                </label>
                <input
                  id="additional-contact-number"
                  type="tel"
                  {...register("additionalContactNumber")}
                  className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
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
                <label
                  htmlFor="agent-group"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  Agent Group
                </label>
                <div className="relative">
                  <select
                    id="agent-group"
                    {...register("agentGroup", { required: true })}
                    defaultValue=""
                    className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
                  >
                    <option value="">Select Agent Group</option>
                    {agentGroups && agentGroups.length ? (
                      agentGroups.map((g) => (
                        <option key={g.agentGroupId} value={g.agentGroupId}>
                          {g.name}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="1">Group A</option>
                        <option value="2">Group B</option>
                        <option value="3">Group C</option>
                      </>
                    )}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                </div>
              </div>

              {/* Status Column */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  Status
                </label>
                <div className="relative">
                  <select
                    id="status"
                    {...register("status", { required: true })}
                    
                    className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
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

              {/* Account Book Column */}
              <div>
                <label
                  htmlFor="account-book"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  Account Book
                </label>
                <div className="relative">
                  <select
                    id="account-book"
                    {...register("accountBook", { required: true })}
                    className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
                  >
                    <option value="">Select Account Book</option>
                    <option value="Hunter Boom Sdn Bhd">
                      Hunter Boom Sdn Bhd
                    </option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                </div>
              </div>

              {/* Credit Limit Column */}
              <div>
                <label
                  htmlFor="credit-limit"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  Credit Limit
                </label>
                <input
                  id="credit-limit"
                  type="text"
                  {...register("creditLimit")}
                  className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>

              {/* Credit Term Column */}
              <div>
                <label
                  htmlFor="credit-term"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  Credit Term
                </label>
                <input
                  id="credit-term"
                  type="text"
                  {...register("creditTerm")}
                  className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  {...register("address")}
                  className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>

              {/* Postal Code */}
              <div>
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  Postal Code
                </label>
                <input
                  id="postal-code"
                  type="text"
                  {...register("postalCode")}
                  className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  {...register("city")}
                  className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>

              {/* State */}
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  {...register("state")}
                  className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-[#F04E24] mb-8" />

          {/* Login Detail Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Login Detail
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  {...register("username")}
                  className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
              {/* New Password */}
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  {...register("newPassword")}
                  className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  {...register("confirmPassword")}
                  className="w-full px-3 py-2 bg-rose-50 text-black border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-[#F04E24] mb-8" />

          {/* Upload Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Upload</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
              {/* Upload (SSM / Director) Column */}
              <div>
                <label
                  htmlFor="upload-ssm"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  Upload (SSM / Director)
                </label>
                <div className="relative w-full h-12 bg-[#FFF0ED] border border-[#F24E1E] border-dashed rounded-md flex items-center justify-center cursor-pointer overflow-hidden py-2">
                  {/* Hidden file input */}
                  <input
                    id="upload-ssm"
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    aria-label="Upload file"
                    ref={fileInputRef}
                    onChange={e => {
                      setSelectedFile(e.target.files[0] || null);
                    }}
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
                {/* Show file name and remove button if file is selected */}
                {selectedFile && (
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-700 mr-2">{selectedFile.name}</span>
                    <button
                      type="button"
                      className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                      onClick={() => {
                        if (fileInputRef.current) fileInputRef.current.value = "";
                        setSelectedFile(null);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#F04E24] hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:ring-offset-2"
              >
                {loading ? "Creating..." : "Change"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSalesAgent;
