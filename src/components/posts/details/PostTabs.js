import React from "react";

const PostTabs = ({ activeTab, setActiveTab, setModalOpen, setModalType, handle360Request }) => {

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
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
              },
              {
                id: "media",
                label: "Media Gallery",
                icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
              },
              {
                id: "offers",
                label: "Offers & Sales",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
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
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={tab.icon}
                  />
                </svg>
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
                <svg
                  className="h-4 w-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
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
                  className="h-4 w-4 mr-2"
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
            <div className="relative">
              <button
                onClick={() => {
                  
                  handle360Request()
                }}
                className="flex items-center bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors md:text-md text-sm md:px-4 px-1 py-2"
              >
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v5.586a1 1 0 00.293.707l5.414 5.414a1 1 0 00.707.293V19a2 2 0 002 2z"
                  />
                </svg>
                Request 360°
              </button>
            </div>
            
          </div>
        </div>
      </div>


    </div>
  );
};

export default PostTabs;
