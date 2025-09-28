import { useState, useEffect, useContext } from "react";
import home_icon from "../../../public/icon_home.png";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { OrderContext } from "../../ContextAPI/OrderContext";

export default function OrderTable() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  const tabs = [
    "All",
    "Pending",
    "Awaiting Shipment",
    "Cancelled",
    "Completed",
    "Return",
  ];

  const { orders: fetchedOrders, fetchOrders, loading } = useContext(OrderContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // initial load
    fetchOrders().then((res) => {
      if (res && res.data) setOrders(res.data || []);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedOrders(orders.map((_, index) => index));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (index, checked) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, index]);
    } else {
      setSelectedOrders(selectedOrders.filter((i) => i !== index));
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "badge text-xs font-medium px-3 py-1";
    switch (status) {
      case "Awaiting":
        return `${baseClasses} bg-orange-100 text-orange-800 border-orange-200`;
      case "Pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800 border-yellow-200`;
      case "Cancelled":
        return `${baseClasses} bg-gray-100 text-gray-800 border-gray-200`;
      case "Completed":
        return `${baseClasses} bg-green-100 text-green-800 border-green-200`;
      case "Return":
        return `${baseClasses} bg-red-100 text-red-800 border-red-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 border-gray-200`;
    }
  };

  const normalizeStatus = (s) => {
    if (!s) return "";
    const str = String(s);
    // map common backend values to UI labels
    if (/awaiting/i.test(str)) return "Awaiting Shipment";
    if (/pending/i.test(str)) return "Pending";
    if (/cancel/i.test(str)) return "Cancelled";
    if (/complete/i.test(str)) return "Completed";
    if (/return/i.test(str)) return "Return";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const mappedOrders = (orders || []).map((o) => {
    const itemCount = Array.isArray(o.orderItems) ? o.orderItems.length : 0;
    const itemDetails = Array.isArray(o.orderItems) && o.orderItems.length > 0
      ? o.orderItems.map((it) => `${it.productCode} x${it.productQty}`).join(", ")
      : "";
    return {
      raw: o,
      id: o.orderNumber || o.soNumber || o.orderId,
      date: o.date ? new Date(o.date).toLocaleString() : "",
      status: normalizeStatus(o.status),
      customer: o.agentId || o.partnerId || "",
      image: home_icon,
      address: o.address || "",
      phone: "",
      items: `${itemCount} Items`,
      itemDetails,
      remark: o.remark || "",
      shipment: `${o.courier || ""} ${o.shippingPrice ? "MYR" + Number(o.shippingPrice) : ""}`.trim(),
    };
  });

  const filteredOrders = mappedOrders.filter(
    (order) =>
      (activeTab === "All" || order.status === activeTab) &&
      (statusFilter === "" || order.status === statusFilter)
  );

  return (
    <div className="min-h-screen bg-red-50 dark:bg-red-50 p-3 sm:p-4 md:p-6">
      <div className="mx-auto">
        {/* Header Tabs */}
        <div className="tabs tabs-boxed mb-4 sm:mb-6 overflow-x-auto whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab font-semibold
        ${
          activeTab === tab
            ? "tab-active !text-[#F04E24] dark:!text-[#F04E24]"
            : "!text-gray-700 dark:!text-gray-700 hover:!text-[#F04E24] dark:hover:!text-[#F04E24]"
        }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-5 mb-4 sm:mb-5">
          <div className="w-full sm:flex-1 relative sm:basis-7/12 mb-3 sm:mb-0">
            <input
              type="text"
              placeholder="Order number/Customer name/SKU..."
              className="input input-bordered w-full pr-10 bg-white dark:bg-white dark:text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="w-full sm:basis-5/12 mb-3 sm:mb-0">
            <select className="select select-neutral bg-white dark:bg-white dark:text-black w-full">
              <option>All Status</option>
              <option>All</option>
              <option>Pending</option>
              <option>Awaiting Shipment</option>
              <option>Cancelled</option>
              <option>Completed</option>
              <option>Return</option>
            </select>
          </div>

          <Link
            to="/dashboard/sales_order/add_new_sales_order"
            className="btn bg-[#F04E24] hover:bg-orange-600 text-white w-full sm:w-auto"
          >
            Add New Order
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="table w-full min-w-[900px]">
            <thead className="bg-[#F04E24] text-white text-[14px]">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs rounded-sm"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={selectedOrders.length === filteredOrders.length}
                  />
                </th>
                <th className="text-left font-semibold whitespace-normal break-words">
                  Sales Order & Date
                </th>
                <th className="text-left font-semibold whitespace-normal break-words w-[180px]">
                  Status
                </th>
                <th className="text-left font-semibold whitespace-normal break-words">
                  Recipient
                </th>
                <th className="text-left font-semibold whitespace-normal break-words">
                  Items
                </th>
                <th className="text-left font-semibold whitespace-normal break-words">
                  Remark
                </th>
                <th className="text-left font-semibold whitespace-normal break-words">
                  Shipment
                </th>
                <th className="text-left font-semibold whitespace-normal break-words">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-[#FFF1EE]"
                  } hover:bg-gray-50 dark:bg-white dark:hover:bg-[#fbe1dd]`}
                >
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-xs rounded-sm"
                      checked={selectedOrders.includes(index)}
                      onChange={(e) =>
                        handleSelectOrder(index, e.target.checked)
                      }
                    />
                  </td>
                  <td className="whitespace-normal break-words text-[13px]">
                    <div className="font-semibold text-[#F04E24] dark:text-[#F04E24]">
                      {order.id}
                    </div>
                    <div className="text-[#516F90] dark:text-[#516F90]">
                      Created: {order.date}
                    </div>
                  </td>
                  <td className="text-[13px] whitespace-normal break-words">
                    <span
                      className={`${getStatusBadge(
                        order.status
                      )} dark:text-black`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="whitespace-normal break-words">
                    <div className="flex items-start gap-2">
                      <img src={home_icon} alt="" className="shrink-0" />
                      <div>
                        <div className="font-semibold text-[13px] dark:text-black">
                          {order.customer}
                        </div>
                        <div className="text-[#516F90] text-[13px] break-words dark:text-[#516F90]">
                          {order.address}
                        </div>
                        <div className="text-[#516F90] text-[13px] break-words dark:text-[#516F90]">
                          {order.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-normal break-words">
                    <div>
                      <div className="font-semibold text-[13px] dark:text-black">
                        {order.items}
                      </div>
                      <div className="text-[#516F90] text-[13px] max-w-xs break-words dark:text-[#516F90]">
                        {order.itemDetails}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-normal break-words text-gray-600 dark:text-gray-600 text-[13px] max-w-xs">
                    {order.remark}
                  </td>
                  <td className="whitespace-normal break-words dark:text-black">
                    <div className="flex items-center gap-2">
                      <img src={order.image} alt="" className="w-[50px]" />
                      <span className="text-sm break-words">
                        {order.shipment}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-normal break-words">
                    <div className="dropdown dropdown-end border p-1 rounded-full hover:bg-[#f8d1ca]">
                      <div tabIndex={0} role="button" className="m-1">
                        <BsThreeDots className="flex mx-auto justify-center dark:text-black" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-[#FFE4DF] dark:bg-[#FFE4DF] rounded-box w-40 shadow-md border border-gray-300"
                      >
                        <li>
                          <Link
                            to={
                              order.status === "Pending"
                                ? "/dashboard/sales_order/approval_sales_order"
                                : order.status === "Awaiting Shipment"
                                ? "/dashboard/sales_order/update_shipment"
                                : order.status === "Cancelled"
                                ? "/dashboard/sales_order/cancel_order"
                                : order.status === "Completed"
                                ? "/dashboard/sales_order/completed_order"
                                : order.status === "Return"
                                ? "/dashboard/sales_order/return_item"
                                : `/product/${order?.id}`
                            }
                            className="hover:bg-[#f78e7c] flex justify-center dark:text-black"
                          >
                            Edit
                          </Link>
                        </li>
                        <li>
                          <a className="hover:bg-[#f78e7c] flex justify-center dark:text-black">
                            Change Status
                          </a>
                        </li>
                        <li>
                          <a className="hover:bg-[#f78e7c] flex justify-center dark:text-black">
                            Print
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-end items-center mt-4 sm:mt-6 gap-2 sm:gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-600">
              Viewing 1-12 of 61
            </span>
            <div className="join flex-wrap">
              <button
                className="join-item btn btn-sm
          dark:bg-transparent
          dark:text-gray-600
          dark:border-transparent
          dark:hover:bg-[#FFE4DF]"
              >
                «
              </button>
              <button
                className="join-item btn btn-sm btn-active
          bg-orange-500 text-white border-orange-500
          dark:bg-[#F04E24]
          dark:border-[#F04E24]
          dark:text-white"
              >
                1
              </button>
              {[2, 3, 4].map((num) => (
                <button
                  key={num}
                  className="join-item btn btn-sm
            dark:bg-transparent
            dark:text-gray-600
            dark:border-transparent
            dark:hover:bg-[#FFE4DF]"
                >
                  {num}
                </button>
              ))}
              <button
                className="join-item btn btn-sm
          dark:bg-transparent
          dark:text-gray-600
          dark:border-transparent
          dark:hover:bg-[#FFE4DF]"
              >
                »
              </button>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
