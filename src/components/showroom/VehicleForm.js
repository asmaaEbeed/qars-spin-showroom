import React from 'react';
import { usePosts } from '../../context/PostsContext';

const VehicleForm = ({ postKind, initialData = {}, onSubmit }) => {
  const { VEHICLE_SPECS, POST_KINDS } = usePosts();
  
  // Convert the postKind from URL to match our POST_KINDS values
  const getMatchingPostKind = () => {
    if (!postKind) return null;
    
    // Find the matching key in POST_KINDS
    const matchingKey = Object.entries(POST_KINDS).find(
      ([_, value]) => value.toLowerCase() === postKind.toLowerCase()
    );
    
    return matchingKey ? POST_KINDS[matchingKey[0]] : null;
  };
  
  const resolvedPostKind = getMatchingPostKind();
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    price: '',
    currency: 'QAR',
    status: 'draft',
    ...initialData,
    // Vehicle-specific fields will be added by specs
    specs: initialData.specs || {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      specs: { ...prev.specs, [name]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500/10 to-indigo-500/10 px-8 py-6 border-b border-secondary-100">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-secondary-800">
                {initialData.title ? 'Edit Vehicle' : 'Add New Vehicle'}
              </h2>
              <p className="text-secondary-600 text-sm mt-1">
                {postKind ? `Create a new ${postKind} listing` : 'Fill in the details below'}
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <div className="h-8 w-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="h-4 w-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary-800">Basic Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Vehicle Title
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., 2023 Toyota Camry XLE"
                    className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/80"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Price
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="25000"
                      className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/80 pr-20"
                      required
                    />
                    <select
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 rounded-lg px-3 py-1 text-sm text-secondary-700"
                    >
                      <option value="QAR">QAR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide a detailed description of the vehicle..."
                    rows="4"
                    className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/80 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/80"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="sold">Sold</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Vehicle Specifications Section */}
            {resolvedPostKind && VEHICLE_SPECS[resolvedPostKind] && VEHICLE_SPECS[resolvedPostKind].length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="h-8 w-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="h-4 w-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-800">Vehicle Specifications</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {VEHICLE_SPECS[resolvedPostKind].map(spec => (
                    <div key={spec.name} className="space-y-2">
                      <label className="block text-sm font-medium text-secondary-700">
                        {spec.label}
                        {spec.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      
                      {spec.type === 'select' ? (
                        <select
                          value={formData.specs[spec.name] || ''}
                          onChange={(e) => handleSpecChange(spec.name, e.target.value)}
                          required={spec.required}
                          className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/80"
                        >
                          <option value="">Select {spec.label}</option>
                          {spec.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : spec.type === 'textarea' ? (
                        <textarea
                          value={formData.specs[spec.name] || ''}
                          onChange={(e) => handleSpecChange(spec.name, e.target.value)}
                          required={spec.required}
                          placeholder={`Enter ${spec.label.toLowerCase()}`}
                          rows="3"
                          className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/80 resize-none"
                        />
                      ) : (
                        <input
                          type={spec.type || 'text'}
                          value={formData.specs[spec.name] || ''}
                          onChange={(e) => handleSpecChange(spec.name, e.target.value)}
                          required={spec.required}
                          placeholder={`Enter ${spec.label.toLowerCase()}`}
                          className="w-full px-4 py-3 border border-secondary-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white/80"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-8 border-t border-secondary-100">
              <button
                type="button"
                className="px-6 py-3 border border-secondary-300 text-secondary-700 rounded-xl hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-secondary-500 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
              >
                <span className="flex items-center justify-center">
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {initialData.title ? 'Update Vehicle' : 'Save Vehicle'}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleForm;