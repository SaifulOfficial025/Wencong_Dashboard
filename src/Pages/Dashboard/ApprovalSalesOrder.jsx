import React from 'react';
import { Link } from 'react-router-dom';

// Main ApprovalSalesOrder functional component
const ApprovalSalesOrder = () => {
  return (
    // Main container for the entire page, with a light gray background and padding
    <div className="min-h-screen p-4 font-sans">
      {/* "Back to Sales Orders" link at the very top */}
      <div className="mx-auto mb-4 text-black dark:text-black font-medium cursor-pointer hover:underline">
        <Link to="/dashboard/sales_order">
          &lt; Back to Sales Orders
        </Link>
      </div>

      {/* Centered content area with white background, rounded corners, and shadow */}
      <div className=" mx-auto bg-white dark:bg-white rounded-md shadow-md">

        {/* Header Section */}
        <div className="bg-[#F04E24] dark:bg-[#F04E24] text-white dark:text-white py-3 px-5 flex items-center justify-between rounded-t-md">
          {/* Left-aligned group: Title and Status badge */}
          <div className="flex items-center gap-2">
            {/* Title of the page */}
            <h2 className="font-semibold text-lg">Approval Sales Order</h2>
            {/* Status badge */}
            <span className="bg-[#FFE3B8] dark:bg-[#FFE3B8] text-black dark:text-black py-1 px-3 rounded-sm text-sm font-medium">Pending</span>
          </div>
          {/* Right-aligned: Print button with an SVG icon */}
          <button className="text-sm font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity duration-200">
            {/* SVG icon for print */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M6 3.75a.75.75 0 01.75-.75h9a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-9a.75.75 0 01-.75-.75v-3zM3.75 6h.75v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9h.75a.75.75 0 01.75.75v9a3.75 3.75 0 01-3.75 3.75h-9A3.75 3.75 0 013 15.75v-9a.75.75 0 01.75-.75zM8.25 8.25a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3z" />
            </svg>
            Print
          </button>
        </div>

        {/* Action Buttons Section (Reject and Approve) */}
        <div className="px-5 py-3 flex justify-end gap-2">
          {/* Reject button with orange background */}
          <button className="bg-[#FF9900] dark:bg-[#FF9900] text-white dark:text-white py-2 px-4 rounded-md text-sm hover:bg-[#d1902f] dark:hover:bg-[#d1902f] transition-colors duration-200">Reject</button>
          {/* Approve button with green background */}
          <button className="bg-[#23DA52] dark:bg-[#23DA52] text-white dark:text-white py-2 px-4 rounded-md text-sm hover:bg-[#2fc053] dark:hover:bg-[#2fc053] transition-colors duration-200">Approve</button>
        </div>

        {/* Form Fields Section */}
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Sales Order No */}
            <div>
              <label htmlFor="salesOrderNo" className="block text-sm font-medium text-[#DE472D] dark:text-[#DE472D] mb-1">Sales Order No</label>
              <input
                type="text"
                id="salesOrderNo"
                className="block w-full rounded-md border-gray-300 dark:border-gray-300 shadow-sm sm:text-sm bg-white dark:bg-white text-gray-800 dark:text-gray-800 p-2"
                defaultValue="SO-000032"
              />
            </div>
            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-[#DE472D] dark:text-[#DE472D] mb-1">Date</label>
              <div className="relative">
                <input
                  type="date"
                  id="date"
                  className="block w-full rounded-md border-gray-300 dark:border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm bg-white dark:bg-white text-gray-800 dark:text-gray-800 p-2"
                  defaultValue="2023-07-18" // Example date
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-orange-500 dark:text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            {/* Agent Name */}
            <div>
              <label htmlFor="agentName" className="block text-sm font-medium text-[#DE472D] dark:text-[#DE472D] mb-1">Agent Name</label>
              <select
                id="agentName"
                className="block w-full rounded-md border-gray-300 dark:border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm bg-white dark:bg-white text-gray-800 dark:text-gray-800 p-2"
              >
                <option>COMPANY ABC</option>
                <option>Agent 1</option>
                <option>Agent 2</option>
              </select>
            </div>
            {/* Business Partner */}
            <div>
              <label htmlFor="businessPartner" className="block text-sm font-medium text-[#DE472D] dark:text-[#DE472D] mb-1">Business Partner</label>
              <select
                id="businessPartner"
                className="block w-full rounded-md border-gray-300 dark:border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm bg-white dark:bg-white text-gray-800 dark:text-gray-800 p-2"
              >
                <option>Mr. Lim</option>
                <option>Partner 1</option>
                <option>Partner 2</option>
              </select>
            </div>
          </div>

          {/* Contact Information and Remark Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Contact Person & Address */}
            <div className="bg-gray-100 dark:bg-gray-100 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-[#DE472D] dark:text-[#DE472D] mb-2">Contact Person & Address</h3>
              {/* These fields are now editable inputs */}
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 dark:border-gray-300 shadow-sm sm:text-sm bg-white dark:bg-white text-gray-800 dark:text-gray-800 p-2 mb-2"
                defaultValue="Mr. Lim"
              />
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 dark:border-gray-300 shadow-sm sm:text-sm bg-white dark:bg-white text-gray-800 dark:text-gray-800 p-2 mb-2"
                defaultValue="+6012345678"
              />
              <textarea
                rows="4"
                className="block w-full rounded-md border-gray-300 dark:border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm bg-white dark:bg-white text-gray-800 dark:text-gray-800 p-2"
                defaultValue="No 1, Jalan TK 5/44, Kinrara Industrial Park,\nJalan Puchong,\n47100 Puchong,\nSelangor, Malaysia."
              ></textarea>
            </div>

            {/* Credit Term, Credit Limit, and Remark */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="creditTerm" className="block text-sm font-medium text-[#DE472D] dark:text-[#DE472D] mb-1">Credit Term</label>
                  <input
                    type="text"
                    id="creditTerm"
                    className="block w-full rounded-md border-gray-300 dark:border-gray-300 shadow-sm sm:text-sm bg-white dark:bg-white text-gray-800 dark:text-gray-800 p-2"
                    defaultValue="Net 30 days"
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="creditLimit" className="block text-sm font-medium text-[#DE472D] dark:text-[#DE472D] mb-1">Credit Limit</label>
                  <input
                    type="text"
                    id="creditLimit"
                    className="block w-full rounded-md border-gray-300 dark:border-gray-300 shadow-sm sm:text-sm bg-white dark:bg-white text-gray-800 dark:text-gray-800 p-2"
                    defaultValue="RM30,000.00"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="remark" className="block text-sm font-medium text-[#DE472D] dark:text-[#DE472D] mb-1">Remark</label>
                <textarea
                  id="remark"
                  rows="3"
                  className="block w-full rounded-md border-gray-300 dark:border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm bg-white dark:bg-white text-gray-800 dark:text-gray-800 p-2"
                  defaultValue="(2 day delivery) Don't deliver on weekends"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Status Dropdown Section */}
          <div className="mb-6">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-700 mb-1">Status</label>
            <select id="status" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm bg-white dark:bg-white text-gray-800 dark:text-gray-800 p-2">
              <option className="bg-white dark:bg-white text-gray-800 dark:text-gray-800">Awaiting Shipment</option>
              <option className="bg-white dark:bg-white text-gray-800 dark:text-gray-800">Processing</option>
              <option className="bg-white dark:bg-white text-gray-800 dark:text-gray-800">Shipped</option>
              <option className="bg-white dark:bg-white text-gray-800 dark:text-gray-800">Delivered</option>
            </select>
          </div>

          {/* Items Table Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800 dark:text-gray-800 text-lg">Items</h3>
              {/* Add New button */}
              <button className="bg-white dark:bg-white text-[#F04E24] dark:text-[#F04E24] border border-[#F04E24] dark:border-[#F04E24] py-1 px-3 rounded-md text-sm hover:bg-[#F04E24] dark:hover:bg-[#F04E24] hover:text-white dark:hover:text-white transition-colors duration-200">
                + Add New
              </button>
            </div>
            {/* Responsive table container */}
            <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-200">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-200">
                <thead className="bg-[#F04E24] dark:bg-[#F04E24]">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-white dark:text-white uppercase">No</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-white dark:text-white uppercase">Product Code</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-white dark:text-white uppercase">Description</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-white dark:text-white uppercase">Qty</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-white dark:text-white uppercase">UOM</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-white dark:text-white uppercase">Unit Price</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-white dark:text-white uppercase">Price</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-white dark:text-white uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-white divide-y divide-gray-200 dark:divide-gray-200">
                  {/* Example Table Row 1 */}
                  <tr className="odd:bg-white even:bg-gray-50 dark:odd:bg-white dark:even:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-700">1</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-700">CH00001</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-700">10寸138金猴王|10"138 SHOOT CAKE WOLF</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-700">
                      <input type="number" className="w-20 border-gray-300 dark:border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm bg-white dark:bg-white text-gray-800 dark:text-gray-800 p-1" defaultValue="15" />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-700">
                      <select className="border-gray-300 dark:border-gray-300 rounded-md shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm bg-white dark:bg-white text-gray-800 dark:text-gray-800 p-1">
                        <option className="bg-white dark:bg-white text-gray-800 dark:text-gray-800">Ctn</option>
                        <option className="bg-white dark:bg-white text-gray-800 dark:text-gray-800">Pcs</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-700">100.00</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-700">1,500.00</td>
                    <td className="px-4 py-3 text-right text-sm font-medium">
                      <button className="bg-red-500 dark:bg-red-500 text-white dark:text-white py-1 px-3 rounded-md hover:bg-red-600 dark:hover:bg-red-600 transition-colors duration-200">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Total Quantity display */}
            <div className="py-2 text-right text-sm font-medium text-gray-700 dark:text-gray-700">Total Qty <span className="font-semibold">15</span></div>
          </div>

          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Promotion dropdown */}
            <div>
              <label htmlFor="promotion" className="block text-sm font-medium text-gray-700 dark:text-gray-700 mb-1">Promotion</label>
              <select id="promotion" className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm bg-white dark:bg-white text-gray-800 dark:text-gray-800 p-2">
                <option className="bg-white dark:bg-white text-gray-800 dark:text-gray-800">Deduct RM 10</option>
                <option className="bg-white dark:bg-white text-gray-800 dark:text-gray-800">Deduct RM 20</option>
                <option className="bg-white dark:bg-white text-gray-800 dark:text-gray-800">No Promotion</option>
              </select>
            </div>
            {/* Financial summary details */}
            <div className="space-y-1">
              <div className="flex justify-between py-1 text-sm text-gray-700 dark:text-gray-700"><span>Sub Total (Excluding GST)</span> <span className="font-semibold">1,500.00</span></div>
              <div className="flex justify-between py-1 text-sm text-gray-700 dark:text-gray-700"><span>Promotion</span> <span className="font-semibold">10.00</span></div>
              <div className="flex justify-between py-1 text-sm text-gray-700 dark:text-gray-700"><span>GST payable @6%</span> <span className="font-semibold">89.40</span></div>
              <div className="flex justify-between py-1 text-lg font-bold text-gray-800 dark:text-gray-800"><span>Total (Inclusive GST)</span> <span>1,579.40</span></div>
            </div>
          </div>
        </div>

        {/* Bottom Actions Section */}
        <div className="px-5 py-4 flex justify-between items-center rounded-b-md bg-gray-100 dark:bg-gray-100">
          {/* Combine Order button */}
          <button className="bg-[#F04E24] dark:bg-[#F04E24] text-white dark:text-white py-2 px-4 rounded-md text-sm hover:bg-[#c23c23] dark:hover:bg-[#c23c23] transition-colors duration-200">Combine Order</button>
          {/* Close and Save buttons */}
          <div className="flex gap-2">
            <button className="bg-white dark:bg-white border border-gray-300 dark:border-gray-300 text-gray-700 dark:text-gray-700 py-2 px-4 rounded-md text-sm hover:bg-gray-200 dark:hover:bg-gray-200 transition-colors duration-200">Close</button>
            <button className="bg-[#F04E24] dark:bg-[#F04E24] text-white dark:text-white py-2 px-4 rounded-md text-sm hover:bg-[#c23c23] dark:hover:bg-[#c23c23] transition-colors duration-200">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApprovalSalesOrder;
