import React from 'react';
import { useForm } from 'react-hook-form';
// import { TiExport } from 'react-icons/ti'; // Removed the problematic import
import { ChevronDown } from 'lucide-react'; // Import ChevronDown for dropdowns
import { Link } from 'react-router-dom';

function Product() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  // Dummy data for the table rows based on the image
  const tableData = Array(7).fill().map((_, i) => ({
    productCode: '400-001',
    productName: '10尺满地黄金 | 10B KAKI EMAS',
    category: '响声类 Soundcloud',
    defaultPrice: 'RM180.00',
  }));

  return (
    <div className="p-6 bg-white max-h-screen text-[#F24E1E] font-semibold rounded-lg">
      {/* Filter Options */}
      <div className=" p-4 rounded-lg  mb-6">
        <h2 className="text-[#F24E1E] font-semibold mb-4">Filter Options</h2>
        <hr className="border-[#F04E24] mb-8" />
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Product Name */}
          <div className="relative">
            <select
              {...register('produ  ctName')}
              className="w-full p-2 border border-rose-100 rounded bg-[#FDE5E0] focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
            >
              <option value="">Product Name</option>
              <option value="item1">Item 1</option>
              <option value="item2">Item 2</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>

          {/* Product Code */}
          <div className="relative">
            <select
              {...register('productCode')}
              className="w-full p-2 border border-rose-100 rounded bg-[#FDE5E0] focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
            >
              <option value="">Product Code</option>
              <option value="code1">Code 1</option>
              <option value="code2">Code 2</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>

          {/* Category */}
          <div className="relative">
            <select
              {...register('category')}
              className="w-full p-2 border border-rose-100 rounded bg-[#FDE5E0] focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
            >
              <option value="">Category</option>
              <option value="cat1">Category 1</option>
              <option value="cat2">Category 2</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>

          {/* Search Button */}
          <button type="submit" className="bg-[#F24E1E] text-white px-4 py-2 rounded w-full">Search</button>
        </form>
        <hr className="border-[#F04E24] mb-8 mt-10" />
      </div>

      {/* Table Section */}
      <div className="mt-6 bg-white rounded-lg shadow overflow-x-auto">
        
        <table className="w-full text-left border-t">
          <thead className="bg-[#F24E1E] text-white">
            <tr>
              <th className="px-4 py-2">Product Code</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Default Price</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {tableData.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="px-4 py-2">{item.productCode}</td>
                <td className="px-4 py-2">{item.productName}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.defaultPrice}</td>
                <td className="px-4 py-2 text-blue-500 underline cursor-pointer">
                  <Link to="/dashboard/master_data/product/edit_product_details/">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 text-sm dark:bg-white"> {/* Add dark:bg-white if the parent background can change */}
    <div className="flex items-center gap-2">
        <select className="border rounded p-1 text-gray-700 dark:text-gray-700 dark:bg-white dark:border-gray-200">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
        </select>
        <span className="dark:text-gray-700">items</span> {/* Ensure "items" text color is consistent */}
    </div>
    <div className="text-gray-700 dark:text-gray-700">
        Page 1 of 1 (10 items) {/* Placeholder, can be dynamic */}
    </div>
    <div className="flex">
        <button className="px-2 py-1 border rounded text-gray-700 dark:text-gray-700 dark:border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-100">&#8249;</button>
        <button className="px-2 py-1 border rounded ml-1 text-gray-700 dark:text-gray-700 dark:border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-100">&#8250;</button>
    </div>
</div>
      </div>
    </div>
  );
}

export default Product;
