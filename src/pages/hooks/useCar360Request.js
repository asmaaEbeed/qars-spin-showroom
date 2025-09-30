import { useCallback } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Img360 from "../../assets/images/360-camera.png";
import { carAPI } from "../../services/api/carForSaleProfile.api";

export function useCar360Request(car) {
  return useCallback(async () => {
    if (!car) return;

    try {
      const param = {
        postId: car.postId,
        RequestType: "Request 360 Photo Session",
        RequestFrom: "Partner",
      };

      const response = await carAPI.getCarRequests(param);
      const data = response.data;

      if (data.length > 0) {
        const status = data[0].requestStatus;
        if (status === "Completed" || status === "Pending") {
          await Swal.fire({
            icon: status === "Completed" ? "success" : "warning",
            title: `Your Request ${status}!`,
            html: `You sent request before and 360° image service is ${status.toLowerCase()}.`,
            showConfirmButton: false,
            confirmButtonText: "Confirm Request",
            confirmButtonColor: "#34c38f",
            showCancelButton: true,
            cancelButtonText: "Close",
            cancelButtonColor: "#f46a6a",
          }).then((result) => {
            if (result.isConfirmed) {
              toast.success("Your Request sent successfully");
            }
          });
        }
      } else {
        await Swal.fire({
          icon: "question",
          title: "It's Offer Time!",
          html: `
            <img src=${Img360} style="width: 140px; display: block; margin: 20px auto;" alt="" />
            Request 360° image service <b style="color: #34c38f;">free</b>
            Instead of <span style="text-decoration: line-through; color: #f46a6a; font-weight: 600;">150$</span>
            <p style="margin-top: 21px; font-size: 20px; font-weight: 600;">It's a limited Offer!</p>
          `,
          confirmButtonText: "Confirm Request",
          confirmButtonColor: "#34c38f",
          showCancelButton: true,
          cancelButtonText: "Close",
          cancelButtonColor: "#f46a6a",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await carAPI.postCreateRequest(localStorage.getItem("userName"), param)

            toast.success("Your Request sent successfully");
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, [car]);
}
