import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { MdOutlineBarChart } from "react-icons/md";
import wencong_logo from "../../../public/huntrerboom_logo.png";
// import AgentSalesReport from "..Dashboard/AgentSalesReport";
import { CiSettings } from "react-icons/ci";
import { BsDatabaseCheck } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Dashboard() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [selectedItem, setSelectedItem] = useState("Dashboard");
	const location = useLocation();
	const navigate = useNavigate();

	const menuItems = [
		{
			items: [
				{
					name: "Dashboard",
					icon: <LuLayoutDashboard size={20} />,
					path: "",
				},
				{
					name: "Sales Order",
					icon: <MdOutlineBarChart size={20} />,
					path: "sales_order",
				},
				{
					name: "Sales Report",
					icon: <MdOutlineBarChart size={20} />,
					path: "sales_report",
					children: [
						{
							name: "Agent Sales Report",
							path: "sales_report/agent_sales_report",
						},
						{
							name: "Item Sales Report",
							path: "sales_report/item_sales_report",
						},
						{
							name: "Stock Remain Report",
							path: "sales_report/stock_remain_report",
						},
						{
							name: "Area Sales Report",
							path: "sales_report/area_sales_report",
						},
						{
							name: "Performance Report",
							path: "sales_report/performance_report",
						},
					],
				},
				{
					name: "Settings",
					icon: <CiSettings />,
					path: "settings",
					children: [
						{ name: "Users (Office Use)", path: "settings/users" },
						{
							name: "System Settings",
							path: "settings/system_settings",
						},
					],
				},
				{
					name: "Master Data",
					icon: <BsDatabaseCheck />,
					path: "master_data",
					children: [
						{
							name: "Sales Agent",
							path: "master_data/sales_agent",
						},
						{
							name: "Sales Agent Group",
							path: "master_data/sales_agent_group",
						},
						{ name: "Product", path: "master_data/product" },
						{ name: "Pricing", path: "master_data/pricing" },
						{ name: "Promotion", path: "master_data/promotion" },
						// { name: "Delivery Fee", path: "master_data/delivery_fee" },
					],
				},
			],
		},
	];

	useEffect(() => {
		const currentItem = menuItems[0].items.find(
			(item) => item.path === location.pathname
		);
		if (currentItem) {
			setSelectedItem(currentItem.name);
		}
	}, [location.pathname]);

	const handleItemClick = (name, path) => {
		setSelectedItem(name);
		navigate(path);

		// Auto-collapse on mobile
		if (window.innerWidth < 768) {
			setIsCollapsed(true);
		}
	};

	return (
		<div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden">
			{/* Sidebar */}
			<aside
				className={`
        fixed md:static top-0 left-0 h-screen z-40
        bg-white border-r border-gray-200 overflow-y-auto
        transition-all duration-500 ease-in-out
        ${isCollapsed ? "w-20" : "w-64"}
        ${isCollapsed ? "-translate-x-full md:translate-x-0" : "translate-x-0"}
        md:translate-x-0
      `}
			>
				{/* Mobile Toggle Button */}
				<button
					onClick={() => setIsCollapsed(!isCollapsed)}
					className={`
          fixed top-4 left-4 z-50 p-2 rounded shadow
          bg-white text-gray-800 border border-gray-300
          dark:bg-gray-800 dark:text-white dark:border-gray-600
          md:hidden
        `}
				>
					{isCollapsed ? ">" : "<"}
				</button>

				{/* Logo */}
				<div className="flex items-center justify-center h-16 px-4 mt-10">
					<div
						className={`transition-all duration-500 ${
							isCollapsed ? "w-10" : "w-32"
						}`}
					>
						<img
							src={wencong_logo}
							alt="Logo"
							className={`transition-all duration-500 ${
								isCollapsed ? "w-8 h-8" : "w-full h-auto"
							}`}
						/>
					</div>
				</div>

				{/* Navigation */}
				<nav className="p-4 mt-10">
					{menuItems.map((section, idx) => (
						<div key={idx} className="mb-8">
							<ul className="space-y-2">
								{section.items.map((item, itemIdx) => (
									<li key={itemIdx}>
										<div
											onClick={() => {
												if (item.children) {
													setSelectedItem((prev) =>
														prev === item.name
															? ""
															: item.name
													);
												} else {
													handleItemClick(
														item.name,
														item.path
													);
												}
											}}
											className="flex items-center justify-between cursor-pointer px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 group"
										>
											<div className="flex items-center gap-3 overflow-hidden">
												<span className="text-[#DE472D] group-hover:text-[#DE472D] transition-colors duration-300">
													{item.icon}
												</span>
												<span
													className={`transform text-[#DE472D] font-medium transition-all duration-500 ${
														isCollapsed
															? "opacity-0 -translate-x-4 w-0"
															: "opacity-100 translate-x-0"
													} whitespace-nowrap`}
												>
													{item.name}
												</span>
											</div>
											{item.children && !isCollapsed && (
												<span className="text-[#DE472D]">
													{selectedItem === item.name
														? "▲"
														: "▼"}
												</span>
											)}
										</div>

										{/* Children Dropdown */}
										{item.children &&
											selectedItem === item.name && (
												<ul className="ml-8 mt-1 space-y-1">
													{item.children.map(
														(child, childIdx) => (
															<li key={childIdx}>
																<Link
																	to={
																		child.path
																	}
																	onClick={() =>
																		handleItemClick(
																			child.name,
																			child.path
																		)
																	}
																	className="block text-sm text-[#de472d] hover:bg-[#fcedea] transition-colors duration-300 p-2 rounded-md"
																>
																	{child.name}
																</Link>
															</li>
														)
													)}
												</ul>
											)}
									</li>
								))}
							</ul>
						</div>
					))}
				</nav>
			</aside>

			<div className="flex-1 flex flex-col overflow-hidden w-full">
				{/* Navbar */}
				<header className="h-16 bg-[#de472d] text-white border-b border-gray-200 sticky top-0 z-20">
					<div className="h-full px-4 flex items-center justify-between w-full">
						<div className="flex items-center gap-4 text-white">
							<button
								onClick={() => setIsCollapsed(!isCollapsed)}
								className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-300"
							>
								{isCollapsed ? (
									<ChevronsRight size={20} />
								) : (
									<ChevronsLeft size={20} />
								)}
							</button>
							<div className="flex flex-col">
								<span className="text-white font-bold text-xl">
									{selectedItem}
								</span>
							</div>
						</div>
					</div>
				</header>

				<main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 bg-[#FFE4DF]">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
