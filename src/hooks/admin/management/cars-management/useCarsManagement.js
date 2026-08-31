// import { useEffect, useState } from "react";
// import { usePosts } from "../../../../context/PostsContext";
// import { carsManagementApi } from "../../../../services/api/admin/managment/carsManagement.api";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";

// const initialFilter = {
//   filterBy: "",
//   value: "",
//   pageNumber: 1,
//   pageSize: 20,
// };

// export const useCarsManagement = () => {
//   const [filter, setFilter] = useState(initialFilter);
//   const [carsMakesFiltered, setCarsMakesFiltered] = useState([]);
//   const [createCarMakesLoading, setCreateCarMakesLoading] = useState(false);
//   const [updateCarMakeLoading, setUpdateCarMakeLoading] = useState(false);

//   const [createCarClassesLoading, setCreateCarClassesLoading] = useState(false);

//   const [updateCarClassLoading, setUpdateCarClassLoading] = useState(false);

//   const [currentCarsMakes, setCurrentCarsMakes] = useState([]);

//   const [selectedCarClassId, setSelectedCarClassId] = useState(null);
//   const [selectedCarMakeId, setSelectedCarMakeId] = useState(null);

//   const {
//     fetchCarsMakes,
//     carsMakesList,
//     carsMakesLoading,

//     fetchCarsClass,
//     carsClassLoading,
//     carsClassList,

//     fetchCarsModel,
//     carsModelList,
//     carsModelLoading,
//   } = usePosts();

//   const totalPages = Math.ceil(carsMakesList.length / filter.pageSize);

//   useEffect(() => {
//     const startIndex = (filter.pageNumber - 1) * filter.pageSize;
//     setCurrentCarsMakes(
//       carsMakesFiltered.slice(startIndex, startIndex + filter.pageSize),
//     );
//   }, [carsMakesFiltered, filter.pageNumber, filter.pageSize]);

//   useEffect(() => {
//     if (filter.filterBy && filter.value) {
//       if (filter.filterBy === "makeId") {
//         setCarsMakesFiltered(
//           carsMakesList.filter(
//             (car) =>
//               car[filter.filterBy].toString().trim() ===
//               filter.value.toString().trim(),
//           ),
//         );
//       } else {
//         setCarsMakesFiltered(
//           carsMakesList.filter((car) =>
//             car[filter.filterBy]
//               .toString()
//               .trim()
//               .toLowerCase()
//               .includes(filter.value.toLowerCase().trim()),
//           ),
//         );
//       }
//     } else {
//       setCarsMakesFiltered(carsMakesList);
//     }
//   }, [filter, carsMakesList]);

//   // Create Car Make
//   const createCarMake = async (data) => {
//     try {
//       setCreateCarMakesLoading(true);
//       const formData = new FormData();
//       Object.entries(data).forEach(([key, value]) => {
//         formData.append(key, value);
//       });
//       const res = await carsManagementApi.createCarMake(formData);
//       if (res.status === 200 || res.makeId) {
//         toast.success("Car Make created successfully");
//         fetchCarsMakes();
//         setSelectedCarMakeId(res.makeId);
//       }
//       return res;
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Failed to create car make");
//       console.log(e);
//     } finally {
//       setCreateCarMakesLoading(false);
//     }
//   };

//   // Update Car Make
//   const updateCarMake = async (data) => {
//     try {
//       setUpdateCarMakeLoading(true);
//       const formData = new FormData();
//       Object.entries(data).forEach(([key, value]) => {
//         formData.append(key, value);
//       });
//       const res = await carsManagementApi.updateCarMake(formData);
//       if (res.status === 200 || res.makeId) {
//         toast.success("Car Make created successfully");
//         fetchCarsMakes();
//       }
//       return res;
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Failed to create car make");
//       console.log(e);
//     } finally {
//       setUpdateCarMakeLoading(false);
//     }
//   };

//   // Delete Car Make
//   const deleteCarMake = async (id) => {
//     try {
//       Swal.fire({
//         title: `Are you sure to delete this car make?`,
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, Delete it!",
//       }).then(async (result) => {
//         if (result.isConfirmed) {
//           try {
//             const res = await carsManagementApi.deleteCarMake(id);
//             if (res.status === 200 || res.status === 204) {
//               toast.success(
//                 res.data.message || "Car make deleted successfully",
//               );
//               // fetchProfileDetails();
//               setCurrentCarsMakes((prev) =>
//                 prev.filter((car) => car.makeId !== id),
//               );
//             }
//           } catch (error) {
//             toast.error(
//               error.response.data.title || "Failed to delete car make",
//             );
//           }
//         }
//       });
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   // Create Car Class
//   const createCarClass = async (data) => {
//     try {
//       setCreateCarClassesLoading(true);
//       console.log(data);
//       const res = await carsManagementApi.createCarClass(data);
//       if (res.status === 200 || res.makeId) {
//         toast.success("Car Make created successfully");
//         fetchCarsClass(data.makeId);
//       }
//       return res;
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Failed to create car make");
//       console.log(e);
//     } finally {
//       setCreateCarClassesLoading(false);
//     }
//   };

//   // Update Car Class
//   const updateCarClass = async (data, makeId) => {
//     try {
//       setUpdateCarClassLoading(true);
//       const res = await carsManagementApi.updateCarClass(data);
//       if (res.status === 200 || res.makeId) {
//         toast.success("Car Class Updated successfully");
//         fetchCarsClass(makeId);
//       }
//       return res;
//     } catch (e) {
//       toast.error(e?.response?.data?.message || "Failed to create car make");
//       console.log(e);
//     } finally {
//       setUpdateCarMakeLoading(false);
//     }
//   };
//   // Delete Car class
//   const deleteCarClass = async (id, makeId) => {
//     try {
//       Swal.fire({
//         title: `Are you sure to delete this car Class?`,
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, Delete it!",
//       }).then(async (result) => {
//         if (result.isConfirmed) {
//           try {
//             const res = await carsManagementApi.deleteCarClass(id);
//             if (res.status === 200 || res.status === 204) {
//               toast.success(
//                 res.data.message || "Car Class deleted successfully",
//               );
//               fetchCarsClass(makeId);
//             }
//           } catch (error) {
//             toast.error(
//               error.response.data.title || "Failed to delete car make",
//             );
//           }
//         }
//       });
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   return {
//     filter,
//     setFilter,

//     fetchCarsMakes,
//     carsMakesList,
//     carsMakesFiltered,
//     carsMakesLoading,

//     fetchCarsClass,
//     carsClassLoading,
//     carsClassList,

//     fetchCarsModel,
//     carsModelList,
//     carsModelLoading,

//     totalPages,
//     currentCarsMakes,

//     createCarMake,
//     createCarMakesLoading,

//     updateCarMakeLoading,
//     updateCarMake,
//     deleteCarMake,

//     createCarClass,
//     createCarClassesLoading,

//     updateCarClass,
//     updateCarClassLoading,
//     deleteCarClass,

//     selectedCarClassId,
//     setSelectedCarClassId,

//     selectedCarMakeId,
//     setSelectedCarMakeId
//   };
// };
