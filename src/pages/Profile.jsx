import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTabOverview from "../components/profile/ProfileTabOverview";
import MediaTab from "../components/profile/MediaTab";
// import ProfileTabSettings from "../components/profile/UserSettings";
import { ShowroomProfileAPI } from "../services/api";
import { useParams } from "react-router-dom";
import SelectShowroomHint from "../components/adminHint/SelectShowroomHint";
import { useAuth } from "../context/AuthContext";


const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const { id } = useParams();

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchProfileDetails = async () => {
      setLoading(true);
      try {
        if (localStorage.getItem("role") === "superAdmin") {
          if (id !== "undefined") {
            const res = await ShowroomProfileAPI.getDetails(id);
            setProfileData(res.data);
          }
        } else {
          const res = await ShowroomProfileAPI.getDetails(user.partnerId);
          setProfileData(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (profileData === null && user.userId !== null) {
      fetchProfileDetails();
    }
  }, [id, profileData, user]);




  // if (error) {
  //   return (
  //     <MainLayout>
  //       <div className="flex items-center justify-center min-h-screen">
  //         <div className="text-center p-6 max-w-md mx-auto bg-red-50 rounded-xl shadow-md">
  //           <div className="text-red-500 text-4xl mb-4">⚠️</div>
  //           <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Profile</h2>
  //           <p className="text-gray-600 mb-4">{error}</p>
  //           <button
  //             onClick={refreshProfileData}
  //             className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
  //           >
  //             Retry
  //           </button>
  //         </div>
  //       </div>
  //     </MainLayout>
  //   );
  // }

  if (loading)
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-indigo-50">
          <div className=" bg-gradient-to-br from-primary-50 via-white to-indigo-50 flex items-center justify-center">
            <div className="text-center h-[calc(100vh-100px)] flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
              <p className="text-lg font-medium text-secondary-600">
                Loading car specifications...
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  if (localStorage.getItem("role") === "superAdmin") {
    if (!id || id === "undefined") return (<SelectShowroomHint />)

  }
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-indigo-50">

        {profileData && <ProfileHeader partner={profileData} isEditable={true} />}

        {/* Tabs Navigation */}
        <div className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-white/20 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex space-x-1 bg-primary-50 rounded-xl p-1 max-w-md mx-auto my-4">
              <button
                onClick={() => handleTabSelect('overview')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'overview'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-secondary-700 hover:bg-primary-600 hover:shadow-sm'
                  }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Overview</span>
                </div>
              </button>
              <button
                onClick={() => handleTabSelect('media')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'media'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-secondary-700 hover:bg-primary-600 hover:shadow-sm'
                  }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Media & 360</span>
                </div>
              </button>

            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {activeTab === 'overview' && profileData && (
            <ProfileTabOverview partner={profileData} />
          )}
          {activeTab === 'media' && (
            <MediaTab partner={profileData} />
          )}

        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;