import {
  CameraIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CheckCircleIcon,
  PaperAirplaneIcon,
  PlusIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import React from "react";

const PostTabs = ({
  activeTab,
  setActiveTab,
  setModalOpen,
  setModalType,
  handle360Request,
  handleAdd360,
  handleSendToReview,
  postStatus,
  role,
  handleChangePostStatus,
}) => {
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-white/20 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto md:px-6 px-4">
        <div className="flex lg:flex-row flex-col items-center justify-between py-4">
          <nav className="flex md:flex-row flex-col md:w-auto w-full space-x-1 bg-primary-50 rounded-xl p-1 md:mb-0 mb-2">
            {[
              {
                id: "overview",
                label: "Overview",
                icon: <Squares2X2Icon className="h-6 w-6 px-1" />,
              },
              {
                id: "media",
                label: "Media Gallery",
                icon: <RectangleStackIcon className="h-6 w-6 px-1" />,
              },
              {
                id: "offers",
                label: "Offers & Sales",
                icon: <CurrencyDollarIcon className="h-6 w-6 px-1" />,
              },
              // {
              //   id: "compare",
              //   label: "Compare",
              //   icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
              // },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center px-2 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-primary-500 text-white shadow-md"
                    : "text-secondary-700 hover:bg-white hover:shadow-sm"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1 lg:border-t-0 border-t lg:py-0 py-2  lg:mt-0 mt-2">
            <div className="relative">
              <button
                onClick={() => {
                  setModalType("requests");
                  setModalOpen(true);
                }}
                className="flex items-center bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors md:text-md text-sm md:px-4 px-1 py-2"
              >
                <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 mr-1" />
                Requests
              </button>
            </div>
            {/* <div className="relative">
              <button
                onClick={() => {
                  setModalType("status");
                  setModalOpen(true);
                }}
                className="flex items-center bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors md:text-md text-sm md:px-4 px-1 py-2"
              >
                <svg
                  className="h-6 w-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Status
              </button>
            </div> */}

            {role !== "superAdmin" && <div className="relative">
              <button
                onClick={() => {
                  handle360Request();
                }}
                className="flex items-center bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors md:text-md text-sm md:px-4 px-1 py-2"
              >
                <CameraIcon className="h-6 w-6 mx-1" />
                Request 360°
              </button>
            </div>}
            {role === "superAdmin" && (
              <div className="relative">
                <button
                  onClick={() => {
                    handleAdd360();
                  }}
                  className="flex relative items-center bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors md:text-md text-sm md:px-4 px-1 py-2"
                >
                  <CameraIcon className="h-6 w-6 mx-1" />
                  <PlusIcon className="h-3 w-3 text-green-700 absolute  bg-green-100 rounded-full hover:bg-green-200 " />
                  Add 360°
                </button>
              </div>
            )}

            {postStatus === "Draft" && (
              <div className="relative">
                <button
                  onClick={() => {
                    handleSendToReview();
                  }}
                  className="flex items-center bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors md:text-md text-sm md:px-4 px-1 py-2"
                >
                  <PaperAirplaneIcon className="h-6 w-6 mx-1" />
                  Send to Review
                </button>
              </div>
            )}
            {postStatus === "Pending Approval" && role === "superAdmin" && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleChangePostStatus("Approved");
                }}
                className="flex items-center bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors md:text-md text-sm md:px-4 px-1 py-2"
                title="Approve post"
              >
                <CheckCircleIcon className="h-6 w-6" />
                Approve
              </button>
            )}
            {postStatus === "Pending Approval" && role === "superAdmin" && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleChangePostStatus("Rejected");
                }}
                className="flex items-center bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors md:text-md text-sm md:px-4 px-1 py-2"
                title="Reject post"
              >
                <XCircleIcon className="h-6 w-6" />
                Reject
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostTabs;
