import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { usePosts } from "./PostsContext";
import { carsManagementApi } from "../services/api/admin/managment/carsManagement.api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CarManagmentContext = createContext(null);

const initialFilter = {
    filterBy: "",
    value: "",
    pageNumber: 1,
    pageSize: 20,
};

export const CarsManagementProvider = ({ children }) => {
    const [filter, setFilter] = useState(initialFilter);
    const [carsMakesFiltered, setCarsMakesFiltered] = useState([]);
    const [createCarMakesLoading, setCreateCarMakesLoading] = useState(false);
    const [updateCarMakeLoading, setUpdateCarMakeLoading] = useState(false);

    const [createCarClassesLoading, setCreateCarClassesLoading] = useState(false);

    const [updateCarClassLoading, setUpdateCarClassLoading] = useState(false);
    const [classUpdatedSuccess, setClassUpdatedSuccess] = useState(false)

    const [currentCarsMakes, setCurrentCarsMakes] = useState([]);

    const [selectedCarClassId, setSelectedCarClassId] = useState(null);
    const [selectedCarMakeId, setSelectedCarMakeId] = useState(null);

    const [createCarModelLoading, setCreateCarModelLoading] = useState(false);
    const [createCarModelSuccess, setCreateCarModelSuccess] = useState(false)
    const [updateCarModelLoading, setUpdateCarModelLoading] = useState(false);
    // use to open model after updated successfully

    const {
        fetchCarsMakes,
        carsMakesList,
        carsMakesLoading,

        fetchCarsClass,
        carsClassLoading,
        carsClassList,
        setCarsClassList,

        fetchCarsModel,
        carsModelList,
        carsModelLoading,
        setCarsModelList
    } = usePosts();

    const totalPages = Math.ceil(carsMakesList.length / filter.pageSize);

    useEffect(() => {
        const startIndex = (filter.pageNumber - 1) * filter.pageSize;
        setCurrentCarsMakes(
            carsMakesFiltered.slice(startIndex, startIndex + filter.pageSize),
        );
    }, [carsMakesFiltered, filter.pageNumber, filter.pageSize]);

    useEffect(() => {
        if (filter.filterBy && filter.value) {
            if (filter.filterBy === "makeId") {
                setCarsMakesFiltered(
                    carsMakesList.filter(
                        (car) =>
                            car[filter.filterBy].toString().trim() ===
                            filter.value.toString().trim(),
                    ),
                );
            } else {
                setCarsMakesFiltered(
                    carsMakesList.filter((car) =>
                        car[filter.filterBy]
                            .toString()
                            .trim()
                            .toLowerCase()
                            .includes(filter.value.toLowerCase().trim()),
                    ),
                );
            }
        } else {
            setCarsMakesFiltered(carsMakesList);
        }
    }, [filter, carsMakesList]);

    // Create Car Make
    const createCarMake = useCallback(async (data) => {
        try {
            setCreateCarMakesLoading(true);
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
            const res = await carsManagementApi.createCarMake(formData);
            if (res.status === 200 || res.makeId) {
                toast.success("Car Make created successfully");
                fetchCarsMakes();
                setSelectedCarMakeId(res.data.makeId);
            }
            return res;
        } catch (e) {
            toast.error(e?.response?.data?.message || "Failed to create car make");
            console.log(e);
        } finally {
            setCreateCarMakesLoading(false);
        }
    }, [fetchCarsMakes]);

    // Update Car Make
    const updateCarMake = useCallback(async (data) => {
        try {
            setUpdateCarMakeLoading(true);
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
            const res = await carsManagementApi.updateCarMake(formData);
            if (res.status === 200 || res.makeId) {
                toast.success("Car Make created successfully");
                fetchCarsMakes();
            }
            return res;
        } catch (e) {
            toast.error(e?.response?.data?.message || "Failed to create car make");
            console.log(e);
        } finally {
            setUpdateCarMakeLoading(false);
        }
    }, [fetchCarsMakes]);

    // Delete Car Make
    const deleteCarMake = useCallback(async (id) => {
        try {
            Swal.fire({
                title: `Are you sure to delete this car make?`,
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const res = await carsManagementApi.deleteCarMake(id);
                        if (res.status === 200 || res.status === 204) {
                            toast.success(
                                res.data.message || "Car make deleted successfully",
                            );
                            // fetchProfileDetails();
                            setCurrentCarsMakes((prev) =>
                                prev.filter((car) => car.makeId !== id),
                            );
                        }
                    } catch (error) {
                        toast.error(
                            error.response.data.title || "Failed to delete car make",
                        );
                    }
                }
            });
        } catch (error) {
            toast.error("Something went wrong");
        }
    }, []);

    // Create Car Class
    const createCarClass = useCallback(async (data) => {
        try {
            setCreateCarClassesLoading(true);
            setClassUpdatedSuccess(false)
            const res = await carsManagementApi.createCarClass(data);
            if (res.status === 200 || res.makeId) {
                toast.success("Car Make created successfully");
                setSelectedCarClassId(res.data.classId);
                fetchCarsClass(data.makeId);
                setClassUpdatedSuccess(true)
            }
            return res;
        } catch (e) {
            toast.error(e?.response?.data?.message || "Failed to create car make");
            console.log(e);
        } finally {
            setCreateCarClassesLoading(false);
        }
    }, [fetchCarsClass]);

    // Update Car Class
    const updateCarClass = useCallback(async (data, makeId) => {
        try {
            setUpdateCarClassLoading(true);
            setClassUpdatedSuccess(false)
            const res = await carsManagementApi.updateCarClass(data);
            if (res.status === 200 || res.makeId) {
                toast.success("Car Class Updated successfully");
                fetchCarsClass(makeId);
                setClassUpdatedSuccess(true)

            }
            return res;
        } catch (e) {
            toast.error(e?.response?.data?.message || "Failed to update car class");
            console.log(e);
        } finally {
            setUpdateCarClassLoading(false);
        }
    }, [fetchCarsClass]);
    // Delete Car class
    const deleteCarClass = useCallback(async (id) => {
        try {
            Swal.fire({
                title: `Are you sure to delete this car Class?`,
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const res = await carsManagementApi.deleteCarClass(id);
                        if (res.status === 200 || res.status === 204) {
                            toast.success(
                                res.data.message || "Car Class deleted successfully",
                            );
                            setCarsClassList(prev => prev.filter(e => e.classId !== id))

                        }
                    } catch (error) {
                        toast.error(
                            error?.response?.data?.title || "Failed to delete car make",
                        );
                    }
                }
            });
        } catch (error) {
            toast.error("Something went wrong");
        }
    }, [setCarsClassList]);

    // Create Car Model
    const createCarModel = useCallback(async (data) => {
        try {
            setCreateCarModelLoading(true);
            setCreateCarModelSuccess(false)
            const res = await carsManagementApi.createCarModel(data);
            if (res.status === 200 || res.modelId) {
                toast.success("Car model created successfully");
                fetchCarsModel(data.makeId, data.classId);
                setCreateCarModelSuccess(true)
            }
            return res;
        } catch (e) {
            toast.error(e?.response?.data?.message || "Failed to create car model");
            console.log(e);
        } finally {
            setCreateCarModelLoading(false);
        }
    }, [fetchCarsModel]);

    // Update Car model
    const updateCarModel = useCallback(async (data, makeId) => {
        try {
            setUpdateCarModelLoading(true);
            const res = await carsManagementApi.updateCarModel(data);
            if (res.status === 200 || res.modelId) {
                toast.success("Car Model Updated successfully");
                fetchCarsModel(data.makeId, data.classId);

            }
            return res;
        } catch (e) {
            toast.error(e?.response?.data?.message || "Failed to update car model");
            console.log(e);
        } finally {
            setUpdateCarModelLoading(false);
        }
    }, [fetchCarsModel]);

    // Delete Car Model
    const deleteCarModel = useCallback(async (id) => {
        try {
            Swal.fire({
                title: `Are you sure to delete this car Model?`,
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const res = await carsManagementApi.deleteCarModel(id);
                        if (res.status === 200 || res.status === 204) {
                            toast.success(
                                res.data.message || "Car Model deleted successfully",
                            );
                            setCarsModelList(prev => prev.filter(e => e.modelId !== id))

                        }
                    } catch (error) {
                        toast.error(
                            error?.response?.data?.title || "Failed to delete car make",
                        );
                    }
                }
            });
        } catch (error) {
            toast.error("Something went wrong");
        }
    }, [setCarsModelList]);


    const value = useMemo(
        () => ({

            filter,
            setFilter,

            fetchCarsMakes,
            carsMakesList,
            carsMakesFiltered,
            carsMakesLoading,

            fetchCarsClass,
            carsClassLoading,
            carsClassList,

            fetchCarsModel,
            carsModelList,
            carsModelLoading,

            totalPages,
            currentCarsMakes,

            createCarMake,
            createCarMakesLoading,

            updateCarMakeLoading,
            updateCarMake,
            deleteCarMake,

            createCarClass,
            createCarClassesLoading,

            updateCarClass,
            updateCarClassLoading,
            deleteCarClass,
            classUpdatedSuccess,

            selectedCarClassId,
            setSelectedCarClassId,

            selectedCarMakeId,
            setSelectedCarMakeId,

            createCarModelLoading,
            createCarModelSuccess,
            createCarModel,
            updateCarModel,
            updateCarModelLoading,
            deleteCarModel
        }),
        [

            filter,
            setFilter,

            fetchCarsMakes,
            carsMakesList,
            carsMakesFiltered,
            carsMakesLoading,

            fetchCarsClass,
            carsClassLoading,
            carsClassList,

            fetchCarsModel,
            carsModelList,
            carsModelLoading,

            totalPages,
            currentCarsMakes,

            createCarMake,
            createCarMakesLoading,

            updateCarMakeLoading,
            updateCarMake,
            deleteCarMake,

            createCarClass,
            createCarClassesLoading,

            updateCarClass,
            updateCarClassLoading,
            deleteCarClass,
            classUpdatedSuccess,

            selectedCarClassId,
            setSelectedCarClassId,

            selectedCarMakeId,
            setSelectedCarMakeId,

            createCarModelLoading,
            createCarModelSuccess,
            createCarModel,
            updateCarModel,
            updateCarModelLoading,
            deleteCarModel
        ]
    );

    return (
        <CarManagmentContext.Provider value={value}>{children}</CarManagmentContext.Provider>
    );
};

export const useCarsManagement = () => {
    const context = useContext(CarManagmentContext);
    if (!context) {
        throw new Error("useCarManagementContext must be used within a CarsManagementProvider");
    }
    return context;
};
