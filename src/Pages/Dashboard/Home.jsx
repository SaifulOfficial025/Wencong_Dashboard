// const Home = () => {
//   const dashboardData = [
//     { id: 1, title: "Processing", amount: "785" },
//     { id: 2, title: "Awaiting Shipment", amount: "45" },
//     { id: 3, title: "Shipped", amount: "185" },
//     { id: 4, title: "Cancelled", amount: "32" },
//     { id: 5, title: "Completed", amount: "12,585" },
//     { id: 6, title: "Return", amount: "12" }
//   ];

import Graph from "./LinkedItems/Graph";

//   const salesByCompany = [
//     { id: 1, name: "ABC COMPANY", items: 1220, total: "RM123,450.00" },
//     { id: 2, name: "ABC COMPANY", items: 1145, total: "RM111,450.00" },
//     { id: 3, name: "ABC COMPANY", items: 1034, total: "RM102,450.00" }
//   ];

//   const topOverdueCompany = [
//     { id: 1, name: "ABC COMPANY", overdue: ">180days", amount: "RM123,220.00" },
//     { id: 2, name: "ABC COMPANY", overdue: ">180days", amount: "RM123,220.00" },
//     { id: 3, name: "ABC COMPANY", overdue: ">180days", amount: "RM123,220.00" }
//   ];

//   return (
//     <div className="space-y-10">
//       {/* Dashboard Summary */}
//       <div className="bg-white shadow-md rounded-[10px] p-8">
//         <h1 className="text-[#F04E24] mb-10">Order Dashboard</h1>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-10">
//           {dashboardData.map((dashboard_info, index) => (
//             <div
//               key={dashboard_info.id}
//               className={`${
//                 index !== dashboardData.length - 1 ? "border-r-2" : ""
//               } border-[#F04E24] pr-4`}
//             >
//               <h1 className="text-[14px] text-black">{dashboard_info.title}</h1>
//               <p className="text-[#F04E24] text-[32px] font-bold">
//                 {dashboard_info.amount}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Sales and Overdue Tables */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
//         {/* Sales By Company */}
//         <div className="bg-[#ffff] shadow-md rounded-[15px] p-6">
//           <h2 className="text-[#F04E24] text-lg font-semibold mb-4">Sales By Company</h2>
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left">
//                 <th className="py-2">Company Name</th>
//                 <th>Total Sales Item</th>
//                 <th>Total Sales</th>
//               </tr>
//             </thead>
//             <tbody>
//               {salesByCompany.map((item, idx) => (
//                 <tr key={item.id} className="bg-[#FFDADA] ">
//                   <td className="py-2 px-2">{`${item.id}. ${item.name}`}</td>
//                   <td className="px-2">{item.items}</td>
//                   <td className="px-2">{item.total}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Top Overdue Company */}
//         <div className="bg-[#ffffff] shadow-md rounded-[15px] p-6">
//           <h2 className="text-[#F04E24] text-lg font-semibold mb-4">Top Overdue Company</h2>
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left">
//                 <th className="py-2">Company Name</th>
//                 <th>Overdue</th>
//                 <th>Overdue Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {topOverdueCompany.map((item, idx) => (
//                 <tr key={item.id} className="bg-[#FFDADA]">
//                   <td className="py-2 px-2">{`${item.id}. ${item.name}`}</td>
//                   <td className="px-2">{item.overdue}</td>
//                   <td className="px-2">{item.amount}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

const Home = () => {
  const dashboardData = [
    { id: 1, title: "Processing", amount: "785" },
    { id: 2, title: "Awaiting Shipment", amount: "45" },
    { id: 3, title: "Shipped", amount: "185" },
    { id: 4, title: "Cancelled", amount: "32" },
    { id: 5, title: "Completed", amount: "12,585" },
    { id: 6, title: "Return", amount: "12" },
  ];

  const salesByCompany = [
    { id: 1, name: "ABC COMPANY", items: 1220, total: "RM123,450.00" },
    { id: 2, name: "ABC COMPANY", items: 1145, total: "RM111,450.00" },
    { id: 3, name: "ABC COMPANY", items: 1034, total: "RM102,450.00" },
  ];

  const topOverdueCompany = [
    { id: 1, name: "ABC COMPANY", overdue: ">180days", amount: "RM123,220.00" },
    { id: 2, name: "ABC COMPANY", overdue: ">180days", amount: "RM123,220.00" },
    { id: 3, name: "ABC COMPANY", overdue: ">180days", amount: "RM123,220.00" },
  ];

  return (
    <div className="space-y-10">
      {/* Dashboard Summary */}
      <div className="bg-white shadow-md rounded-[10px] p-4 sm:p-6 md:p-8">
        <h1 className="text-[#F04E24] mb-6 sm:mb-8 md:mb-10 text-xl sm:text-2xl font-semibold">
          Order Dashboard
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {dashboardData.map((dashboard_info, index) => (
            <div
              key={dashboard_info.id}
              className={`flex flex-col border-r border-[#F04E24] pr-2 sm:pr-3 md:pr-4 last:border-r-0`}
            >
              <h1 className="text-[12px] sm:text-[14px] text-black">
                {dashboard_info.title}
              </h1>
              <p className="text-[#F04E24] text-[18px] sm:text-[22px] md:text-[26px] lg:text-[32px] font-bold">
                {dashboard_info.amount}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* graph */}

      <Graph />

      {/* Sales and Overdue Boxes with Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sales By Company */}
        <div className="bg-white dark:bg-white shadow-md rounded-[15px] p-6">
          <h2 className="text-[#F04E24] text-lg font-semibold mb-4">
            Sales By Company
          </h2>

          {/* Headers */}
          <div className="grid grid-cols-3 font-semibold mb-3 px-2 text-xs sm:text-sm text-black dark:text-black">
            <div>Company Name</div>
            <div>Total Sales Item</div>
            <div>Total Sales</div>
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-3">
            {salesByCompany.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-3 bg-[#FFDADA] dark:bg-[#FFDADA] text-black dark:text-black px-2 py-2 text-xs sm:text-sm"
              >
                <div>{`${item.id}. ${item.name}`}</div>
                <div>{item.items}</div>
                <div>{item.total}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Overdue Company */}
        <div className="bg-white dark:bg-white shadow-md rounded-[15px] p-6">
          <h2 className="text-[#F04E24] text-lg font-semibold mb-4">
            Top Overdue Company
          </h2>

          {/* Headers */}
          <div className="grid grid-cols-3 font-semibold mb-3 px-2 text-xs sm:text-sm text-black dark:text-black">
            <div>Company Name</div>
            <div>Overdue</div>
            <div>Overdue Amount</div>
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-3">
            {topOverdueCompany.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-3 bg-[#FFDADA] dark:bg-[#FFDADA] text-black dark:text-black px-2 py-2 text-xs sm:text-sm"
              >
                <div>{`${item.id}. ${item.name}`}</div>
                <div>{item.overdue}</div>
                <div>{item.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
