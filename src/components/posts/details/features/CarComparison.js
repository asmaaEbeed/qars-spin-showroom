import React, { useState } from "react";
import { usePosts } from "../../../../context/PostsContext";
import CarSelectionModal from "./CarSelectionModal";

export const CarComparison = ({ currentPost }) => {
  const { posts } = usePosts();
  const [selectedPost, setSelectedPost] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCompare = async (postId) => {
    setLoading(true);
    try {
      const post = posts.find((p) => p.id === postId);
      setSelectedPost(postId);
      setComparisonData({
        current: currentPost,
        comparison: post,
      });
    } catch (error) {
      console.error("Error comparing posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const getComparisonData = (key) => {
    if (!comparisonData) return null;

    const current = comparisonData.current?.specifications?.find(
      (s) => s.key === key
    )?.value;
    const comparison = comparisonData.comparison?.specifications?.find(
      (s) => s.key === key
    )?.value;

    return {
      current,
      comparison,
    };
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold text-secondary-800">
          Car Comparison
        </h2>
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Select Car to Compare
            </button>
            <button
              onClick={() => setSelectedPost(null)}
              className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
            >
              Clear Comparison
            </button>
          </div>
        </div>
      </div>

      {selectedPost ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 py-4 border-b border-secondary-800">
              Current Car
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold">Description</h4>
                <p>{currentPost.technicalDescriptionPl}</p>
              </div>
              <div>
                <h4 className="font-bold">Manufacture Year</h4>
                <p>{currentPost.manufactureYear}</p>
              </div>
              <div>
                <h4 className="font-bold">Mileage</h4>
                <p>{currentPost.mileage} km</p>
              </div>
              <div>
                <h4 className="font-bold">Price</h4>
                <p>${currentPost.askingPrice}</p>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 p-4 rounded-lg">
            <h3 className="text-lg py-4 font-semibold mb-2 border-b border-secondary-800">
              Comparison Car
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold">Description</h4>
                <p>
                  {comparisonData?.comparison?.Technical_Description_PL ||
                    "Select car to compare"}
                </p>
              </div>
              <div>
                <h4 className="font-bold">Manufacture Year</h4>
                <p>{comparisonData?.comparison?.year || "-"}</p>
              </div>
              <div>
                <h4 className="font-bold">Mileage</h4>
                <p>{comparisonData?.comparison?.mileage || "-"} km</p>
              </div>
              <div>
                <h4 className="font-bold">Price</h4>
                <p>${comparisonData?.comparison?.price || "-"}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-secondary-400 text-xl font-semibold italic  p-5 bg-primary-50">Select a car to compare</p>
      )}
      {showModal && (
        <CarSelectionModal
          onClose={() => setShowModal(false)}
          onCarSelect={(postId) => {
            handleCompare(postId);
            setShowModal(false);
          }}
          currentPost={currentPost}
        />
      )}
    </div>
  );
};

export default CarComparison;
