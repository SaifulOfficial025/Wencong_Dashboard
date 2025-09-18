
import React from 'react';
import { FaAngleLeft, FaAngleRight, FaDollarSign, FaUserClock } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { TbPhysotherapist } from 'react-icons/tb';
import { FaEye, FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa'; // Added icons for actions
import { FaRightLong } from 'react-icons/fa6';

const ClientInfo = () => {
  // Sample data for Pending Therapist Approvals
  const pendingApprovals = [
    { name: 'Esthera Jackson', email: 'esthera@gmail.com', specialization: 'Massage Therapist', experience: '4 Years' },
    { name: 'Esthera Jackson', email: 'esthera@gmail.com', specialization: 'Massage Therapist', experience: '4 Years' },
    { name: 'Esthera Jackson', email: 'esthera@gmail.com', specialization: 'Massage Therapist', experience: '4 Years' },
  ];

  // Sample data for Customers
  const customers = [
    { name: 'Esthera Jackson', email: 'esthera@gmail.com', phone: '+1123456789', joinedDate: '14-April-2024', status: 'Active' },
    { name: 'Esthera Jackson', email: 'esthera@gmail.com', phone: '+1123456789', joinedDate: '14-April-2024', status: 'Regular' },
    { name: 'Esthera Jackson', email: 'esthera@gmail.com', phone: '+1123456789', joinedDate: '14-April-2024', status: 'Regular' },
  ];

  return (
    <section>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-5">
          <div className="space-y-2">
            <h1 className="text-gray-800">Pending Approvals</h1>
            <h1 className="font-bold text-xl text-black">13</h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <FaUserClock className="text-white font-bold" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-5">
          <div className="space-y-2">
            <h1 className="text-gray-800">Active Users</h1>
            <h1 className="font-bold text-xl text-black">102</h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <FiUsers className="text-white font-bold" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-5">
          <div className="space-y-2">
            <h1 className="text-gray-800">Active Therapists</h1>
            <h1 className="font-bold text-xl text-black">56</h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <TbPhysotherapist className="text-white font-bold" size={24} />
          </div>
        </div>

        <div className="bg-white flex items-center justify-between rounded-[15px] shadow-md p-5">
          <div className="space-y-2">
            <h1 className="text-gray-800">Total Revenue</h1>
            <h1 className="font-bold text-xl text-black">
              $34672 <span className="text-sm font-semibold text-green-500">+5%</span>
            </h1>
          </div>
          <div className="bg-[#B28D28] p-2 rounded-xl">
            <FaDollarSign className="text-white font-bold" size={24} />
          </div>
        </div>
      </div>


      <div className="bg-white rounded-[15px] shadow-md p-5 mb-10">
        <h1 className="text-xl font-bold mb-5">Pending Therapist Approvals</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-600">
                <th className="p-3">Name</th>
                <th className="p-3">Specialization</th>
                <th className="p-3">Experience</th>
                <th className="p-3">Documents</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingApprovals.map((therapist, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <p className="font-semibold">{therapist.name}</p>
                      <p className="text-gray-500 text-sm">{therapist.email}</p>
                    </div>
                  </td>
                  <td className="p-3">{therapist.specialization}</td>
                  <td className="p-3">{therapist.experience}</td>
                  <td className="p-3">
                    <button className="bg-[#B28D28] text-white px-3 py-1 rounded-full flex items-center">
                      <FaEye className="mr-1" /> View
                    </button>
                  </td>
                  <td >
                    <div className="flex items-center gap-3">
                    <button className="bg-[#4AB228] text-white px-3 py-1 rounded-full flex items-center">
                      <FaCheck className="mr-1" /> Approve
                    </button>
                    <button className="bg-[#F1312B] text-white px-3 py-1 rounded-full flex items-center">
                      <FaTimes className="mr-1" /> Reject
                    </button>
                   </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-start mt-5">
          <div className="flex items-center space-x-2">
            <FaAngleLeft className='cursor-pointer' size={20}/>
            <button className="px-3 py-1 bg-gray-200 rounded-full">1</button>
            <button className="px-3 py-1 bg-gray-200 rounded-full">2</button>
            <button className="px-3 py-1 bg-gray-200 rounded-full">3</button>
            <button className="px-3 py-1 bg-gray-200 rounded-full">4</button>
            <button className="px-3 py-1 bg-gray-200 rounded-full">5</button>
            <FaAngleRight className='cursor-pointer' size={20}/>
          </div>
        </div>
      </div>

      {/* Customers Section */}
      <div className="bg-white rounded-[15px] shadow-md p-5">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-bold">Customers</h1>
          <div className="flex space-x-3">
            <select className="border rounded-lg p-2">
              <option>User Type</option>
            </select>
            <input
              type="text"
              placeholder="Search"
              className="border rounded-lg p-2"
            />
            <button className="bg-[#B28D28] text-white px-4 py-2 rounded-lg">
              Search
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-600">
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Joined Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <p className="font-semibold">{customer.name}</p>
                      <p className="text-gray-500 text-sm">{customer.email}</p>
                    </div>
                  </td>
                  <td className="p-3">{customer.phone}</td>
                  <td className="p-3">{customer.joinedDate}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        customer.status === 'Active'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="p-3 flex space-x-2">
                    <button className="text-gray-500">
                      <FaEdit size={20} />
                    </button>
                    <button className="text-red-500">
                      <FaTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-5">
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-200 rounded-full">1</button>
            <button className="px-3 py-1 bg-gray-200 rounded-full">2</button>
            <button className="px-3 py-1 bg-gray-200 rounded-full">3</button>
            <button className="px-3 py-1 bg-gray-200 rounded-full">4</button>
            <button className="px-3 py-1 bg-gray-200 rounded-full">5</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientInfo;