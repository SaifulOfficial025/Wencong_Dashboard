import React from 'react';
import { useForm } from 'react-hook-form';
import { ChevronLeft, ChevronDown, Plus, Edit, Trash2 } from 'lucide-react'; // Import necessary icons
import { Link } from 'react-router-dom';
import { CiImageOn } from 'react-icons/ci'; // Import the image icon

function EditProductDetails() {
      const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // Add your form submission logic here
  };

  // Dummy data for the tables
  const purchaseLimitData = [
    { agentGroup: 'Agent A', purchaseLimit: 50 },
    { agentGroup: 'Agent B', purchaseLimit: 20 },
    { agentGroup: 'Agent C', purchaseLimit: 30 },
  ];

  return (
    <div className="p-4 font-sans max-w-full mx-auto text-black">
      {/* Header */}
      <div className="mb-4">
        <Link to="/dashboard/master_data/product" className="flex items-center text-sm text-black mb-2">
          <ChevronLeft size={16} className="mr-1" />
          <span>Back to Product</span>
        </Link>
      </div>

      <div className="bg-[#F04E24] text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-semibold">Edit Product Details</h1>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-b-lg shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Product Detail Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Product Detail</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="product-code" className="block text-sm font-medium text-[#F04E24] mb-2">Product Code</label>
                <input id="product-code" type="text" {...register("productCode")} defaultValue="F001-23" className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24]" />
              </div>
              <div>
                <label htmlFor="product-name" className="block text-sm font-medium text-[#F04E24] mb-2">Product Name</label>
                <input id="product-name" type="text" {...register("productName")} defaultValue="10尺满地黄金 | 10B KAKI EMAS" className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24]" />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-[#F04E24] mb-2">Category</label>
                <div className="relative">
                  <select id="category" {...register("category")} defaultValue="Group A" className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#F04E24]">
                    <option value="">Select Category</option>
                    <option value="Group A">Group A</option>
                    <option value="Group B">Group B</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-[#F04E24] mb-2">Status</label>
                <div className="relative">
                  <select id="status" {...register("status")} defaultValue="Inactive" className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#F04E24]">
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-[#F04E24] mb-8" />

          {/* Others Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Others</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="stock-quantity" className="block text-sm font-medium text-[#F04E24] mb-2">Stock Quantity</label>
                <input id="stock-quantity" type="text" {...register("stockQuantity")} defaultValue="1234" className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24]" />
              </div>
              <div>
                <label htmlFor="default-price" className="block text-sm font-medium text-[#F04E24] mb-2">Default Price</label>
                <input id="default-price" type="text" {...register("defaultPrice")} defaultValue="RM108.20" className="w-full px-3 py-2 bg-rose-50 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F04E24] mb-2">Product Image</label>
                <div className="relative w-full h-12 bg-[#FFF0ED] border border-[#F24E1E] border-dashed rounded-md flex items-center justify-center cursor-pointer overflow-hidden py-2">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" aria-label="Upload file" />
                  <CiImageOn />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F04E24] mb-2">Product Image 2</label>
                <div className="relative w-full h-12 bg-[#FFF0ED] border border-[#F24E1E] border-dashed rounded-md flex items-center justify-center cursor-pointer overflow-hidden py-2">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" aria-label="Upload file" />
                  <CiImageOn />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-[#F04E24] mb-8" />

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-[#F04E24] hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:ring-offset-2">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductDetails