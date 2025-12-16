import Swal from "sweetalert2";
import { useCallback } from "react";
// Assuming you still need these imports
import { carAPI } from "../../../services/api";
import { usePaymentContext } from "../../../context/PaymentContext";
import { toast } from "react-toastify";
// Assuming toast is a library like react-hot-toast, you'd import it here or pass it in
// import toast from 'react-hot-toast'; // Example

// 1. Rename to start with 'use' and define it as a reusable Hook.
export function useHandlePostRequest(
  setSelectCurrencyOpen // Pass the setter function
) {
  // 2. Consume required context hooks internally
  const { onPaymentInitiate } = usePaymentContext();

  // 3. Use useCallback to memoize the function, preventing unnecessary re-renders
  // Include all external dependencies in the dependency array
  const handleSubmitRequest = useCallback(
    async (type, postId, price) => {
      // Check if essential data is available before proceeding

      if (!postId || !type) {
        toast.error("Missing post details or request type.");
        return;
      }

      try {
        // Define the request parameters
        const param = {
          postId: postId,
          RequestType: type, // This is now a passed argument
          RequestFrom: "Partner",
        };

        // 1. Check for existing requests
        const response = await carAPI.getCarRequests(param);
        const data = response.data;

        if (data.length > 0) {
          // Existing request handling
          const status = data[0].requestStatus;
          if (status === "Completed" || status === "Pending") {
            await Swal.fire({
              icon: status === "Completed" ? "success" : "warning",
              title: `Your Request ${status}!`,
              html: `You sent request for ${type} is ${status.toLowerCase()}.`,
              // ... (rest of the existing Swal configuration)
              showConfirmButton: false,
              confirmButtonText: "Confirm Request",
              confirmButtonColor: "#34c38f",
              showCancelButton: true,
              cancelButtonText: "Close",
              cancelButtonColor: "#f46a6a",
            });
          }
        } else {
          // New request (Offer Time) handling
          const result = await Swal.fire({
            icon: "question",
            title: `${
              type === "Request to Feature a Post"
                ? "Make your post Feature"
                : type === "Request 360 Photo Session"
                ? "Request 360 Photo Session Service"
                : type
            }`,
            html: `
            ${type}
            <p style="margin-top: 21px; font-size: 20px; font-weight: 600;">It's for 
             <b style="color: #34c38f; font-weight: 600; font-size: 24px;">
            ${(type === "Request to Feature a Post" || type === "Request 360 Photo Session") ? `${price} QAR` : "Free!" } 
              </b>
            </p>
          `,
            confirmButtonText: "Confirm Request",
            confirmButtonColor: "#34c38f",
            showCancelButton: true,
            cancelButtonText: "Close",
            cancelButtonColor: "#f46a6a",
          });

          if (result.isConfirmed) {
            try {
              if (
                type === "Request New Tag" ||
                type === "Request Inspected Tag"
              ) {
                const resRequest = await carAPI.postCreateRequest(param);
                if (resRequest.status === 200 || resRequest.status === 201) {
                  toast.success(
                    resRequest.data.Message || "Request sent successfully!"
                  );
                }
                return;
              }
              // Call payment initiation
              const res = await onPaymentInitiate(type, price);

              if (res.status === 200 || res.status === 201) {
                toast.success(
                  res.data.Message || "Payment Initiated Successfully!"
                );
                // Call the setter function passed as an argument
                setSelectCurrencyOpen(true);
              } else {
                toast.error(res.message || "Your Request sent failed");
              }
            } catch (e) {
              toast.error(e.data?.message || "Your Request sent failed");
              console.error(e);
            }
          }
        }
      } catch (e) {
        console.error(e);
        // Optional: Add a general error toast here
        toast.error("An unexpected error occurred.");
      }
    },
    [onPaymentInitiate, setSelectCurrencyOpen]
  ); // Important: Dependency Array

  // 4. Return the function(s) the component needs to call
  return { handleSubmitRequest };
}
