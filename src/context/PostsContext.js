import React, { createContext, useContext, useState, useEffect } from "react";
import Car01 from "../assets/images/car-01.jpg";
import Car02 from "../assets/images/car-02.jpg";
import Car03 from "../assets/images/car-03.jpg";
import Car04 from "../assets/images/car-04.jpeg";
import Car05 from "../assets/images/car-05.jpg";
import { managementAPI } from "../services/api";
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
  const [postCreatedId, setPostCreatedId] = useState("")
  const [postCreatedCode, setPostCreatedCode] = useState("")

  // Update Specification for post Reviewed after AI
  const updateSpecification = async (postId, specId, updatedSpec) => {
    // We Will use next function to update spec in database
    // const res = await updatePostSpec({
    //   Display_Order: "",      //Didn't use it
    //   Spec_Value_PL: updatedSpec.Spec_value_pl,
    //   Spec_Value_SL: updatedSpec.Spec_value_sl,
    //   Post_ID: postId,
    //   Spec_ID: specId,
    // });
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
    setCarsNameListLoading(true)
    try {
      const res = await managementAPI.getInitCarData()
        setCarsNameList(res.data.combinedModelName);
    } catch(e) {
      console.log(e);
    } finally {
      setCarsNameListLoading(false)
    }
  }

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
