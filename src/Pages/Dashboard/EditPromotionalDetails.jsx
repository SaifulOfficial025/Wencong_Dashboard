import React, { useContext, useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { ChevronLeft, ChevronDown, Plus } from "lucide-react";

import { SalesContext } from "../../ContextAPI/SalesContext";
import { ProductContext } from "../../ContextAPI/ProductContext";
import { PromotionContext } from "../../ContextAPI/PromotionContext";
import { useLocation, useNavigate } from "react-router-dom";

function EditPromotionalDetails() {
  const { agentGroups, fetchAgentGroups } = useContext(SalesContext);
  const { products, fetchProducts } = useContext(ProductContext);
  const { fetchPromotions, updatePromotion } = useContext(PromotionContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPromotionId, setCurrentPromotionId] = useState(null);

  useEffect(() => {
    if (!agentGroups || agentGroups.length === 0) {
      fetchAgentGroups().catch(() => {});
    }
    if (!products || products.length === 0) {
      fetchProducts().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      items: [
        { productId: "", agentGroupId: "", minQuantity: "1", maxQuantity: "5", operation: "fixed", value: "" },
      ],
    },
  });

  const onSubmit = (data) => {
    // Build payload per API: name, status, startDate, endDate, promotionProducts
    const payload = {
      name: data.promotionName,
      status: data.status,
      startDate: data.fromDate,
      endDate: data.toDate,
      promotionProducts: (data.items || []).map((it) => ({
        productId: Number(it.productId),
        agentGroupId: Number(it.agentGroupId),
        minimumQuantity: Number(it.minQuantity || it.minQuantity || it.minQuantity) || 0,
        maximumQuantity: Number(it.maxQuantity || it.maxQty || it.maxQuantity) || 0,
        operationType: it.operation,
        value: Number(it.value) || 0,
      })),
    };

    if (!currentPromotionId) {
      window.alert("No promotion id selected");
      return;
    }

    updatePromotion(currentPromotionId, payload).then((res) => {
      if (res && (res.status === 200 || res.status === 201)) {
        window.alert(res.message || "Promotion updated");
        navigate("/dashboard/master_data/promotion");
      } else {
        window.alert(res.message || "Failed to update promotion");
      }
    }).catch(() => {
      window.alert("Network error while updating promotion");
    });
  };

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  // On mount: fetch promotions and prefill form using ?id= in URL or first promotion
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idParam = params.get("id");

    fetchPromotions().then((res) => {
      // fetchPromotions returns either full response object or array/data
      const list = Array.isArray(res) ? res : (res && res.data) ? res.data : [];
      if (!list || list.length === 0) return;

      let promo = null;
      if (idParam) {
        promo = list.find((p) => String(p.id ?? p.promotionId) === String(idParam));
      }
      if (!promo) promo = list[0];
      if (!promo) return;

      setCurrentPromotionId(promo.id ?? promo.promotionId);

      // map promotionProducts into items with matching register names
      const items = (promo.promotionProducts || []).map((pp) => ({
        productId: pp.productId ?? pp.product_id ?? "",
        agentGroupId: pp.agentGroupId ?? pp.agent_group_id ?? pp.agentGroup ?? "",
        minQuantity: pp.minimumQuantity ?? pp.minimum_quantity ?? pp.minQuantity ?? "",
        maxQuantity: pp.maximumQuantity ?? pp.maximum_quantity ?? pp.maxQuantity ?? "",
        operation: pp.operationType ?? pp.operation_type ?? pp.operation ?? "",
        value: pp.value ?? pp.amount ?? "",
      }));

      // reset form with promotion details
      try {
        reset({
          promotionName: promo.name || "",
          status: promo.status ? (String(promo.status).charAt(0).toUpperCase() + String(promo.status).slice(1)) : "",
          fromDate: promo.startDate ? promo.startDate.split("T")[0] : "",
          toDate: promo.endDate ? promo.endDate.split("T")[0] : "",
          items,
        });
      } catch (e) {
        // ignore
      }
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 font-sans max-w-full mx-auto">
      {/* Header */}
      <div className="mb-4">
        <a
          href="/dashboard/master_data/promotion"
          className="flex items-center text-sm text-gray-700 mb-2"
        >
          <ChevronLeft size={16} className="mr-1" />
          <span>Back to Promotion</span>
        </a>
      </div>
      <div className="bg-[#F04E24] text-white p-4 rounded-t-lg">
        <h1 className="text-xl font-semibold">Edit Promotion Details</h1>
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
              {/* Promotion Name */}
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
                  defaultValue="New Year Promotion"
                  className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 text-gray-800 dark:text-gray-800 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
              {/* Status */}
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
                    defaultValue="Active"
                    className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 text-gray-800 dark:text-gray-800 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent appearance-none"
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                </div>
              </div>
            </div>

            {/* Promotion Period: From Date to Date */}
            <div className="flex flex-wrap items-end gap-2 mt-6">
              {/* From Date */}
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
                  defaultValue="2024-01-01"
                  className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 text-gray-800 dark:text-gray-800 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
              {/* "to" text */}
              <div className="text-gray-700 mb-2">to</div>
              {/* To Date */}
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
                  defaultValue="2024-01-02"
                  className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 text-gray-800 dark:text-gray-800 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
                />
              </div>
            </div>

          </div>

          {/* Divider */}
          <hr className="border-[#F04E24] mb-8" />

          {/* Product and Agent Group Section (dynamic rows) */}
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
                          ) : (
                            <>
                              <option value="10尺满地黄金 | 10B KAKI EMAS">10尺满地黄金 | 10B KAKI EMAS</option>
                              <option value="product2">Product 2</option>
                            </>
                          )}
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
                              <option key={g.agentGroupId ?? g.id} value={g.agentGroupId ?? g.id}>{g.name}</option>
                            ))
                          ) : (
                            <>
                              <option value="1">Group A</option>
                              <option value="2">Group B</option>
                            </>
                          )}
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

          {/* Submit Button */}
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

export default EditPromotionalDetails;
