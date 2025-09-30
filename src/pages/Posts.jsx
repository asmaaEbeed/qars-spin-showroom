import React, { useState, useEffect } from "react";
import { usePosts } from "../context/PostsContext";
import MainLayout from "../components/layout/MainLayout";
import PostCard from "../components/posts/PostCard";
import PostSearch from "../components/posts/PostSearch";
import PostPageHeader from "../components/posts/PostPageHeader";
import PostCreateEditModal from "../components/posts/PostCreateEditModal";

const Posts = () => {
  const {
    loadingFetchPosts,
    posts,
    fetchPosts,
    error,
    filters,
    setFilters,
    totalPages,
    setPostCreatedId,
    setPostCreatedCode,
  } = usePosts();

  const [showModal, setShowModal] = useState(false);
  // const [selectedPost, setSelectedPost] = useState(null);

  // Reviewed
  const [postsList, setPostsList] = useState([]);
  const [filtersClearData, setFiltersClearData] = useState(false);
  // For Pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [editModalData, setEditModalData] = useState(null);


  useEffect(() => {
    setPostsList(posts)
  }, [posts])

  useEffect(() => {
    const params = {
      ...filters,
      partnerId: localStorage.getItem("partnerId"),
      PageNumber: pageNumber,
      PageSize: pageSize,
      // status: "Approved",
    };
    fetchPosts(params);
  }, [pageNumber]);

  const handleFilterChange = async (newFilters) => {
    setPageNumber(1)
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));

    const params = {
      partnerId: localStorage.getItem("partnerId"),
      // status: "Approved",
      SearchType: newFilters.searchBy,
      SearchTerm: newFilters.searchTerm,
      Status: newFilters.status,
      PinToTop: newFilters.pinToTop ? 1 : 0,
      SortBy: newFilters.sortBy,
    };
    fetchPosts(params)

  };


  const handleDeletePost = async (postId) => {
    alert(postId)
  };

  const clearFilters = () => {
    setFiltersClearData(true)
    const params = {
      partnerId: localStorage.getItem("partnerId"),
      status: "Approved",
      PageNumber: pageNumber,
    };
    fetchPosts(params)
  };


  const handlePrev = () => {
    if (pageNumber > 1) setPageNumber((prev) => prev - 1);
  };

  const handleNext = () => {
    if (pageNumber < totalPages) setPageNumber((prev) => prev + 1);
  };
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-indigo-50">
        {/* Header Section */}
        <PostPageHeader setShowModal={setShowModal} />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 lg:sticky lg:top-32 overflow-hidden">
                <div className="px-4 py-3 border-b border-secondary-100">
                  <div className="flex items-center">
                    <div className="h-6 w-6 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center mr-2">
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-sm font-semibold text-secondary-800">
                      Search & Filter
                    </h2>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <PostSearch
                    onFilterChange={handleFilterChange}
                    // onSortChange={handleSortChange}
                    filtersClearData={filtersClearData}
                    setFiltersClearData={setFiltersClearData}
                  />
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="lg:col-span-3">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
                {/* Grid Header */}
                <div className="px-6 py-4 border-b border-secondary-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-secondary-800">
                      Car Listings
                    </h2>
                    <div className="flex items-center space-x-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {postsList.length}{" "}
                        {postsList.length === 1 ? "listing" : "listings"}{" "}
                        found
                      </span>
                      {filters && Object.keys(filters).length > 0 && (
                        <button
                          onClick={() => clearFilters()}
                          className="text-xs text-secondary-500 hover:text-secondary-700 underline"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                  {loadingFetchPosts ? (
                    <div className="flex flex-col items-center justify-center py-20">
                      <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200"></div>
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent absolute top-0"></div>
                      </div>
                      <p className="mt-6 text-lg font-medium text-secondary-600">
                        Loading car listings...
                      </p>
                      <p className="text-secondary-500">
                        Please wait while we fetch your data
                      </p>
                    </div>
                  ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20">
                      <div className="h-16 w-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
                        <svg
                          className="h-8 w-8 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold text-red-600 mb-2">
                        Oops! Something went wrong
                      </p>
                      <p className="text-secondary-500 text-center">{error}</p>
                    </div>
                  ) : postsList.length === 0 && !filtersClearData ? (
                    <div className="flex flex-col items-center justify-center py-20">
                      <div className="h-20 w-20 bg-secondary-100 rounded-2xl flex items-center justify-center mb-6">
                        <svg
                          className="h-10 w-10 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-secondary-700 mb-2">
                        No car listings found
                      </h3>
                      <p className="text-secondary-500 mb-6 text-center">
                        {filters && Object.keys(filters).length > 0
                          ? "Try adjusting your search filters or clear all filters to see more results"
                          : "Start by creating your first car listing to showcase your vehicles"}
                      </p>
                      <button
                        onClick={() => {
                          setShowModal(true);
                        }}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        <svg
                          className="mr-2 h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Create First Listing
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="">
                        {postsList.map((post, i) => (
                          <PostCard
                            key={i}
                            post={post.car}
                            onDelete={handleDeletePost}
                            onEdit={() => {
                              setShowModal(true);
                              setEditModalData(post.car)
                            }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-center items-center gap-2 mt-4">
                        <button
                          onClick={handlePrev}
                          disabled={pageNumber === 1 }
                          className="text-sm px-3 py-1 rounded-2xl disabled:opacity-50 bg-primary-100 text-primary-800 disabled:cursor-not-allowed hover:bg-primary-200 transition-all duration-200"
                        >
                          ← Prev
                        </button>

                        <span className="px-3 py-1">
                          Page {pageNumber} of {totalPages}
                        </span>

                        <button
                          onClick={handleNext}
                          disabled={pageNumber === totalPages}
                          className="text-sm px-3 py-1 rounded-2xl disabled:opacity-50 bg-primary-100 text-primary-800 disabled:cursor-not-allowed hover:bg-primary-200 transition-all duration-200"
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <PostCreateEditModal
            onClose={() => {
              setShowModal(false);
              setEditModalData(null);
              setPostCreatedId("");
              setPostCreatedCode("");
            }}
            post={editModalData}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Posts;
