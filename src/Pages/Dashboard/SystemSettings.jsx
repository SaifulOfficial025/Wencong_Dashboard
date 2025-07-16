import React from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";

function SystemSettings() {
  return (
    <div>
      <div className="flex justify-start ">
        <label className="block text-sm font-medium text-[#F04E24] dark:text-[#F04E24] mb-2 mr-5">
          Change Language
        </label>
        <div className="relative w-80">
          <select className="w-full px-3 py-2 bg-rose-50 dark:bg-rose-50 border border-rose-100 dark:border-rose-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F04E24] dark:focus:ring-[#F04E24] focus:border-transparent appearance-none text-black dark:text-black">
            <option value="">Select Language</option>
            <option value="admin">English</option>
            <option value="user">China</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400"
            size={16}
          />
        </div>
      </div>
    </div>
  );
}

export default SystemSettings;
