import React, { useState } from 'react'
import BaseModal from '../common/BaseModal'
import { getDates } from '../../utils/getDates';

const SHOWROOM_KIND = [
  "Car Showroom",
  "Bike Showroom",
  "Caravan Showroom - Sell",
  "Caravan Showroom - Rent",
  "Rent a Car",
  "Car Care Shop",
  "Garage Workshop"
];

const COUNTRIES = [
  "Qatar",
  "Saudi Arabia",
  "Bahrain",
  "UAE",
  "Oman",
  "Kuwait",
]

const AddShowRoomModal = ({ open, setOpen }) => {

  const [formData, setFormData] = useState({
    country: "Qatar",
    kind: "Car Showroom",
    partner_name_pl: "",
    partner_name_sl: "",
    joinDate: getDates().today,
  });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }
  return (
    <BaseModal title="Add ShowRoom" open={open} setOpen={setOpen}>
      <form className=" space-y-6" onSubmit={(e) => onSubmit(e)}>
        <div className="p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Country */}
            <div className="space-y-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country<span className="text-red-500">*</span>
              </label>
              <select
                id="country"
                value={formData.country}
                className={`w-full focus-visible:outline-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 bg-white`}
                onChange={(e) => { setFormData({ ...formData, country: e.target.value }) }}
              >
                {COUNTRIES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

            </div>
            {/* Kind */}
            <div className="space-y-2">
              <label
                htmlFor="input_target"
                className="block text-sm font-medium text-gray-700"
              >
                Kind<span className="text-red-500">*</span>
              </label>
              <select
                id="input_target"
                value={formData.kind}
                className={`w-full focus-visible:outline-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 bg-white`}
                onChange={(e) => { setFormData({ ...formData, kind: e.target.value }) }}
              >
                {SHOWROOM_KIND.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

            </div>
          </div>
          {/* Partner Name (English) */}
          <div className="space-y-2 mt-5">
            <label
              htmlFor="partner_name_pl"
              className="block text-sm font-medium text-gray-700"
            >
              Partner Name (English)<span className="text-red-500">*</span>
            </label>
            <input
              required
              id="partner_name_pl"
              type="text"
              value={formData.partner_name_pl}
              onChange={(e) => { setFormData({ ...formData, partner_name_pl: e.target.value }) }}
              className={`w-full focus-visible:outline-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 bg-white`}
            />

          </div>

          {/* Partner Name (Arabic) */}
          <div className="space-y-2 mt-5">
            <label
              htmlFor="partner_name_sl"
              className="block text-sm font-medium text-gray-700"
            >
              Partner Name (Arabic)<span className="text-red-500">*</span>
            </label>
            <input
              required
              id="partner_name_sl"
              type="text"
              value={formData.partner_name_sl}
              onChange={(e) => { setFormData({ ...formData, partner_name_sl: e.target.value }) }}
              className={`w-full focus-visible:outline-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 bg-white`}
            />

          </div>
          {/* Date */}
          <div className="space-y-2 mt-5">
            <label
              htmlFor="joinDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              id="joinDate"
              type="date"
              value={formData.joinDate}
              onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
              className={`w-full focus-visible:outline-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900`}
            />

          </div>
        </div>

        <div className="flex justify-end space-x-3 p-4 sticky bottom-0 z-50 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <button
            type="button"
            onClick={() => { setOpen(false); }}
            className="px-6 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            Save
          </button>
        </div>
      </form>
    </BaseModal>
  )
}

export default AddShowRoomModal