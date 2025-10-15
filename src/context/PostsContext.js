import React, { createContext, useContext, useState } from "react";
import { carAPI, managementAPI, superAdminAPI } from "../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
// Post kind constants

const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loadingFetchPosts, setLoadingFetchPosts] = useState(false);
  const [error, setError] = useState("");
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
  const [postLogs, setPostLogs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [postCreatedId, setPostCreatedId] = useState("");
  const [postCreatedCode, setPostCreatedCode] = useState("");

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

  const fetchPosts = async (params) => {
    try {
      setLoadingFetchPosts(true);
      const response = await managementAPI.GetCars(params);
      setLoadingFetchPosts(false);
      setPosts(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCarsName = async () => {
    setCarsNameListLoading(true);
    try {
      const res = await managementAPI.getInitCarData();
      setCarsNameList(res.data.combinedModelName);
    } catch (e) {
      console.log(e);
    } finally {
      setCarsNameListLoading(false);
    }
  };

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
      input: data.state === "Rejected" ? 'text' : undefined,
      inputPlaceholder: "Enter reason for rejection",
      text: `Are you sure you want to ${data.state} this post?`,
      showConfirmButton: true,
      confirmButtonText: "Confirm",
      confirmButtonColor: "#34c38f",
      showCancelButton: true,
      cancelButtonText: "Close",
      cancelButtonColor: "#f46a6a",
      preConfirm: (value) => {
        if (data.state === "Rejected" && !value) {   // ✅ match same property
          Swal.showValidationMessage('Please enter a value');
        }
        return value;
      }
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
    postLogs,
    notifications,
    fetchPosts,
    fetchCarsName,
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
