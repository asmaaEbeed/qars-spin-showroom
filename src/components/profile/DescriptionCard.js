import React, { useState, useEffect } from 'react';

const DescriptionCard = ({ partner, isEditing, onEdit, onSave, onCancel, loading, formData, setFormData }) => {


  useEffect(() => {
    if (partner) {
      setFormData({
        descriptionEn: partner.descriptionEn  || '',
        descriptionAr: partner.descriptionAr || ''
      });
    }
  }, [partner]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
              <div className="h-8 w-8 bg-amber-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-secondary-800">Description</h3>
            </div>
            <button 
              onClick={onEdit}
              className="px-3 py-1.5 text-xs bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
            >
              Edit
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-secondary-700 flex items-center">
                <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center mr-2">EN</span>
                English
              </h4>
            </div>
            <p className="text-secondary-700 text-sm leading-relaxed">
              {formData.descriptionEn}
            </p>
          </div>
          
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-secondary-700 flex items-center">
                <span className="h-5 w-5 rounded-full bg-green-100 text-green-800 text-xs flex items-center justify-center mr-2">AR</span>
                العربية
              </h4>
            </div>
            <p className="text-secondary-700 text-sm leading-relaxed text-right" dir="rtl">
              {formData.descriptionAr}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden h-full">
      <div className="bg-gradient-to-r from-primary-500/10 to-indigo-500/10 px-6 py-4 border-b border-secondary-100">
        <h3 className="text-lg font-semibold text-secondary-800">Edit Description</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center mr-2">EN</span>
            <label htmlFor="primary" className="text-sm font-medium text-secondary-700">English</label>
          </div>
          <textarea
            id="primary"
            name="descriptionEn"
            value={formData.descriptionEn}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            required
          />
        </div>
        
        <div className="border-t border-gray-100 pt-4 space-y-2">
          <div className="flex items-center">
            <span className="h-5 w-5 rounded-full bg-green-100 text-green-800 text-xs flex items-center justify-center mr-2">AR</span>
            <label htmlFor="secondary" className="text-sm font-medium text-secondary-700">العربية</label>
          </div>
          <textarea
            id="secondary"
            name="descriptionAr"
            value={formData.descriptionAr}
            onChange={handleChange}
            rows="4"
            dir="rtl"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            required
          />
        </div>

        <div className="flex space-x-3 justify-end pt-4">
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default DescriptionCard;