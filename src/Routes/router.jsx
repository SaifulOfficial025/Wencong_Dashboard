import { createBrowserRouter } from "react-router-dom";
import AdminHome from "../Pages/Dashboard/Home";
import Bookings from "../Pages/Dashboard/Bookings";
import SignUp from "../Pages/Authentication/SignIn";
import SalesOrder from "../Pages/Dashboard/SalesOrder";
import AddProduct from "../Pages/Dashboard/AddSellsOrder";
import Dashboard from "../Pages/Dashboard/Dashboard";
import RequireAuth from "./RequireAuth";
import { MdOutlineBarChart } from "react-icons/md";
import AgentSalesReport from "../Pages/Dashboard/AgentSalesReport";
import ItemSalesReport from "../Pages/Dashboard/ItemSalesReport";
import StockRemainReport from "../Pages/Dashboard/StockRemainReport";
import AreaSalesReport from "../Pages/Dashboard/AreaSalesReport";
import PerformanceReport from "../Pages/Dashboard/PerformanceReport";
import SystemSettings from "../Pages/Dashboard/SystemSettings";
import UserSettings from "../Pages/Dashboard/UserSettings";
import EditUser from "../Pages/Dashboard/EditUser";

import { CiSettings } from "react-icons/ci";
import AddNewUser from "../Pages/Dashboard/AddNewUser";
import SalesAgent from "../Pages/Dashboard/SalesAgent";
import SalesAgentGroup from "../Pages/Dashboard/SalesAgentGroup";
import Product from "../Pages/Dashboard/Product";
import Pricing from "../Pages/Dashboard/Pricing";
import Promotion from "../Pages/Dashboard/Promotion";
import DeliveryFee from "../Pages/Dashboard/DeliveryFee";
import AddNewSalesAgent from "../Pages/Dashboard/AddNewSalesAgent";
import EditSalesAgent from "../Pages/Dashboard/EditSalesAgent";
import AddNewSalesAgentGroup from "../Pages/Dashboard/AddNewSalesAgentGroup";
import EditProductDetails from "../Pages/Dashboard/EditProductDetails";
import AddPromotion from "../Pages/Dashboard/AddPromotion";
import EditPromotionalDetails from "../Pages/Dashboard/EditPromotionalDetails";
import Signin from "../Pages/Authentication/SignIn";
import AddSellsOrder from "../Pages/Dashboard/AddSellsOrder";
import ApprovalSalesOrder from "../Pages/Dashboard/ApprovalSalesOrder";
import UpdateShipment from "../Pages/Dashboard/UpdateShipment";
import CancelOrder from "../Pages/Dashboard/CancelOrder";
import CompletedOrder from "../Pages/Dashboard/CompletedOrder";
import ReturnItem from "../Pages/Dashboard/ReturnItem";
import EditNewSalesAgentGroup from "../Pages/Dashboard/EditNewSalesAgentGroup";
import EditSellsOrder from "../Pages/Dashboard/EditSellsOrder";

// import AgentSalesReport from "../Pages/Dashboard/AgentSalesReport";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Signin />,
	},
	{
		path: "/sign_up",
		element: <SignUp />,
	},
	{
		path: "/dashboard",
		element: (
			// <RequireAuth>
			<Dashboard />
			// </RequireAuth>
		),
		children: [
			{
				index: true,
				element: <AdminHome />,
			},
			{
				path: "home",
				element: <AdminHome />,
			},
			{
				path: "sales_order",
				element: <SalesOrder />,
			},
			{
				path: "/dashboard/sales_order/approval_sales_order",
				element: <ApprovalSalesOrder />,
			},
			{
				path: "/dashboard/sales_order/update_shipment",
				element: <UpdateShipment />,
			},
			{
				path: "/dashboard/sales_order/cancel_order",
				element: <CancelOrder />,
			},
			{
				path: "/dashboard/sales_order/completed_order",
				element: <CompletedOrder />,
			},
			{
				path: "/dashboard/sales_order/return_item",
				element: <ReturnItem />,
			},
			{
				path: "booking_info",
				element: <Bookings />,
			},
			{
				path: "/dashboard/sales_order/add_new_sales_order",
				element: <AddSellsOrder />,
			},
			{
				path: "/dashboard/settings/sales_order/edit_order/:id",
				element: <EditSellsOrder />,
			},
			{
				path: "sales_report",
				children: [
					{
						path: "agent_sales_report",
						element: <AgentSalesReport />,
					},
					{ path: "item_sales_report", element: <ItemSalesReport /> },
					{
						path: "stock_remain_report",
						element: <StockRemainReport />,
					},
					{ path: "area_sales_report", element: <AreaSalesReport /> },
					{
						path: "performance_report",
						element: <PerformanceReport />,
					},
				],
			},
			{
				path: "settings",
				children: [
					{ path: "users", element: <UserSettings /> },
					{ path: "system_settings", element: <SystemSettings /> },
				],
			},
			{
				path: "/dashboard/settings/users/edit_user/:id?",
				element: <EditUser />,
			},
			{
				path: "/dashboard/settings/users/add_new_user",
				element: <AddNewUser />,
			},
			{
				path: "master_data",
				children: [
					{ path: "sales_agent", element: <SalesAgent /> },
					{ path: "sales_agent_group", element: <SalesAgentGroup /> },
					{ path: "product", element: <Product /> },
					{ path: "pricing", element: <Pricing /> },
					{ path: "promotion", element: <Promotion /> },
					{ path: "delivery_fee", element: <DeliveryFee /> },
				],
			},
			{
				path: "/dashboard/master_data/sales_agent/add_new_sales_agent",
				element: <AddNewSalesAgent />,
			},
			{
				path: "/dashboard/master_data/sales_agent/edit_sales_agent/:id",
				element: <EditSalesAgent />,
			},
			{
				path: "/dashboard/master_data/sales_agent_group/add_new_sales_agent_group",
				element: <AddNewSalesAgentGroup />,
			},
			{
				path: "/dashboard/master_data/product/edit_product_details/",
				element: <EditProductDetails />,
			},
			{
				path: "/dashboard/master_data/sales_agent_group/add_promotion",
				element: <AddPromotion />,
			},
			{
				path: "/dashboard/master_data/sales_agent_group/edit_promotion_details/",
				element: <EditPromotionalDetails />,
			},
			{
				path: "/dashboard/master_data/sales_agent_group/edit_sales_agent_group",
				element: <EditNewSalesAgentGroup />,
			},
		],
	},
]);
