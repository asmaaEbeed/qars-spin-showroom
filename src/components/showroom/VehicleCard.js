// src/components/showroom/VehicleCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {vehicle.images?.[0] && (
        <img 
          src={vehicle.images[0]} 
          alt={vehicle.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold">{vehicle.title}</h3>
        <p className="text-lg font-bold text-primary">{vehicle.price} {vehicle.currency}</p>
        <div className="mt-2 text-sm text-gray-600">
          {vehicle.specs?.year} • {vehicle.specs?.mileage} km • {vehicle.specs?.fuelType}
        </div>
        <Link 
          to={`/showroom/${vehicle.id}`}
          className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;