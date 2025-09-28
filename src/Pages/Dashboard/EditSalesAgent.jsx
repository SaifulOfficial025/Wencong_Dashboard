import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { CiImageOn } from "react-icons/ci";

const BASE_URL = 'http://10.10.13.83:9365';

function EditSalesAgent() {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [initialAgent, setInitialAgent] = useState(null);
  const [agentGroups, setAgentGroups] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/agent-group`);
        const json = await res.json();
        const data = json.data !== undefined ? json.data : json;
        setAgentGroups(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };
    loadGroups();
  }, []);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!id) return;
      try {
        const res = await fetch(`${BASE_URL}/api/agents/${id}`);
        const json = await res.json();
        const a = json.data !== undefined ? json.data : json;
        if (mounted && a) {
          setInitialAgent(a);
          reset({
            agentCode: a.code || "",
            // prefer agentName if backend returns it, fallback to companyName
            agentName: a.agentName || a.companyName || "",
            email: a.email || "",
            contactNumber: a.contactNumber || "",
            additionalContactNumber: a.addContactNumber || "",
            agentGroup: a.agentGroupId || "",
            // normalize status to lowercase so it matches option values
            status: a.status ? String(a.status).toLowerCase() : "",
            accountBook: a.accountBook || "",
            creditLimit: a.creditLimit || "",
            creditTerm: a.creditTerm || "",
            address: a.address || "",
            postalCode: a.addressPostalCode || "",
            city: a.addressCity || "",
            state: a.addressState || "",
            username: a.username || "",
            name: a.name || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    load();
    return () => (mounted = false);
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      setIsSaving(true);
      // build payload matching example
      const payload = {
        code: data.agentCode,
        // companyName: data.agentName,
        contactNumber: data.contactNumber,
        addContactNumber: data.additionalContactNumber,
        // email: data.email,
        address: data.address,
        addressPostalCode: data.postalCode,
        addressCity: data.city,
        addressState: data.state,
        username: data.username,
        // name: data.name,
        agentGroupId: data.agentGroup,
        accountBook: data.accountBook,
        creditLimit: data.creditLimit,
        creditTerm: data.creditTerm,
        // normalize status to lowercase before sending
        status: data.status ? String(data.status).toLowerCase() : data.status,
      };

      // include password only if provided
      if (data.newPassword && String(data.newPassword).trim().length > 0) {
        payload.password = data.newPassword;
      }

      let res;
      // If a file is selected, send multipart/form-data so backend can process the file
      if (selectedFile) {
        const formData = new FormData();
        // append payload fields
        Object.keys(payload).forEach((k) => {
          if (payload[k] !== undefined && payload[k] !== null) formData.append(k, String(payload[k]));
        });
  // include agentName (backend expects agentName field)
  if (data.agentName) formData.append("agentName", data.agentName);
        formData.append("file", selectedFile, selectedFile.name);
        // Debug: list formData entries so we can see what's being sent
        try {
          for (const pair of formData.entries()) {
            // eslint-disable-next-line no-console
            console.debug("[EditSalesAgent] formData entry:", pair[0], pair[1]);
          }
        } catch (e) {
          // ignore
        }

        res = await fetch(`${BASE_URL}/api/agents/${id}`, {
          method: "PUT",
          body: formData,
        });

        if (!res.ok) {
          // eslint-disable-next-line no-console
          console.debug("[EditSalesAgent] multipart PUT failed with status:", res.status);
          // let downstream code handle the error response body
        }
      } else {
        res = await fetch(`${BASE_URL}/api/agents/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const json = await res.json();
      // Debug: log response status and body
      // eslint-disable-next-line no-console
      console.debug("[EditSalesAgent] response status:", res.status, json);
      if (res.ok) {
        // use returned data to update UI immediately
        const returned = json.data !== undefined ? json.data : json;
        setInitialAgent(returned);
        // reset form to values returned from server (normalize status)
          reset({
          agentCode: returned.code || "",
          agentName: returned.agentName || returned.companyName || "",
          email: returned.email || "",
          contactNumber: returned.contactNumber || "",
          additionalContactNumber: returned.addContactNumber || "",
          agentGroup: returned.agentGroupId || "",
          status: returned.status ? String(returned.status).toLowerCase() : "",
          accountBook: returned.accountBook || "",
          creditLimit: returned.creditLimit || "",
          creditTerm: returned.creditTerm || "",
          address: returned.address || "",
          postalCode: returned.addressPostalCode || "",
          city: returned.addressCity || "",
          state: returned.addressState || "",
          username: returned.username || "",
          // name: returned.name || "",
          isTopLevel: 1,
          uplineAgentId : null,
        });
        // clear selected file after success
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        alert(json.message || "Agent updated successfully");
      } else {
        alert(json.message || "Failed to update agent");
      }
        setIsSaving(false);
      } catch (err) {
      console.error(err);
      alert(err.message || "Network error");
      setIsSaving(false);
    }
  };

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
        <h1 className="text-xl font-semibold">Edit Sales Agent Details</h1>
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
                  defaultValue="Agent 1001"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent text-black"
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
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent text-black"
                />
              </div>


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
                  defaultValue="+60123-1234567"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent text-black"
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
                  defaultValue="+60123-1234567"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent text-black"
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
                    className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none text-black"
                  >
                    <option value="">Select Agent Group</option>
                    {agentGroups.length ? (
                      agentGroups.map((g) => (
                        <option key={g.id ?? g.agentGroupId} value={g.id ?? g.agentGroupId}>{g.name}</option>
                      ))
                    ) : (
                      <>
                        <option value="Group A">Group A</option>
                        <option value="Group B">Group B</option>
                        <option value="Group C">Group C</option>
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
                    className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none text-black"
                  >
                    <option value="">Select Account Book</option>
                    {initialAgent && initialAgent.accountBook ? (
                      <option value={initialAgent.accountBook}>{initialAgent.accountBook}</option>
                    ) : (
                      <option value="Hunter Boom Sdn Bhd">Hunter Boom Sdn Bhd</option>
                    )}
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
                  defaultValue="RM30,000.00"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent text-black"
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
                  defaultValue="30days"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent text-black"
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
                  defaultValue="No 123, Jalan BAAAAA, 33, Taman XXXX"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent text-black"
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
                  defaultValue="81100"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent text-black"
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
                  defaultValue="XXX"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent text-black"
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
                  defaultValue="Johor"
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent text-black"
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
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent text-black"
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
                  {...register("newPassword", {
                    validate: (val) => {
                      const confirm = watch("confirmPassword");
                      // if both empty, user doesn't want to change password
                      if (!val && !confirm) return true;
                      if (!val) return "Password is required when confirming";
                      if (String(val).length < 8) return "Password must be at least 8 characters";
                      if (!/[A-Z]/.test(val)) return "Password must include an uppercase letter";
                      if (!/[a-z]/.test(val)) return "Password must include a lowercase letter";
                      if (!/[0-9]/.test(val)) return "Password must include a number";
                      return true;
                    },
                  })}
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent text-black"
                />
                {errors.newPassword && (
                  <p className="text-sm text-red-600 mt-1">{errors.newPassword.message}</p>
                )}
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
                  {...register("confirmPassword", {
                    validate: (val) => {
                      const pwd = watch("newPassword");
                      // if both empty, OK
                      if (!pwd && !val) return true;
                      if (!val) return "Please confirm your new password";
                      return val === pwd || "Passwords do not match";
                    },
                  })}
                  className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent text-black"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
            {/* <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-[#F04E24] hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:ring-offset-2"
              >
                Change
              </button>
            </div> */}
          </div>

          {/* Divider */}
          <hr className="border-[#F04E24] mb-8" />

          {/* Upload Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Upload</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* View (SSM / Director) Column */}
              <div>
                <label
                  htmlFor="view-ssm"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  View (SSM / Director)
                </label>
                <div className={`relative w-full ${initialAgent && initialAgent.file ? 'h-32' : 'h-12'} bg-[#FFF0ED] border border-[#F24E1E] border-dashed rounded-md flex items-center justify-center cursor-pointer overflow-hidden py-2`}>
                  {/* Hidden file input */}
             
                  {/* View icon or thumbnail if file exists */}
                  {initialAgent && initialAgent.file ? (
                    <a
                      href={`${BASE_URL}/${initialAgent.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center"
                    >
                      <img
                        src={`${BASE_URL}/${initialAgent.file}`}
                        alt="SSM / Director"
                        className="max-h-full w-auto object-contain"
                      />
                    </a>
                  ) : (
                    <CiImageOn />
                  )}
                </div>
              </div>

              {/* Update (SSM / Director) Column */}
              <div>
                <label
                  htmlFor="update-ssm"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  Update (SSM / Director)
                </label>
                <div className="relative w-full h-12 bg-[#FFF0ED] border border-[#F24E1E] border-dashed rounded-md flex items-center justify-center cursor-pointer overflow-hidden py-2">
                  {/* Hidden file input */}
                  <input
                    id="update-ssm"
                    type="file"
                    ref={fileInputRef}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    aria-label="Update file"
                    onChange={(e) => setSelectedFile(e.target.files[0] || null)}
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
                {/* show selected file name and allow removal */}
                {selectedFile && (
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-700 mr-2">{selectedFile.name}</span>
                    <button
                      type="button"
                      className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                      onClick={() => {
                        setSelectedFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        <div className="flex justify-end mt-4 mb-4">
              <button
                type="submit"
                disabled={isSaving}
                className={`bg-[#F04E24] hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:ring-offset-2 ${isSaving ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {isSaving ? 'Saving...' : 'Save Change'}
              </button>
            </div>
        </form>
      </div>
      
    </div>
  );
}

export default EditSalesAgent;
