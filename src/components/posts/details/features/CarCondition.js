import React, { useState } from 'react';
import { usePosts } from '../../../../context/PostsContext';

export const CarCondition = ({ currentPost }) => {
  const { updateCarCondition } = usePosts();
  const [condition, setCondition] = useState(currentPost.condition || {});
  const [loading, setLoading] = useState(false);

  const handleConditionChange = async (field, value) => {
    setLoading(true);
    try {
      await updateCarCondition(currentPost.id, {
        ...condition,
        [field]: value
      });
      setCondition(prev => ({
        ...prev,
        [field]: value
      }));
    } catch (error) {
      console.error('Error updating condition:', error);
    } finally {
      setLoading(false);
    }
  };

  const conditionFields = [
    { label: 'Engine Condition', field: 'engine' },
    { label: 'Body Condition', field: 'body' },
    { label: 'Interior Condition', field: 'interior' },
    { label: 'Suspension Condition', field: 'suspension' },
    { label: 'Electrical Systems', field: 'electrical' },
    { label: 'Brakes Condition', field: 'brakes' }
  ];

  const getConditionRating = (value) => {
    if (!value) return 'Not Rated';
    if (value >= 80) return 'Excellent';
    if (value >= 60) return 'Good';
    if (value >= 40) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-secondary-800 mb-6">Car Condition Rating</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {conditionFields.map((field) => (
          <div key={field.field} className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{field.label}</h3>
              <span className={`px-2 py-1 rounded-full text-sm ${
                getConditionRating(condition[field.field]) === 'Excellent' ? 'bg-green-100 text-green-800' :
                getConditionRating(condition[field.field]) === 'Good' ? 'bg-yellow-100 text-yellow-800' :
                getConditionRating(condition[field.field]) === 'Fair' ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {getConditionRating(condition[field.field])}
              </span>
            </div>

            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={condition[field.field] || 0}
                onChange={(e) => handleConditionChange(field.field, parseInt(e.target.value))}
                className="w-full h-2 bg-primary-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="absolute inset-y-0 left-0 w-full flex items-center pointer-events-none">
                <span className="text-sm text-secondary-500 ml-2">
                  {condition[field.field] || 0}%
                </span>
              </div>
            </div>

            <div className="flex justify-between text-sm text-secondary-500">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button 
          onClick={() => handleConditionChange('overall', 
            conditionFields.reduce((sum, field) => sum + (condition[field.field] || 0), 0) / conditionFields.length
          )}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Overall Rating'}
        </button>
      </div>
    </div>
  );
};

export default CarCondition;
