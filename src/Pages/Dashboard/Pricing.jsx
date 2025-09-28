import React, { useContext, useEffect, useRef, useState } from "react";
import { PricingContext } from "../../ContextAPI/Pricing";
import { useForm } from "react-hook-form";
import { IoIosSave } from "react-icons/io";

function Pricing() {
  const { register, handleSubmit } = useForm();
  const { agentGroups, products, fetchPricing, updatePricings } = useContext(PricingContext);
  const [edited, setEdited] = useState({}); // keyed by `${productId}_${agentGroupId}` => price
  const [editingCell, setEditingCell] = useState(null); // key string of cell being edited
  const inputRef = useRef(null);

  useEffect(() => {
    if (!agentGroups || agentGroups.length === 0) fetchPricing().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // normalize agentGroups: API may return array or object map
  const groups = React.useMemo(() => {
    if (!agentGroups) return [];
    if (Array.isArray(agentGroups)) return agentGroups;
    if (typeof agentGroups === "object") {
      // convert { "1": { agentGroupName: 'AGENT GROUP 1' }, ... } into array
      return Object.entries(agentGroups).map(([id, val]) => {
        if (typeof val === "string") return { id: Number(id), name: val };
        return { id: Number(id), ...(val || {}) };
      });
    }
    return [];
  }, [agentGroups]);

  const getGroupLabel = (g, idx) => {
    if (!g) return `Group ${idx + 1}`;
    if (typeof g === "string") return g;
    return (
      g.name || g.agentGroupName || g.agent_group_name || g.agent_group || (g.agentGroup && (g.agentGroup.name || g.agentGroup.agentGroupName)) || `Group ${g.id ?? idx + 1}`
    );
  };

  const handleChange = (productId, groupId, value) => {
    const key = `${productId}_${groupId}`;
    setEdited((s) => ({ ...s, [key]: value }));
  };

  const startEditing = (productId, groupId, existing) => {
    const key = `${productId}_${groupId}`;
    // initialize edited value if not set
    setEdited((s) => ({ ...s, [key]: s[key] !== undefined ? s[key] : existing }));
    setEditingCell(key);
  };

  const finishEditing = (productId, groupId) => {
    const key = `${productId}_${groupId}`;
    setEditingCell(null);
    // keep edited value in state (will be saved on Save click)
  };

  const cancelEditing = (productId, groupId, existing) => {
    const key = `${productId}_${groupId}`;
    setEditingCell(null);
    setEdited((s) => {
      const copy = { ...s };
      // if we had initialized an edit but want to cancel, revert to server value by deleting local edit
      if (copy[key] !== undefined) delete copy[key];
      return copy;
    });
  };

  const handleSave = async () => {
    // build payload from edited
    const pricings = Object.entries(edited).map(([k, v]) => {
      const [productId, agentGroupId] = k.split("_").map((x) => Number(x));
      return { productId, agentGroupId, price: Number(v) };
    });
    if (pricings.length === 0) return;
    const res = await updatePricings(pricings);
    if (res && res.status && (res.status === 200 || res.status === 201)) {
      // clear edits
      setEdited({});
      // optional: show success (alert for now)
      window.alert("Pricing updated");
    } else {
      window.alert("Failed to update pricing");
    }
  };

  // autofocus input when editingCell changes
  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingCell]);

  const onSubmit = (data) => {
    console.log(data);
  };

  // products and agentGroups are provided by PricingContext

  return (
    <div className="p-6 bg-white min-h-screen text-[#F24E1E] font-semibold rounded-lg">
      {/* Search Filter Options */}
      <div className="p-4 rounded-lg mb-6">
        <h2 className="text-gray-700 font-semibold mb-4">Search</h2>
        <hr className="border-[#F04E24] mb-8" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end"
        >
          {" "}
          {/* Changed grid-cols-4 to grid-cols-2 */}
          {/* Single Search Input Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..." // Generic placeholder for a single search field
              {...register("searchQuery")} // Changed register name to a generic one
              className="w-full p-2 border border-rose-100 rounded bg-[#FDE5E0] focus:outline-none focus:ring-2 focus:ring-[#F04E24] focus:border-transparent"
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
        <div className="flex justify-end px-4 py-2">
          <button className="bg-[#ffe4df] text-[#f04e24] border border-[#f04e24]  px-4 py-2 rounded text-sm flex items-center">
            <IoIosSave className="mr-3 w-4 h-4 text-[#f04e24]" />
            <span className="mr-1">Save</span>
            {/* Save icon (using an SVG) */}
          </button>
        </div>

        <table className="w-full text-left border-t">
          <thead className="bg-[#F24E1E] text-white">
            <tr>
              <th className="px-4 py-2">Product Code</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Default Price</th>
              {groups && groups.length > 0 ? (
                groups.map((g, idx) => (
                  <th key={g.id ?? idx} className="px-4 py-2">{getGroupLabel(g, idx)}</th>
                ))
              ) : (
                [
                  { name: 'Agent Group A' },
                  { name: 'Agent Group B' },
                  { name: 'Agent Group C' },
                ].map((g, idx) => (
                  <th key={idx} className="px-4 py-2">{g.name}</th>
                ))
              )}
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {products && products.length ? (
              products.map((prod) => (
                <tr key={prod.productId} className="border-b">
                  <td className="px-4 py-2">{prod.productId}</td>
                  <td className="px-4 py-2">{prod.name}</td>
                  <td className="px-4 py-2">{prod.basePrice}</td>
                  {(groups || []).map((g, idx) => {
                    const priceObj = prod.agentPrices && (prod.agentPrices[g.id] || prod.agentPrices[String(g.id)]) ? (prod.agentPrices[g.id] || prod.agentPrices[String(g.id)]) : null;
                    const existing = priceObj ? priceObj.price : "";
                    const key = `${prod.productId}_${g.id}`;
                    const isEditing = editingCell === key;
                    const displayValue = edited[key] !== undefined ? edited[key] : existing;
                    return (
                      <td
                        key={g.id}
                        className={`px-4 py-2 cursor-pointer`}
                        onDoubleClick={() => startEditing(prod.productId, g.id, existing)}
                      >
                        {isEditing ? (
                          <input
                            ref={inputRef}
                            type="number"
                            step="0.01"
                            value={displayValue}
                            onChange={(e) => handleChange(prod.productId, g.id, e.target.value)}
                            onBlur={() => finishEditing(prod.productId, g.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                finishEditing(prod.productId, g.id);
                              } else if (e.key === "Escape") {
                                cancelEditing(prod.productId, g.id, existing);
                              }
                            }}
                            className="w-full px-2 py-1 border rounded bg-white text-black dark:bg-white dark:text-black"
                          />
                        ) : (
                          <span>{displayValue === "" ? "-" : displayValue}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button onClick={handleSave} className="bg-[#F04E24] hover:bg-orange-600 text-white px-6 py-2 rounded">
            Save
          </button>
        </div>

        {/* Pagination - Removed as per image */}
      </div>
    </div>
  );
}

export default Pricing;
