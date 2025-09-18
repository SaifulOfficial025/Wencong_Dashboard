import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
// import { TiExport } from 'react-icons/ti'; // Removed the problematic import
import { ChevronDown } from "lucide-react"; // Import ChevronDown for dropdowns
import { Link } from "react-router-dom";
import { ProductContext } from "../../ContextAPI/ProductContext";

function Product() {
  const { register, handleSubmit } = useForm();
  const { products, loading, page, perPage, total, fetchProducts, applyFilters, setPage, setPerPage, uniqueNames, uniqueCodes } = useContext(ProductContext);

  const onSubmit = (data) => {
    applyFilters({ name: data["produ  ctName"] || "", code: data.productCode || "", category: data.category || "" });
  };

  useEffect(() => {
    fetchProducts({ page: 1, perPage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dummy data for the table rows based on the image
  const tableData = Array(7)
    .fill()
    .map((_, i) => ({
      productCode: "400-001",
      productName: "10尺满地黄金 | 10B KAKI EMAS",
      category: "响声类 Soundcloud",
      defaultPrice: "RM180.00",
    }));

  return (
    <div className="p-6 bg-white max-h-screen text-[#F24E1E] font-semibold rounded-lg">
      {/* Filter Options */}
      <div className=" p-4 rounded-lg  mb-6">
        <h2 className="text-[#F24E1E] font-semibold mb-4">Filter Options</h2>
        <hr className="border-[#F04E24] mb-8" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
          {/* Product Name */}
          <div className="relative">
            <select
              {...register("produ  ctName")}
              className="w-full p-2 border border-rose-100 rounded bg-[#FDE5E0] focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
            >
              <option value="">Product Name</option>
              {uniqueNames && uniqueNames.length ? (
                uniqueNames.map((n, i) => (
                  <option value={n} key={i}>
                    {n}
                  </option>
                ))
              ) : null}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>

          {/* Product Code */}
          <div className="relative">
            <select
              {...register("productCode")}
              className="w-full p-2 border border-rose-100 rounded bg-[#FDE5E0] focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
            >
              <option value="">Product Code</option>
              {uniqueCodes && uniqueCodes.length ? (
                uniqueCodes.map((c, i) => (
                  <option value={c} key={i}>
                    {c}
                  </option>
                ))
              ) : null}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>

          {/* Category */}
          <div className="relative">
            <select
              {...register("category")}
              className="w-full p-2 border border-rose-100 rounded bg-[#FDE5E0] focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
            >
              <option value="">Category</option>
              <option value="cat1">Category 1</option>
              <option value="cat2">Category 2</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-[#F24E1E] text-white px-4 py-2 rounded w-full"
          >
            Search
          </button>
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
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : products && products.length ? (
              products.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="px-4 py-2">{p.code || p.productCode}</td>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.productCategoryId || "-"}</td>
                  <td className="px-4 py-2">{p.basePrice != null ? `RM${p.basePrice}` : "-"}</td>
                  <td className="px-4 py-2 text-blue-500 underline cursor-pointer">
                    <Link to="/dashboard/master_data/product/edit_product_details/">View</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 text-sm dark:bg-white">
          <div className="flex items-center gap-2">
            <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))} className="border rounded p-1 bg-white text-gray-700 dark:bg-white dark:text-gray-700">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-gray-700">items</span>
          </div>
          <div className="text-gray-700">
            Page {page} of {Math.max(1, Math.ceil((total || 0) / perPage))} ({total || 0} items)
          </div>
          <div className="flex">
            <button onClick={() => page > 1 && setPage(page - 1)} className="px-2 py-1 border rounded text-gray-700 hover:bg-gray-100" disabled={page <= 1}>
              &#8249;
            </button>
            <button onClick={() => page < Math.ceil((total || 0) / perPage) && setPage(page + 1)} className="px-2 py-1 border rounded ml-1 text-gray-700 hover:bg-gray-100" disabled={page >= Math.ceil((total || 0) / perPage)}>
              &#8250;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
