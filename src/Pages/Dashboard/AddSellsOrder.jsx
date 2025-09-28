import { useFieldArray, useForm } from "react-hook-form";
import { MdPrint } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { OrderContext } from "../../ContextAPI/OrderContext";
import { PromotionContext } from "../../ContextAPI/PromotionContext";
import { SalesContext } from "../../ContextAPI/SalesContext";
import { ProductContext } from "../../ContextAPI/ProductContext";

const AddSellsOrder = () => {
  const { id } = useParams();
  // empty string => user hasn't selected a promotion (show suggested available);
  // "0" => user explicitly selected "No Promotion" (apply zero)
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [totals, setTotals] = useState({
    totalQty: 0,
    subtotal: 0,
    promotionApplied: 0,
    promotionSuggested: 0,
    gst: 0,
    total: 0,
  });

  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      salesOrderNo: "SO-000032",
      date: "",
      agentName: "",
      businessPartner: "",
      contactPerson: "Mr. Lim",
      contactPhone: "+6012345678",
      contactAddress:
        "No 1, Jalan TK 5/44, Kinrara Industrial Park,\nJalan Puchong,\n47100 Puchong,\nSelangor, Malaysia.",
      creditTerm: "SO-000032",
      creditLimit: "SO-000032",
      remark: "",
      items: [
        {
          no: 1,
          productCode: "",
          description: "",
          qty: "",
          uom: "",
          unitPrice: "",
          price: "",
        },
      ],
      promotion: "0",
      gstRate: 6,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems = watch("items");

  // domain data state (promotions/products/agents) must be declared before effects that use them
  const [promotions, setPromotions] = useState([]);
  const [agents, setAgents] = useState([]);
  const [products, setProducts] = useState([]);

  // Update totals whenever items, promotions or selected promotion changes
  useEffect(() => {
    const subtotal = watchedItems.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      return sum + price;
    }, 0);

    const totalQty = watchedItems.reduce((sum, item) => {
      const qty = parseFloat(item.qty) || 0;
      return sum + qty;
    }, 0);

    // Compute promotion discounts:
    // - promotionSuggested: what promotions (any) would give as discounts
    // - promotionApplied: discount from the explicitly selected promotion (if any)
    let promotionSuggested = 0;
    let promotionApplied = 0;
    const applyPromoProductsToItems = (promoProducts, accumulateTo) => {
      promoProducts.forEach((pp) => {
        const val = parseFloat(pp.value) || 0;
        // match items by productId
        const matchedItems = (watchedItems || []).filter((it) => {
          // item.productId may be under different keys depending on how it's set
          const itemPid = it.productId || it.productId === 0 ? it.productId : it.productId;
          return String(itemPid) === String(pp.productId);
        });
        matchedItems.forEach((mi) => {
          const qty = Number(mi.qty) || 0;
          const minQ = Number(pp.minimumQuantity) || 0;
          const maxQ = pp.maximumQuantity !== undefined && pp.maximumQuantity !== null ? Number(pp.maximumQuantity) : Infinity;
          if (qty < minQ || qty > maxQ) return; // quantity outside promotion range
          const itemTotal = Number(mi.price) || qty * (Number(mi.unitPrice) || 0);
          if (pp.operationType === "percentage") {
            accumulateTo.value += itemTotal * (val / 100);
          } else {
            // fixed amount; apply per matching item occurrence
            accumulateTo.value += val;
          }
        });
      });
    };

    // compute suggested discount across all promotions using subtotal
    // For clarity we compute per-promotion value and take the max (best promotion suggestion)
    const perPromoValues = (promotions || []).map((promo) => {
      if (!promo || !Array.isArray(promo.promotionProducts)) return 0;
      let acc = 0;
      promo.promotionProducts.forEach((pp) => {
        const val = parseFloat(pp.value) || 0;
        if (pp.operationType === "percentage") acc += subtotal * (val / 100);
        else acc += val;
      });
      return acc;
    });
    promotionSuggested = perPromoValues.length ? Math.max(...perPromoValues) : 0;

    // compute applied discount only when a promotion is selected (apply to subtotal)
    if (selectedPromotion && selectedPromotion !== "0") {
      const promo = (promotions || []).find((p) => String(p.promotionId) === String(selectedPromotion));
      if (promo && Array.isArray(promo.promotionProducts)) {
        let acc = 0;
        promo.promotionProducts.forEach((pp) => {
          const val = parseFloat(pp.value) || 0;
          if (pp.operationType === "percentage") acc += subtotal * (val / 100);
          else acc += val;
        });
        promotionApplied = acc;
      }
    }

    const subtotalAfterPromotion = Math.max(0, subtotal - promotionApplied);
    const gst = subtotalAfterPromotion * 0.06;
    const total = subtotalAfterPromotion + gst;

    setTotals({
      totalQty,
      subtotal,
      promotionApplied,
      promotionSuggested,
      gst,
      total,
    });

    // Keep promotion field as the selected promotion id for payload
    setValue("promotion", selectedPromotion);
  }, [watchedItems, selectedPromotion, promotions, setValue]);

  const { createOrder } = useContext(OrderContext);
  const navigate = useNavigate();
  const { fetchPromotions } = useContext(PromotionContext);
  const { fetchAgents } = useContext(SalesContext);
  const { fetchProducts } = useContext(ProductContext);

  // load promotions, agents and products on mount
  useEffect(() => {
    // load promotions for the promotion select
    fetchPromotions()
      .then((res) => {
        if (Array.isArray(res)) setPromotions(res);
        else if (res && Array.isArray(res.data)) setPromotions(res.data);
      })
      .catch(() => {});

    // load agents
    fetchAgents({ page: 1, perPage: 1000 })
      .then((res) => {
        if (res && Array.isArray(res.data)) setAgents(res.data);
        else if (Array.isArray(res)) setAgents(res);
      })
      .catch(() => {});

    // load products
    fetchProducts({ page: 1, perPage: 1000 })
      .then((res) => {
        if (res && Array.isArray(res.data)) setProducts(res.data);
        else if (Array.isArray(res)) setProducts(res);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When agent changes, fetch agent detail to prefill credit fields
  const watchedAgent = watch("agentName");
  useEffect(() => {
    if (!watchedAgent) return;
    const fetchAgentDetail = async (id) => {
      try {
        const res = await fetch(`/api/agents/${id}`, { headers: { Accept: "application/json" } });
        const json = await res.json();
        const agent = json.data || json;
        if (agent) {
          setValue("creditLimit", agent.creditLimit || agent.credit_limit || "");
          setValue("creditTerm", agent.creditTerm || agent.credit_term || "");
        }
      } catch (err) {
        // ignore
      }
    };
    fetchAgentDetail(watchedAgent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedAgent]);

  const onSubmit = async (data) => {
    // Build payload according to API spec
    const payload = {
      orderNumber: data.salesOrderNo || `ORD-${Date.now()}`,
      agentId: data.agentName || "",
      partnerId: data.businessPartner || "",
      promotionId: Number(data.promotion) || 0,
      soNumber: data.salesOrderNo || "",
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      address: data.contactAddress || "",
      // addressPostalCode: "",
      // addressCity: "",
      // addressState: "",
      status: data.status || "pending",
      remark: data.remark || "",
      subTotal: Number(totals.subtotal) || 0,
      tax: Number(totals.gst) || 0,
      total: Number(totals.total) || 0,
      courier: "",
      shippingPrice: 0,
      returnReason: "",
      returnRemark: "",
      shippingInvoice: null,
      approveDate: null,
      shippedDate: null,
      cancelledDate: null,
      cancelledReason: "",
      completedDate: null,
      returnDate: null,
      autocountStatus: "",
      autocountAccountId: "",
      isDeleted: 0,
      printDatetime: null,
      creditTerm: data.creditTerm || "",
      creditLimit: data.creditLimit || "",
      items: (data.items || []).map((it) => ({
        productId: it.productId ? Number(it.productId) : 0,
        productCode: it.productCode || "",
        productDescription: it.description || "",
        productQty: Number(it.qty) || 0,
        productUom: it.uom || "",
        productUnitPrice: Number(it.unitPrice) || 0,
        productTotal: Number(it.price) || 0,
        isDeleted: 0,
        isReturn: 0,
        orderId: 0,
      })),
    };

    try {
      const res = await createOrder(payload);
      if (res.status >= 200 && res.status < 300) {
        // success - navigate to sales order list
        window.alert("Order created successfully");
        navigate("/dashboard/sales_order");
      } else {
        window.alert("Failed to create order: " + (res.data?.message || JSON.stringify(res.data)));
      }
    } catch (err) {
      window.alert("Error creating order: " + (err.message || err));
    }
  };

  const addNewItem = () => {
    append({
      no: fields.length + 1,
      productCode: "",
      description: "",
      qty: "",
      uom: "",
      unitPrice: "",
      price: "",
    });
  };

  return (
    <section>
      <div className="capitalize">
        {/* Header Section */}
        <div className="py-3 bg-[#F04E24] dark:bg-[#F04E24] ps-5">
          <div>
            {id ? (
              <>
                <div className="w-full flex items-center justify-between pe-5">
                  <div className="flex items-center gap-5">
                    <span className="text-[#010101] dark:text-[#010101] font-medium">
                      Approval Sales Order
                    </span>
                    <span className="bg-[#FFE3B8] dark:bg-[#FFE3B8] rounded-sm py-[2px] px-[16px] cursor-pointer font-medium hover:bg-[#e9ba73] dark:hover:bg-[#e9ba73]">
                      Pending
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-medium cursor-pointer text-white dark:text-white">
                    <MdPrint
                      size={24}
                      className="bg-[#F04E24] dark:bg-[#F04E24]"
                    />
                    Print
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-5">
                  <span className="text-[#010101] dark:text-[#010101] font-medium">
                    Add new sales order
                  </span>
                  <span className="bg-[#FFE3B8] text-[#010101] rounded-sm py-[2px] px-[16px] cursor-pointer font-medium hover:bg-[#e9ba73] dark:bg-[#FFE3B8] dark:text-[#010101] dark:hover:bg-[#e9ba73]">
                    New Order
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons (Reject/Approve) */}
        <div className="bg-white dark:bg-white flex items-center gap-5 pt-10 justify-end pe-5">
          <span className="bg-[#FF9900] dark:bg-[#FF9900] rounded-sm py-[4px] px-[20px] cursor-pointer hover:bg-[#d1902f] dark:hover:bg-[#d1902f] text-white dark:text-white">
            Reject
          </span>
          <span className="bg-[#23DA52] dark:bg-[#23DA52] rounded-sm py-[4px] px-[20px] cursor-pointer hover:bg-[#2fc053] dark:hover:bg-[#2fc053] text-white dark:text-white">
            Approve
          </span>
        </div>

        {/* Form Section */}
        <div className="bg-white dark:bg-white pt-10 p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Header Section (Form Fields) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#DE472D] dark:text-[#DE472D] mb-1">
                  Sales Order No
                </label>
                <input
                  {...register("salesOrderNo")}
                  className="input input-bordered w-full bg-gray-100 dark:bg-gray-100 text-black dark:text-black dark:border-gray-300"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#DE472D] dark:text-[#DE472D] mb-1">
                  Date
                </label>
                <div className="relative">
                  <input
                    {...register("date")}
                    type="date"
                    className="input input-bordered w-full bg-white dark:bg-white text-black dark:text-black dark:border-gray-300"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-orange-500 dark:text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#DE472D] dark:text-[#DE472D] mb-1">
                  Agent Name
                </label>
                <select
                  {...register("agentName")}
                  className="select select-bordered w-full bg-white dark:bg-white text-black dark:text-black dark:border-gray-300"
                >
                  <option value="">Select Agent</option>
                  {agents && agents.map((a) => {
                    const id = a.agentId || a.id || a._id || a.agent_id;
                    const name = a.agentName || a.companyName || a.name || a.agent_name;
                    return (
                      <option key={id} value={String(id)}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#DE472D] dark:text-[#DE472D] mb-1">
                  Business Partner
                </label>
                <select
                  {...register("businessPartner")}
                  className="select select-bordered w-full bg-white dark:bg-white text-black dark:text-black dark:border-gray-300"
                >
                  <option value="">Select Partner</option>
                  <option value="partner1">Partner 1</option>
                  <option value="partner2">Partner 2</option>
                </select>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="flex gap-6 mb-6">
              <div className="bg-gray-100 dark:bg-gray-100 p-4 rounded-lg basis-6/12">
                <h3 className="text-sm font-medium text-[#DE472D] dark:text-[#DE472D] mb-3">
                  Contact Person & Address
                </h3>
                <div className="space-y-2">
                  <input
                    {...register("contactPerson")}
                    className="input input-bordered w-full text-sm bg-white dark:bg-white text-black dark:text-black dark:border-gray-300 placeholder-gray-500 dark:placeholder-gray-500"
                    placeholder="Contact Person"
                  />
                  <input
                    {...register("contactPhone")}
                    className="input input-bordered w-full text-sm bg-white dark:bg-white text-black dark:text-black dark:border-gray-300 placeholder-gray-500 dark:placeholder-gray-500"
                    placeholder="Phone Number"
                  />
                  <textarea
                    {...register("contactAddress")}
                    className="textarea textarea-bordered w-full text-sm bg-white dark:bg-white text-black dark:text-black dark:border-gray-300 placeholder-gray-500 dark:placeholder-gray-500 focus:ring-blue-500 dark:focus:ring-blue-500"
                    rows="4"
                    placeholder="Address"
                  />
                </div>
              </div>

              <div className="basis-6/12">
                <div className="flex items-center justify-between gap-5">
                  <div className="w-full">
                    <label className="text-[#DE472D] dark:text-[#DE472D] text-sm font-medium">
                      Credit Term
                    </label>
                    <input
                      {...register("creditTerm")}
                      className="input input-bordered w-full text-sm bg-white dark:bg-white text-black dark:text-black dark:border-gray-300 placeholder-gray-500 dark:placeholder-gray-500"
                      placeholder="Credit Term"
                    />
                  </div>

                  <div className="w-full">
                    <label className="text-[#DE472D] dark:text-[#DE472D] text-sm font-medium">
                      Credit Limit
                    </label>
                    <input
                      {...register("creditLimit")}
                      className="input input-bordered w-full text-sm bg-white dark:bg-white text-black dark:text-black dark:border-gray-300 placeholder-gray-500 dark:placeholder-gray-500"
                      placeholder="Credit Limit"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="text-[#DE472D] dark:text-[#DE472D] text-sm font-medium">
                    Remark
                  </label>
                  <textarea
                    {...register("remark")}
                    className="w-full p-3 border border-gray-300 dark:border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 bg-white dark:bg-white text-black dark:text-black placeholder-gray-500 dark:placeholder-gray-500"
                    rows="5"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>

                {/* Status dropdown (matches screenshot style) */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-[#DE472D] mb-2">Status</label>
                  <div className="relative">
                    <select
                      {...register("status")}
                      className="w-full px-4 py-3 bg-rose-50 border border-rose-100 rounded-md text-gray-800 appearance-none"
                    >
                      <option value="awaiting">Awaiting Shipment</option>
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                    <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                    </svg>
                  </div>
                </div>


            </div>
              </div>
                  <div className="mt-6 mb-6">
                  <label className="block text-sm font-medium text-[#DE472D] mb-2">Shipment</label>
                  <div className="relative">
                    <select
                      {...register("status")}
                      className="w-full px-4 py-3 bg-rose-50 border border-rose-100 rounded-md text-gray-800 appearance-none"
                    >
                      <option value="" selected>Choose Shipment</option>
                      <option value="fedex">Fedex</option>
                      <option value="air">Air</option>
                    </select>
                    <svg className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                    </svg>
                  </div>
                </div>

            {/* Items Table */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-800">
                  Items
                </h3>
                <button
                  type="button"
                  onClick={addNewItem}
                  className="btn btn-outline btn-sm text-[#DE472D] dark:text-[#DE472D] border-orange-600 dark:border-orange-600 hover:bg-orange-600 dark:hover:bg-orange-600 hover:text-white dark:hover:text-white bg-white dark:bg-white"
                >
                  + Add New
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="table table-zebra w-full bg-white dark:bg-white">
                  <thead className="bg-[#F04E24] dark:bg-[#F04E24] text-white dark:text-white">
                    <tr>
                      <th className="text-white dark:text-white">No</th>
                      <th className="text-white dark:text-white">
                        Product Code
                      </th>
                      <th className="text-white dark:text-white">
                        Description
                      </th>
                      <th className="text-white dark:text-white">Qty</th>
                      <th className="text-white dark:text-white">UOM</th>
                      <th className="text-white dark:text-white">Unit Price</th>
                      <th className="text-white dark:text-white">Price</th>
                      <th className="text-white dark:text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody className="border border-gray-200 dark:border-gray-200 text-gray-700 dark:text-gray-700">
                    {fields.map((field, index) => (
                      <tr
                        key={field.id}
                        className="odd:bg-white even:bg-gray-50 dark:odd:bg-white dark:even:bg-gray-50"
                      >
                        <td className="text-gray-700 dark:text-gray-700">
                          {index + 1}
                        </td>
                        <td>
                          <input
                            {...register(`items.${index}.productCode`)}
                            className="input input-bordered input-sm w-full bg-white dark:bg-white text-gray-700 dark:text-gray-700 dark:border-gray-300 placeholder-gray-500 dark:placeholder-gray-500"
                            placeholder="Product Code"
                          />
                        </td>
                        <td>
                          <select
                            {...register(`items.${index}.productId`)}
                            className="select select-bordered select-sm w-full bg-white dark:bg-white text-gray-700 dark:text-gray-700 dark:border-gray-300"
                            onChange={(e) => {
                              const prodId = e.target.value;
                              const prod = products.find((p) => String(p.productId || p.id || p._id) === String(prodId));
                              if (prod) {
                                const code = prod.code || prod.productCode || prod.sku || prod.product_code || "";
                                const name = prod.name || prod.productName || prod.description || "";
                                const unitPrice = prod.price || prod.unitPrice || prod.sellingPrice || 0;
                                setValue(`items.${index}.productCode`, code);
                                setValue(`items.${index}.description`, name);
                                setValue(`items.${index}.unitPrice`, Number(unitPrice).toFixed(2));
                                const qty = Number.parseFloat(watch(`items.${index}.qty`)) || 0;
                                setValue(`items.${index}.price`, (qty * Number(unitPrice)).toFixed(2));
                              }
                            }}
                          >
                            <option value="">Select product</option>
                            {products && products.map((p) => {
                              const pid = p.productId || p.id || p._id;
                              const pname = p.name || p.productName || p.description || p.code || `Product ${pid}`;
                              return (
                                <option key={pid} value={String(pid)}>
                                  {pname}
                                </option>
                              );
                            })}
                          </select>
                        </td>
                        <td>
                          <input
                            {...register(`items.${index}.qty`)}
                            type="number"
                            className="input input-bordered input-sm w-full bg-white dark:bg-white text-gray-700 dark:text-gray-700 dark:border-gray-300 placeholder-gray-500 dark:placeholder-gray-500"
                            placeholder="Qty"
                            onChange={(e) => {
                              const qty =
                                Number.parseFloat(e.target.value) || 0;
                              const unitPrice =
                                Number.parseFloat(
                                  watch(`items.${index}.unitPrice`)
                                ) || 0;
                              setValue(
                                `items.${index}.price`,
                                (qty * unitPrice).toFixed(2)
                              );
                            }}
                          />
                        </td>
                        <td>
                          <select
                            {...register(`items.${index}.uom`)}
                            className="select select-bordered select-sm w-full bg-white dark:bg-white text-gray-700 dark:text-gray-700 dark:border-gray-300"
                          >
                            <option value="">UOM</option>
                            <option value="pcs">PCS</option>
                            <option value="kg">KG</option>
                            <option value="box">BOX</option>
                          </select>
                        </td>
                        <td>
                          <input
                            {...register(`items.${index}.unitPrice`)}
                            type="number"
                            step="0.01"
                            className="input input-bordered input-sm w-full bg-white dark:bg-white text-gray-700 dark:text-gray-700 dark:border-gray-300 placeholder-gray-500 dark:placeholder-gray-500"
                            placeholder="Unit Price"
                            onChange={(e) => {
                              const unitPrice =
                                Number.parseFloat(e.target.value) || 0;
                              const qty =
                                Number.parseFloat(
                                  watch(`items.${index}.qty`)
                                ) || 0;
                              setValue(
                                `items.${index}.price`,
                                (qty * unitPrice).toFixed(2)
                              );
                            }}
                          />
                        </td>
                        <td>
                          <input
                            {...register(`items.${index}.price`)}
                            type="number"
                            step="0.01"
                            className="input input-bordered input-sm w-full bg-white dark:bg-white text-gray-700 dark:text-gray-700 dark:border-gray-300 placeholder-gray-500 dark:placeholder-gray-500"
                            placeholder="Price"
                            readOnly
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="btn btn-error btn-sm text-white dark:text-white bg-red-500 dark:bg-red-500 hover:bg-red-600 dark:hover:bg-red-600"
                            disabled={fields.length === 1}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-100 dark:bg-gray-100 p-4 rounded-lg">
                <label className="block text-sm font-medium text-[#DE472D] dark:text-[#DE472D] mb-1">
                  Promotion
                </label>
                <select
                  {...register("promotion")}
                  className="select select-bordered w-full bg-white dark:bg-white text-black dark:text-black dark:border-gray-300"
                  value={selectedPromotion}
                  onChange={(e) => setSelectedPromotion(e.target.value)}
                >
                  <option value="">-- Select Promotion --</option>
                  <option value="0">No Promotion</option>
                  {promotions && promotions.length > 0
                    ? promotions.map((p) => (
                        <option key={p.promotionId} value={String(p.promotionId)}>
                          {p.name || p.title || `Promotion ${p.promotionId}`}
                        </option>
                      ))
                    : null}
                </select>
              </div>

              <div className="space-y-3 text-gray-700 dark:text-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Qty</span>
                  <span className="font-semibold">{totals.totalQty}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Subtotal</span>
                  <span className="font-semibold">
                    ${totals.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Promotion</span>
                  <span className="font-semibold">
                    {selectedPromotion && selectedPromotion !== "0" ? (
                      <>-${totals.promotionApplied.toFixed(2)}</>
                    ) : selectedPromotion === "0" ? (
                      "$0.00"
                    ) : (
                      <>{totals.promotionSuggested > 0 ? `- $${totals.promotionSuggested.toFixed(2)} (available)` : "$0.00"}</>
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">GST (6%)</span>
                  <span className="font-semibold">
                    ${totals.gst.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>${totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn bg-[#DE472D] hover:bg-[#c23c23] text-white dark:text-white px-6 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddSellsOrder;
