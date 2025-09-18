import React, { useContext, useRef, useEffect } from "react";
import { PromotionContext } from "../../ContextAPI/PromotionContext";
import { SalesContext } from "../../ContextAPI/SalesContext";
import { ProductContext } from "../../ContextAPI/ProductContext";
import { useForm, useFieldArray } from "react-hook-form";
import { ChevronLeft, ChevronDown, Plus } from "lucide-react";
import { Link } from "react-router-dom";

function AddPromotion() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      items: [
        { productId: "", agentGroupId: "", minQuantity: "", maxQuantity: "", operation: "", value: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const { createPromotion, createPromotionAgentGroup } = useContext(PromotionContext);
  const { agentGroups, fetchAgentGroups } = useContext(SalesContext);
  const { products, fetchProducts } = useContext(ProductContext);
  const promotionIdRef = useRef(null);

  // Handle Promotion creation
  const handleAddPromotion = async () => {
    const values = getValues();
    // Convert date to ISO string
    const startDate = values.fromDate ? new Date(values.fromDate) : null;
    const endDate = values.toDate ? new Date(values.toDate) : null;
    const res = await createPromotion(
      values.promotionName,
      values.status,
      startDate,
      endDate
    );
    window.alert(res.message);
    if (res.status === 201 && res.data && res.data.id) {
      promotionIdRef.current = res.data.id;
    }
  };

  // Handle Promotion-Agent Group creation for multiple items
  const onSubmit = async (data) => {
    const items = data.items || [];

    if (!items.length) {
      alert("Add at least one product row before saving.");
      return;
    }

    if (!promotionIdRef.current) {
      alert("Please create a promotion first by clicking 'Add New' at the top.");
      return;
    }

    try {
      const promises = items.map((it) => {
        const payload = {
          productId: Number(it.productId),
          promotionId: promotionIdRef.current,
          agentGroupId: Number(it.agentGroupId),
          minQty: Number(it.minQuantity),
          maxQty: Number(it.maxQuantity),
          operation: it.operation,
          value: Number(it.value),
          isDeleted: 0,
        };
        return createPromotionAgentGroup(payload);
      });

      const results = await Promise.all(promises);
      // Show simple summary
      const successes = results.filter((r) => r && r.status >= 200 && r.status < 300).length;
      window.alert(`Saved ${successes} of ${results.length} items.`);
      // Optionally reset rows
      // reset();
    } catch (err) {
      window.alert("Error saving promotion items: " + (err.message || err));
    }
  };

  // Load agent groups for the select when component mounts
  useEffect(() => {
    if (!agentGroups || agentGroups.length === 0) {
      fetchAgentGroups().catch(() => {});
    }
    if (!products || products.length === 0) {
      fetchProducts().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 font-sans max-w-full mx-auto">
      {/* Header */}
      <div className="mb-4">
        <Link
          to="/dashboard/master_data/promotion"
          className="flex items-center text-sm text-gray-700 mb-2"
        >
          <ChevronLeft size={16} className="mr-1" />
          <span>Back to Promotion</span>
        </Link>
      </div>
      <div className="bg-[#F04E24] text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-semibold">Add New Promotion Details</h1>
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-white rounded-b-lg shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* Promotion Detail Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Promotion Detail
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="promotion-name"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  Promotion Name
                </label>
                <input
                  id="promotion-name"
                  type="text"
                  {...register("promotionName", { required: true })}
                  className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 text-gray-800 dark:text-gray-800 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
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
                    className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 text-gray-800 dark:text-gray-800 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
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
            </div>

            <div className="flex flex-wrap items-end gap-2 mt-6">
              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor="from-date"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  From Date
                </label>
                <input
                  id="from-date"
                  type="date"
                  {...register("fromDate", { required: true })}
                  className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 text-gray-800 dark:text-gray-800 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
              <div className="text-gray-700 mb-2">to</div>
              <div className="flex-1 min-w-[150px]">
                <label
                  htmlFor="to-date"
                  className="block text-sm font-medium text-[#F04E24] mb-2"
                >
                  Date
                </label>
                <input
                  id="to-date"
                  type="date"
                  {...register("toDate", { required: true })}
                  className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 text-gray-800 dark:text-gray-800 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
            </div>

          </div>

          <hr className="border-[#F04E24] mb-8" />

          <div className="mb-8">
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="border border-rose-100 rounded-md p-4 bg-rose-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#F04E24] mb-2">Product</label>
                      <div className="relative">
                        <select
                          {...register(`items.${index}.productId`, { required: true })}
                          className="w-full px-3 py-2 bg-white text-gray-800 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] appearance-none"
                        >
                          <option value="">Select Product</option>
                          {products && products.length ? (
                            products.map((p) => (
                              <option key={p.productId || p.id} value={p.productId || p.id}>{p.name}</option>
                            ))
                          ) : null}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#F04E24] mb-2">Agent Group</label>
                      <div className="relative">
                        <select
                          {...register(`items.${index}.agentGroupId`, { required: true })}
                          className="w-full px-3 py-2 bg-white text-gray-800 border border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] appearance-none"
                        >
                          <option value="">Select Agent Group</option>
                          {agentGroups && agentGroups.length ? (
                            agentGroups.map((g) => (
                              <option key={g.agentGroupId} value={g.agentGroupId}>{g.name}</option>
                            ))
                          ) : null}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-[#F04E24] mb-2">Min Qty</label>
                        <input {...register(`items.${index}.minQuantity`, { required: true })} type="number" className="w-full px-3 py-2 bg-white text-gray-800 border border-rose-100 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#F04E24] mb-2">Max Qty</label>
                        <input {...register(`items.${index}.maxQuantity`, { required: true })} type="number" className="w-full px-3 py-2 bg-white text-gray-800 border border-rose-100 rounded-md" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div>
                      <label className="block text-sm font-medium text-[#F04E24] mb-2">Operation</label>
                      <select {...register(`items.${index}.operation`, { required: true })} className="w-full px-3 py-2 bg-white text-gray-800 border border-rose-100 rounded-md appearance-none">
                        <option value="">Select</option>
                        <option value="fixed">Fixed Price Promotion</option>
                        <option value="percentage">Percent Promotion</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#F04E24] mb-2">Value</label>
                      <input {...register(`items.${index}.value`, { required: true })} type="number" step="0.01" className="w-full px-3 py-2 bg-white text-gray-800 border border-rose-100 rounded-md" />
                    </div>

                    <div className="flex justify-end">
                      <button type="button" onClick={() => remove(index)} className="text-sm text-red-600">Remove</button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex gap-2">
                <button type="button" onClick={() => append({ productId: "", agentGroupId: "", minQuantity: "", maxQuantity: "", operation: "", value: "" })} className="bg-[#F04E24] text-white px-3 py-1 rounded">Add New</button>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-[#F04E24] hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPromotion;
