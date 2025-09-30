// src/components/showroom/VehicleList.js
import React from 'react';
import { usePosts } from '../../context/PostsContext';
import VehicleCard from './VehicleCard';

const VehicleList = ({ postKind }) => {
  const { posts, loading, error } = usePosts();
  
  // Filter posts by type and postKind
  const vehiclePosts = posts.filter(post => 
    post.type === 'vehicle' && 
    (postKind ? post.postKind === postKind : true)
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (vehiclePosts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No vehicles found</div>
        <div className="mt-2 text-gray-400">Try adjusting your search or add a new vehicle</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehiclePosts.map(vehicle => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VehicleList;