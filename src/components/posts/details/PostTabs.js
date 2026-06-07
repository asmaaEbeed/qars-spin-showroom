import {
  CameraIcon,
  CheckCircleIcon,
  PaperAirplaneIcon,
  PlusIcon,
  RectangleStackIcon,
  Squares2X2Icon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, CurrencyDollarIcon, PauseCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import PostRequestMenu from "../PostRequestMenu";
import SelectCurrencyModal from "../../../pages/payment/SelectCurrencyModal";
import { usePaymentContext } from "../../../context/PaymentContext";
import { useHandlePostRequest } from "../hook/handlePostRequest";
import { useAuth } from "../../../context/AuthContext";
import { Menu } from "@headlessui/react";
import { POST_STATUS } from "../constants/post-constants";

const PostTabs = ({
  activeTab,
  setActiveTab,
  setModalOpen,
  setModalType,
  // handle360Request,
  handleAdd360,
  handleSendToReview,
  postStatus,
  role,
  handleChangePostStatus,
  currentPost,
}) => {
  const { user } = useAuth();
  const [selectCurrencyOpen, setSelectCurrencyOpen] = useState(false);
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  console.log(postStatus);

  const { onGetQarsServices } = usePaymentContext();
  const postId = currentPost?.postId;
  const { handleSubmitRequest } = useHandlePostRequest(setSelectCurrencyOpen);

  const handle360Request = async (type) => {
    // Get All Service Price
    try {
      const res = await onGetQarsServices();
      console.log(res);
      sessionStorage.setItem("postCode", currentPost?.postCode);
      handleSubmitRequest(type, postId, res.request360Price, res.request360Id);
    } catch (e) {
      console.log(e);
    }
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
              {user.role !== "superAdmin" && (
                <PostRequestMenu
                  currentPost={currentPost}
                  setSelectCurrencyOpen={setSelectCurrencyOpen}
                />
              )}
            </div>

{/* Not superAdmin: Request 360 */}
            {role !== "superAdmin" && (
              <div className="relative">
                <button
                  onClick={() => {
                    handle360Request("Request 360 Photo Session");
                  }}
                  className="flex items-center bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors md:text-md text-sm md:px-4 px-1 py-2"
                >
                  <CameraIcon className="h-6 w-6 mx-1" />
                  Request 360°
                </button>
              </div>
            )}

            {/* Super Admin Add 360 */}
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

            {postStatus === POST_STATUS.DRAFT && (
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
            {postStatus === POST_STATUS.PENDING_APPROVAL && role === "superAdmin" && (
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
            {postStatus === POST_STATUS.PENDING_APPROVAL && role === "superAdmin" && (
              <div>
                <Menu>
                  <Menu.Button
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   e.stopPropagation();
                    //   handleChangePostStatus("Rejected");
                    // }}
                    className="flex items-center bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors md:text-md text-sm md:px-4 px-1 py-2"
                    title="Reject post"
                  >
                    <XCircleIcon className="h-6 w-6" />
                    Reject
                    <ChevronDownIcon className="h-6 w-6" />
                  </Menu.Button>
                  <Menu.Items
                    transition
                    anchor="bottom end"
                    className={`min-w-52 origin-top-right absolute shadow-md right-0 bg-white rounded-xl border  p-1 text-sm/6 text-gray-800 z-50 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 top-16`}
                  >
                    <Menu.Item>
                      <button
                        className="group hover:bg-red-500/10 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleChangePostStatus("Rejected");
                        }}
                      >
                        Reject
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        className="group hover:bg-red-500/10 flex w-full items-center  gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleChangePostStatus("Rejected Permanently");
                        }}
                      >
                        Rejected Permanently
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            )}

            {postStatus === POST_STATUS.APPROVED && (
              <div className="relative">
                <Menu>
                  <Menu.Button
                    
                    className="p-2 bg-red-600 text-white hover:bg-red-600 hover:text-white rounded-lg transition-colors flex items-center gap-2"
                    title="Suspend post"
                  >
                    <PauseCircleIcon className="h-6 w-6" /> 
                    <span>Suspend</span> <ChevronDownIcon className="h-6 w-6" />
                  </Menu.Button>
                  <Menu.Items
                    transition
                    anchor="bottom end"
                    className={`min-w-52 origin-top-right absolute shadow-md right-0 bg-white rounded-xl border  p-1 text-sm/6 text-gray-800 z-50 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 top-10`}
                  >
                    <Menu.Item>
                      <button
                        className="group hover:bg-red-500/10 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleChangePostStatus(
                            //post.postId,
                            POST_STATUS.SUSPENDED,
                          );
                        }}
                      >
                        Suspend
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        className="group hover:bg-red-500/10 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleChangePostStatus(
                            //post.postId,
                            POST_STATUS.SUSPENDED_PERMANENTLY,
                          );
                        }}
                      >
                        Suspend Permanently
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            )}
          </div>
        </div>
      </div>
      {selectCurrencyOpen && (
        <SelectCurrencyModal
          open={selectCurrencyOpen}
          setOpen={setSelectCurrencyOpen}
        />
      )}
    </div>
  );
};

export default PostTabs;
