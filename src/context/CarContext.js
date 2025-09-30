import React, { createContext, useContext, useState } from "react";
import { carAPI } from "../services/api";

// 1️⃣ Create Context
const CarContext = createContext();

// 2️⃣ Provider Component
export const CarProvider = ({ children }) => {
  const [carSpecs, setCarSpecs] = useState({});
  const [carOffers, setCarOffers] = useState([]);
  const [carOfferLoading, setCarOfferLoading] = useState(false);
  const [carDetails, setCarDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [specLoading, setSpecLoading] = useState(false);

  const fetchCarProfile = async (code) => {
    try {
      const response = await carAPI.getCarProfile(code);
      setCarDetails(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

    const fetchCarSpecification = async (postCode) => {
      try {
        setSpecLoading(true);
        const response = await carAPI.getCarSpecs(postCode);
        setSpecLoading(false);
        setCarSpecs(response.data);
      } catch (e) {
        setSpecLoading(false);
        console.log(e);
      }
    };

  return (
    <CarContext.Provider
      value={{
        carSpecs,
        setCarSpecs,
        carOffers,
        setCarOffers,
        carOfferLoading,
        setCarOfferLoading,
        carDetails,
        isLoading,
        fetchCarProfile,
        fetchCarSpecification,
        specLoading,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

// 3️⃣ Custom hook for cleaner usage
export const useCarContext = () => {
  return useContext(CarContext);
};
