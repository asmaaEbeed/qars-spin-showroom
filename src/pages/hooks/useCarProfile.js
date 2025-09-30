import { useEffect, useState } from "react";
import { carAPI } from "../../services/api/carForSaleProfile.api";

export function useCarProfile(code) {
  const [postDetails, setPostDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!code) return;
    const fetchCarProfile = async () => {
      try {
        const response = await carAPI.getCarProfile(code);
        setPostDetails(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCarProfile();
  }, [code]);

  return { postDetails, isLoading };
}
