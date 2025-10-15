import React, { useState } from "react";
import PostSpecifications from "./PostSpecifications";
import PublishedOverview from "./post-overview-components/PublishedOverview";
import InternalInformation from "./post-overview-components/InternalInformation";
import PostCreateEditModal from "../PostCreateEditModal";
import { usePosts } from "../../../context/PostsContext";
// import InternalInfoModal from "../InternalInfoModal";

const PostOverview = ({
  currentPost = null,
  setModalOpen,
  setModalType,
  setSelectedCover,
}) => {
  const [postFormModal, setPostFormModal] = useState(false);
 

  const [activeTab, setActiveTab] = useState("Published OverView");
  const { setPostCreatedCode, setPostCreatedId } = usePosts();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Car Information */}
      <div className="lg:col-span-2">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-500/10 to-indigo-500/10 px-6 py-4 border-b border-secondary-100">
            <div className="flex md:flex-row flex-col md:w-auto w-full items-center justify-between">
              <h2 className="text-xl font-bold text-secondary-800">
                Car Information
              </h2>
              <div className="flex space-x-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setSelectedCover(file);
                        // Open modal to confirm upload
                        setModalType("uploadCover");
                        setModalOpen(true);
                      }
                    }}
                    className="hidden"
                    id="cover-upload"
                  />
                  <label
                    htmlFor="cover-upload"
                    className="h-full px-3 py-1.5 text-xs bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors cursor-pointer"
                  >
                    Upload Cover
                  </label>
                </div>
                <button
                disabled={currentPost === null}
                  onClick={() => setPostFormModal(true)}
                  className="h-full px-3 py-1.5 text-xs bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                >
                  Modify Published Info
                </button>
                {/* <button
                  onClick={() => setInternalInfoModal(true)}
                  className="px-3 py-1.5 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                  Modify Internal Info
                </button> */}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="gap-8">
              <nav className="flex space-x-1 p-1 mb-3">
                {["Published OverView", "Internal Information"].map(
                  (tab, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab(tab)}
                      className={`flex items-center px-2 py-2 text-md font-medium transition-all ${
                        activeTab === tab
                          ? " text-primary-700  border-b-2 border-primary-700"
                          : "text-secondary-700 hover:bg-white hover:shadow-sm"
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </nav>
              {/* Published Information */}
              {activeTab === "Published OverView" && (
                <PublishedOverview currentPost={currentPost} />
              )}

              {/* Internal Information */}
              {activeTab === "Internal Information" && (
                <InternalInformation currentPost={currentPost} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Specs */}
      <PostSpecifications currentPost={currentPost} />
      {postFormModal && (
        <PostCreateEditModal
          onClose={() => {setPostFormModal(false); setPostCreatedId(""); setPostCreatedCode("");}}
          post={currentPost}
        />
      )}

      {/* {internalInfoModal && (
        <InternalInfoModal post={currentPost} onClose={() => setInternalInfoModal(false)} />
      )} */}
    </div>
  );
};

export default PostOverview;
