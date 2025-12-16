import { useCallback } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Img360 from "../../assets/images/360-camera.png";
import { carAPI } from "../../services/api/carForSaleProfile.api";
import { superAdminAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

// export function useCar360Request(car) {

//   const { user } = useAuth();
//   return useCallback(async () => {
//     if (!car) return;

//     try {
//       const param = {
//         postId: car.postId,
//         RequestType: "Request 360 Photo Session",
//         RequestFrom: "Partner",
//       };

//       const response = await carAPI.getCarRequests(param);
//       const data = response.data;

//       if (data.length > 0) {
//         const status = data[0].requestStatus;
//         if (status === "Completed" || status === "Pending") {
//           await Swal.fire({
//             icon: status === "Completed" ? "success" : "warning",
//             title: `Your Request ${status}!`,
//             html: `You sent request before and 360° image service is ${status.toLowerCase()}.`,
//             showConfirmButton: false,
//             confirmButtonText: "Confirm Request",
//             confirmButtonColor: "#34c38f",
//             showCancelButton: true,
//             cancelButtonText: "Close",
//             cancelButtonColor: "#f46a6a",
//           }).then((result) => {
//             if (result.isConfirmed) {
//               toast.success("Your Request sent successfully");
//             }
//           });
//         }
//       } else {
//         await Swal.fire({
//           icon: "question",
//           title: "It's Offer Time!",
//           html: `
//             <img src=${Img360} style="width: 140px; display: block; margin: 20px auto;" alt="" />
//             Request 360° image service <b style="color: #34c38f;">free</b>
//             Instead of <span style="text-decoration: line-through; color: #f46a6a; font-weight: 600;">150$</span>
//             <p style="margin-top: 21px; font-size: 20px; font-weight: 600;">It's a limited Offer!</p>
//           `,
//           confirmButtonText: "Confirm Request",
//           confirmButtonColor: "#34c38f",
//           showCancelButton: true,
//           cancelButtonText: "Close",
//           cancelButtonColor: "#f46a6a",
//         }).then(async (result) => {
//           if (result.isConfirmed) {
//             await carAPI.postCreateRequest(
//               user.userName,
//               param
//             );

//             toast.success("Your Request sent successfully");
//           }
//         });
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   }, [car, user]);
// }

const handleAdd360UrlSwal = async () => {
  const result = await Swal.fire({
      iconHtml: `
      <svg xmlns="http://www.w3.org/2000/svg" 
        fill="none" viewBox="0 0 24 24" 
        stroke-width="1.5" stroke="currentColor" 
        class="w-10 h-10 text-green-500 mx-auto border-green-500">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"  />
      </svg>
    `,
      title: "Add 360° URL",
      showConfirmButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "#34c38f",
      showCancelButton: true,
      cancelButtonText: "Close",
      cancelButtonColor: "#f46a6a",
      input: "text",
      inputPlaceholder: "Enter 360° URL",
      preConfirm: (value) => {
        if (!value) {
          // ✅ match same property
          Swal.showValidationMessage("Please enter a value");
        }
        return value;
      },
    });

    return result;
}

export function useAddCar360Url(postId) {
  return useCallback(async () => {
    if (!postId) return;
    const result = await handleAdd360UrlSwal();

    if (result.isConfirmed) {
      try {
        Swal.showLoading();
        const params = {
          postId: postId,
          view360Link: encodeURIComponent(result.value),
        };
        const res = await superAdminAPI.edit360LinkForPost(params);
        if (res.status === 200) {
          toast.success(res.data.message);
          Swal.close();
        }
      } catch (e) {
        console.error(e);
        toast.error("Something went wrong");
        Swal.close();
      }
    }
  }, [postId]);
}

export function useAddPartner360Url(partnerId) {
  return useCallback(async () => {
    if (!partnerId) return;
    const result = await handleAdd360UrlSwal();

    if (result.isConfirmed) {
      try {
        Swal.showLoading();
        const params = {
          partnerId: partnerId,
          view360Link: encodeURIComponent(result.value),
        };
        const res = await superAdminAPI.edit360LinkForShowroom(params);
        if (res.status === 200) {
          toast.success(res.data.message);
          Swal.close();
          return {state: "success", value: result.value}
        }
      } catch (e) {
        console.error(e);
        toast.error("Something went wrong");
        Swal.close();
      }
    }
  }, [partnerId]);
}
