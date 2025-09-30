import { useEffect, useState } from "react";
import { carAPI } from "../../services/api/carForSaleProfile.api";
import { useCarContext } from "../../context/CarContext";

export function useCarOffers(code) {
  const { setCarOffers, setCarOfferLoading } = useCarContext();

  useEffect(() => {
    const fetchCarSpecification = async () => {
      try {
        setCarOfferLoading(true);
        const response = await carAPI.getCarOffers(code);
        setCarOfferLoading(false);
        setCarOffers(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchCarSpecification();
  }, []);
}
