// src/pages/VehicleDetails.js
import React from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../../context/PostsContext";

const VehicleDetails = () => {
  const { id } = useParams();
  const { posts } = usePosts();
  const vehicle = posts.find((p) => p.id === id);

  if (!vehicle) {
    return <div>Vehicle not found</div>;
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="relative h-96 bg-gray-100">
            {vehicle.images?.length > 0 ? (
              <img
                src={vehicle.images[0]}
                alt={vehicle.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image Available
              </div>
            )}
          </div>

          {/* Vehicle Info */}
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{vehicle.title}</h1>
            <p className="text-2xl font-bold text-primary mb-6">
              {vehicle.price} {vehicle.currency}
            </p>

            {/* Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {Object.entries(vehicle.specs || {}).map(([key, value]) => (
                <div key={key} className="border-b pb-2">
                  <span className="font-semibold capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}:{" "}
                  </span>
                  <span>{value}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p>{vehicle.description || "No description available."}</p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default VehicleDetails;
