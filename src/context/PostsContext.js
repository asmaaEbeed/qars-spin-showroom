import { createContext, useCallback, useContext, useState } from "react";
import {
  carAPI,
  managementAPI,
  ShowroomProfileAPI,
  superAdminAPI,
} from "../services/api";
import Swal from "sweetalert2";
// Post kind constants

const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loadingFetchPosts, setLoadingFetchPosts] = useState(false);
  const [error] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [carsNameList, setCarsNameList] = useState([]);
  const [carsNameListLoading, setCarsNameListLoading] = useState(false);
  const [filters, setFilters] = useState({
    searchBy: 0,
    searchTerm: "",
    category: "",
    status: "",
    sortBy: 0,
    year: "",
    pinToTop: false,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [postCreatedId, setPostCreatedId] = useState("");
  const [postCreatedCode, setPostCreatedCode] = useState("");
  const [showroomInitData, setShowroomInitData] = useState(null);

  const [carsMakesList, setCarsMakesList] = useState([]);
  const [carsMakesLoading, setCarsMakesLoading] = useState(false);

  const [carsClassList, setCarsClassList] = useState([]);
  const [carsClassLoading, setCarsClassLoading] = useState(false);

  const [carsModelList, setCarsModelList] = useState([])
  const [carsModelLoading, setCarsModelLoading] = useState(false)

  // Update Specification for post Reviewed after AI
  const updateSpecification = async (postId, specId, updatedSpec) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const updatedSpecs = post.specs.map((spec) =>
            spec.id === specId
              ? {
                  ...spec,
                  Spec_Value_PL: updatedSpec.Spec_value_pl,
                  Spec_Value_SL: updatedSpec.Spec_value_sl,
                }
              : spec
          );
          return { ...post, specs: updatedSpecs };
        }
        return post;
      })
    );
  };

  const fetchPosts = useCallback(async (params) => {
    try {
      setLoadingFetchPosts(true);
      const response = await managementAPI.GetCars(params);
      setLoadingFetchPosts(false);
      setPosts(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const fetchCarsName = useCallback(async () => {
    setCarsNameListLoading(true);
    try {
      const res = await managementAPI.getInitCarData();
      setCarsNameList(res.data.combinedModelName);
    } catch (e) {
      console.log(e);
    } finally {
      setCarsNameListLoading(false);
    }
  }, []);

  const fetchCarsMakes = useCallback(async () => {
    setCarsMakesLoading(true);
    try {
      const res = await managementAPI.getCarMakes();
      setCarsMakesList(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setCarsMakesLoading(false);
    }
  }, []);

  const fetchCarsClass = useCallback(async (id) => {
    setCarsClassLoading(true);
    try {
      const res = await managementAPI.getClassByMakeId(id);
      setCarsClassList(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setCarsClassLoading(false);
    }
  }, []);

    const fetchCarsModel = useCallback(async (makeId, classId) => {
    setCarsModelLoading(true);
    try {
      const res = await managementAPI.getCarModels(makeId, classId);
      setCarsModelList(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setCarsModelLoading(false);
    }
  }, []);

  const fetchShowroomInitData = useCallback(async (id) => {
    try {
      const res = await ShowroomProfileAPI.getShowroomInitData(id);
      setShowroomInitData(res.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onSendToReview = async (data) => {
    const result = await Swal.fire({
      icon: "warning",
      title: `Post Review`,
      text: "Are you sure you want to send this post for review?",
      showConfirmButton: true,
      confirmButtonText: "Send Request",
      confirmButtonColor: "#34c38f",
      showCancelButton: true,
      cancelButtonText: "Close",
      cancelButtonColor: "#f46a6a",
    });

    if (result.isConfirmed) {
      try {
        Swal.showLoading();
        const response = await carAPI.postApprovalRequest(data);
        Swal.close();
        return response;
      } catch (error) {
        Swal.close();
        return { Code: "ERROR", Desc: error.message };
      }
    }
    return { Code: "CANCELLED" };
  };

  // Accept or Reject, ...
  const onChangePostStatus = async (data) => {
    const result = await Swal.fire({
      icon: `${data.state === "Approved" ? "success" : "error"}`,
      title: `${data.state} Post`,
      input: data.state === "Rejected" ? "text" : undefined,
      inputPlaceholder: "Enter reason for rejection",
      text: `Are you sure you want to ${data.state} this post?`,
      showConfirmButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "#34c38f",
      showCancelButton: true,
      cancelButtonText: "Close",
      cancelButtonColor: "#f46a6a",
      preConfirm: (value) => {
        if (data.state === "Rejected" && !value) {
          // ✅ match same property
          Swal.showValidationMessage("Please enter a value");
        }
        return value;
      },
    });

    if (result.isConfirmed) {
      try {
        Swal.showLoading();
        const response = await superAdminAPI.postChangeStatus({
          Post_ID: data.id,
          newStatus: data.state,
          reason: data.state === "Rejected" ? result.value : "",
        });
        Swal.close();
        return response;
      } catch (error) {
        Swal.close();
        return { Code: "ERROR", Desc: error.message };
      }
    }
    return { Code: "CANCELLED" };
  };

  const value = {
    posts,
    loadingFetchPosts,
    error,
    selectedPost,
    setSelectedPost,
    filters,
    setFilters,
    fetchPosts,
    fetchCarsName,
    showroomInitData,
    fetchShowroomInitData,
    carsNameList,
    carsNameListLoading,
    totalPages,
    setPostCreatedId,
    postCreatedId,
    setPostCreatedCode,
    postCreatedCode,
    getPostById: (id) => posts.find((post) => post.id === id),
    updateSpecification,
    onSendToReview,
    onChangePostStatus,
    // Car Makes
    fetchCarsMakes,
    carsMakesList,
    carsMakesLoading,

    // Car Class
    fetchCarsClass,
    carsClassList,
    carsClassLoading,
    setCarsClassList,

    // Cars Model
    fetchCarsModel,
    carsModelList,
    carsModelLoading,
    setCarsModelList
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
}

// Export the constants for direct impor
