import React, { useState } from 'react';
import { usePosts } from '../../../../context/PostsContext';

const CarSelectionModal = ({ onClose, onCarSelect, currentPost }) => {
  const { posts } = usePosts();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter posts to exclude the current post and match search term
  const filteredPosts = posts
    .filter(post => post.id !== currentPost.id)
    .filter(post => 
      (!searchTerm || 
      (post.model && post.model.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (post.brand && post.brand.toLowerCase().includes(searchTerm.toLowerCase())))
    );

  const handleSelectCar = (postId) => {
    onCarSelect(postId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-secondary-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-secondary-800">Select Car for Comparison</h2>
          <button onClick={onClose} className="text-secondary-400 hover:text-secondary-500">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by model or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-secondary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="max-h-96 overflow-y-auto space-y-2">
          {filteredPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => handleSelectCar(post.id)}
              className="flex items-center justify-between w-full px-4 py-3 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <div>
                <h3 className="font-medium text-secondary-800">{post.Car_Name_PL}</h3>
                <p className="text-sm text-secondary-500">{post.brand}</p>
              </div>
              <span className="text-sm text-primary-600">Select</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarSelectionModal;
