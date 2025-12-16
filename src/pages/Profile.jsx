import { useState, useEffect, useCallback } from "react";
import MainLayout from "../components/layout/MainLayout";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTabOverview from "../components/profile/ProfileTabOverview";
import MediaTab from "../components/profile/MediaTab";
// import ProfileTabSettings from "../components/profile/UserSettings";
import { AdminPartnerAPI, ShowroomProfileAPI } from "../services/api";
import { useParams } from "react-router-dom";
import SelectShowroomHint from "../components/adminHint/SelectShowroomHint";
import { useAuth } from "../context/AuthContext";
import LoadingState from "../components/common/LoadingState";
import PortalUsersTab from "../components/profile/PortalUsersTab";
import { BiEdit } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { FiAlertCircle } from "react-icons/fi";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { CheckBadgeIcon } from "@heroicons/react/16/solid";
import { GrStar, GrStarOutline } from "react-icons/gr";

const PARTNER_STATUS = [
  { value: "Approved", color: "green", icon: <CheckCircleIcon className={`w-4 h-4 text-green-500`} /> },
  { value: "Under Preparation", color: "primary", icon: <FiAlertCircle className={`w-4 h-4 text-primary-500`} /> },
  { value: "Waiting Approval", color: "blue", icon: <ClockIcon className={`w-4 h-4 text-blue-500`} /> },
  { value: "Suspended", color: "red", icon: <XCircleIcon className={`w-4 h-4 text-red-500`} /> }
]


const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const { id } = useParams();

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  const fetchProfileDetails = useCallback(async () => {
    setLoading(true);
    try {
      if (user.role === "superAdmin") {
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
  }, [id, user]);
  useEffect(() => {

    if (profileData === null && user.userId !== null) {
      fetchProfileDetails();
    }
  }, [user, profileData, fetchProfileDetails]);


  if (loading)
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-indigo-50">
          <div className=" bg-gradient-to-br from-primary-50 via-white to-indigo-50 flex items-center justify-center">
            <div className="text-center h-[calc(100vh-100px)] flex flex-col items-center justify-center">
              <LoadingState title="Profile" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  if (user.role === "superAdmin") {
    if (!id || id === "undefined") return (<SelectShowroomHint />)
  }

  const handleChangeStatus = async (status) => {
    if (profileData.partnerStatus === status) return;
    const body = {
      status: status,
      statusMessage: "Data Entry / Modify Phase"
    }
    try {
      Swal.fire({
        title: `Are you sure to ${status} this showroom?`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {

            const res = await AdminPartnerAPI.editShowRoomStatus(id, body);
            if (res.status === 200) {
              toast.success(res.data.message || "Status updated successfully");
              fetchProfileDetails();
            }
          } catch (error) {
            toast.error(error.response.data.title || "Something went wrong");
          }
        }
      })
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  const handleFeatureChange = async () => {
    try {
      const body = {
        "partnerId": id,
        "pin_To_Top": !profileData?.isFeatured
      }
      Swal.fire({
        title: `Are you sure to ${profileData.isFeatured ? "unfeature" : "feature"} this showroom?`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {

            const res = await AdminPartnerAPI.editPartnerFeature(body);
            if (res.status === 200) {
              toast.success(res.data.message || "Feature updated successfully");
              setProfileData({ ...profileData, isFeatured: !profileData?.isFeatured });
            }
          } catch (error) {
            toast.error(error.response.data.title || "Something went wrong");
          }
        }
      })
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-indigo-50">

        {profileData && <ProfileHeader partner={profileData} isEditable={true} />}

        {/* Tabs Navigation */}
        <div className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-white/20 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 ">
            <nav className="flex space-x-1 bg-primary-50 rounded-xl p-1 my-4 justtify-self-center lg:justify-self-start">
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
                  <span className="whitespace-nowrap">Media & 360</span>
                </div>
              </button>
              {
                user.role === "superAdmin" && <button
                  onClick={() => handleTabSelect('portalUser')}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'portalUser'
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-secondary-700 hover:bg-primary-600 hover:shadow-sm'
                    }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="whitespace-nowrap">Portal Users</span>
                  </div>
                </button>
              }

            </nav>
            {user.role === "superAdmin" && <div className="my-4  flex gap-2 items-center justify-self-end">
              <button className={`relative flex items-center font-semibold rounded-lg transition-colors md:text-md text-sm md:px-4 px-1 py-2 ${profileData?.isFeatured ? " bg-gradient-to-l from-amber-300 to-amber-600 text-amber-800" : "text-gray-700 bg-gray-200 hover:bg-gray-300"}`} title="click to change feature state" onClick={handleFeatureChange}>
                {profileData?.isFeatured ? <GrStar className={`h-6 w-6 mr-1 text-amber-800`} /> :
                  <GrStarOutline className={`h-5 w-5 mr-1 text-gray-600`} />}

                <span className="text-sm">{profileData?.isFeatured ? "Featured" : "Feature Now"}</span>
              </button>
              <div className="relative group">
                <button
                  className="relative flex items-center text-green-700 bg-green-100  rounded-lg hover:bg-green-200 transition-colors md:text-md text-sm md:px-4 px-1 py-2"
                >
                  <BiEdit className="h-6 w-6 mr-1" />
                  Edit Status
                  <IoMdArrowDropdown className="w-4 h-4" />
                  <div className="absolute text-left z-10 top-10 right-0 bg-white rounded-lg shadow-lg hidden group-hover:block min-w-full">
                    <ul className="py-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 text-sm text-secondary-700">

                      {PARTNER_STATUS.map((status) => <li
                        key={status.value}
                        className={`flex justify-between items-center gap-2 px-4 py-2.5 cursor-pointer hover:bg-${status.color}-50 hover:text-${status.color}-600 transition ${status.value === "Suspended" && "bg-red-100 hover:bg-red-300"} border-b`}
                        onClick={() => handleChangeStatus(status.value)}
                      >
                        <div className="flex items-center gap-2">
                          {status.icon}
                          <span>{status.value}</span>
                        </div>
                        {profileData?.partnerStatus === status.value && <CheckBadgeIcon className={`w-5 h-5 text-green-500`} />}
                      </li>)}

                    </ul>

                  </div>
                </button>
              </div>

            </div>
            }
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
          {activeTab === 'portalUser' && (
            <PortalUsersTab partner={profileData} />
          )}

        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;