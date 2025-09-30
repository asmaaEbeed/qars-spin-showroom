import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi";

const ContactInfoCard = ({
  partner,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  loading,
  formData,
  setFormData
}) => {


  // useEffect(() => {
  //   if (partner) {
  //     setFormData({
  //       contactPhone: partner.contactPhone || "",
  //       contactWhatsApp: partner.contactWhatsApp || "",
  //       mapsUrl: partner.mapsUrl || "",
  //       notificationEmail: partner.notificationEmail || "",
  //     });
  //   }
  //   console.log(partner)
  // }, [partner]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isEditing) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden h-full">
        <div className="bg-gradient-to-r from-primary-500/10 to-indigo-500/10 px-6 py-4 border-b border-secondary-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
                <FiPhone className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-800">
                Contact Info
              </h3>
            </div>
            <button
              onClick={() => onEdit(formData)}
              className="px-3 py-1.5 text-xs bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
            >
              Edit
            </button>
          </div>
        </div>

        <div className="p-3  space-y-4">
          <div className="space-y-3 overflow-hidden">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                <FiPhone className="h-4 w-4 text-secondary-600" />
              </div>
              <div>
                <p className="text-secondary-900 font-medium">
                  {formData.contactPhone}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <FaWhatsapp className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-secondary-900 font-medium">
                  {formData.contactWhatsApp}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPinIcon className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <a
                  href={formData.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  Get Location Maps
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <EnvelopeIcon className="h-4 w-4 text-purple-600" />
              </div>
              <div className="lg:max-w-[150px] xl:max-w-[180px]">
                <Link
                  href={`mailto:${formData.notificationEmail}`}
                  className="block text-secondary-900 font-medium lg:text-xs whitespace-normal break-words"
                >
                  {formData.notificationEmail}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden h-full">
      <div className="bg-gradient-to-r from-primary-500/10 to-indigo-500/10 px-6 py-4 border-b border-secondary-100">
        <h3 className="text-lg font-semibold text-secondary-800">
          Contact Information
        </h3>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
            <FiPhone className="h-5 w-5 text-primary-600" />
            </div>
            <div className="ml-4 flex-1">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-500"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <FaWhatsapp className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-4 flex-1">
              <label
                htmlFor="whatsapp"
                className="block text-sm font-medium text-gray-500"
              >
                WhatsApp
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="contactWhatsApp"
                value={formData.contactWhatsApp}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <svg
                className="h-5 w-5 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-500"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="mapsUrl"
                value={formData.mapsUrl}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <EnvelopeIcon className="h-4 w-4 text-blue-600" />
            </div>
            <div className="ml-4 flex-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-500"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="notificationEmail"
                value={formData.notificationEmail}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div className="flex space-x-3 justify-end mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {loading ? (
                <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></span>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ContactInfoCard;
