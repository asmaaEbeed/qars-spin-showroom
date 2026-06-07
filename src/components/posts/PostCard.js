import {
  ClockIcon,
  PencilIcon,
  // TrashIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import PlaceHolderImage from "../../assets/images/placeholder-car.jpg";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { usePosts } from "../../context/PostsContext";
import { Menu } from "@headlessui/react";
import { POST_STATUS, QARS_SPIN_PARTNER_ID } from "./constants/post-constants";
import qarsSpinLogo from "../../assets/images/logo/Logo.svg";
import { PauseCircleIcon, TrashIcon } from "@heroicons/react/24/solid";

const statusColors = {
  Approved: {
    bg: "bg-emerald-200",
    text: "text-emerald-800",
    border: "border-emerald-200",
  },
  "Pending Approval": {
    bg: "bg-yellow-200",
    text: "text-yellow-800",
    border: "border-yellow-200",
  },
  Rejected: {
    bg: "bg-red-50",
    text: "text-red-800",
    border: "border-red-200",
  },
  "Rejected Permanently": {
    bg: "bg-red-800",
    text: "text-white",
    border: "border-red-800",
  },
  Draft: {
    bg: "bg-gray-200",
    text: "text-gray-800",
    border: "border-gray-400",
  },
};

const PostCard = ({
  post,
  onDelete,
  onEdit,
  handleStatusChange,
  handleChangePostStatus,
}) => {
  const { user } = useAuth();
  const { onSendToReview } = usePosts();
  const { id } = useParams();

  const status = post.postStatus || "Draft";
  const statusStyle = statusColors[status] || statusColors.Draft;

  const handleSendToReview = async () => {
    const response = await onSendToReview({
      UserName: user.userName,
      Post_ID: post.postId,
    });
    if (response.Code === "OK") {
      toast.success(response.Desc);
      handleStatusChange(post.postId, "Pending Approval");
    } else if (response.Code !== "CANCELLED") {
      toast.error("Failed to send post to review");
    }
  };
  const isDisabled = post.postStatus && post.postStatus.includes("Permanently");

  const route = isDisabled
    ? "#"
    : `${id ? `/admin/dealer/${id}` : ""}/showroom/posts/${post.postCode}`;

  const source_Kind_label = {
    Individual: "bg-blue-600 text-blue-50 border-blue-500",
    Partner: "bg-primary-600 text-primary-50 border-primary-500",
    "Qars Spin": "bg-white border-2 border-primary-500 text-primary-50",
    [QARS_SPIN_PARTNER_ID]:
      "bg-white border-2 border-primary-500 border-r-0 text-primary-50",
  };

  return (
    <Link
      to={route}
      className={`block mb-3 rounded-xl  shadow-sm border border-gray-100 transition-all duration-200 ${isDisabled ? "pointer-events-none bg-gray-50" : "bg-white hover:shadow-md"}`}
      aria-disabled={isDisabled}
    >
      <div className="flex md:flex-row flex-col w-full">
        {/* Image Section */}
        <div className="relative md:max-w-48 overflow-hidden max-w-full bg-gray-100 rounded-tl-xl">
          <img
            src={post.rectangleImageUrl || PlaceHolderImage}
            alt={post.title}
            className="h-full object-cover max-height-[205px] w-[300px]"
          />
          <div className="absolute top-3 left-3 flex flex-col space-y-1">
            <p
              className={`px-3 py-1 rounded-full text-xs min-w-20 text-center border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
            >
              {post.postStatus}
            </p>
            <p
              className={`text-center px-3 py-1 rounded-full min-w-20 text-xs ${
                post.isSold
                  ? "bg-red-800 text-red-50 border-red-200"
                  : "bg-green-600 text-green-50 border-green-500"
              }`}
            >
              {post.isSold ? "Sold" : "Available"}
            </p>
          </div>
          <div className="absolute bottom-2 right-0 flex flex-col space-y-1 tracking-wider">
            {!id && !user.partnerId && (
              <div
                className={`text-center px-3 py-1 rounded-l-full min-w-20 text-xs ${
                  source_Kind_label[post.sourceKind]
                } ${post.partnerId === QARS_SPIN_PARTNER_ID && source_Kind_label[QARS_SPIN_PARTNER_ID]}`}
              >
                {post.sourceKind === "Qars Spin" ||
                post.partnerId === QARS_SPIN_PARTNER_ID ? (
                  <img
                    src={qarsSpinLogo}
                    alt={`${post.sourceKind} logo`}
                    className="h-5  w-auto"
                  />
                ) : (
                  post.sourceKind
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="px-4 py-2 w-full">
          {/* Title and Category */}
          <div className="mb-3">
            <div className="flex justify-between space-x-2">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {post.carNameWithYearPl}
              </h3>
              <p className="text-sm font-medium text-gray-900">
                {post.categoryNamePl}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <p className="text-xs text-gray-500">Post Code</p>
              <p className="text-sm font-medium text-gray-900">
                {post.postCode}
              </p>
            </div>
          </div>

          {/* Price and Mileage */}
          <div className="grid  md:grid-cols-4 grid-cols-2 gap-4 mb-2">
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div>
                  <p className="text-xs text-gray-500">Mileage</p>
                  <p className="text-sm font-medium text-gray-900">
                    {post.mileage
                      ? `${post.mileage.toLocaleString()} km`
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-sm font-medium text-gray-900">
                    {post.ownerName}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div>
                  <p className="text-xs text-gray-500">Mobile</p>
                  <p className="text-sm font-medium text-gray-900">
                    {post.ownerMobile}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="text-sm font-medium text-gray-900">
                    QAR {post.askingPrice?.toLocaleString() || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <div>
              <div className="flex items-center text-sm text-gray-500">
                <ClockIcon className="h-4 w-4 mr-1" />
                Created Date:
                <span className="ml-3">
                  {new Date(post.createdDateTime).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500 my-2">
                <ClockIcon className="h-4 w-4 mr-1" />
                Expiration Date:
                <span className="ml-3">
                  {new Date(post.expirationDate).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {!isDisabled && (
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit(e);
                  }}
                  className="p-3 h-10  w-10 text-white bg-primary-400 hover:bg-primary-600 hover:text-white rounded-full transition-colors"
                  title="Edit post"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                {post.postStatus === "Draft" && user.role !== "superAdmin" && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSendToReview();
                    }}
                    className="p-2 bg-blue-500 text-white text-center hover:bg-blue-700 hover:text-white rounded-full transition-colors font-bold"
                    title="Send to review"
                  >
                    <PaperAirplaneIcon className="h-6 w-6" />
                  </button>
                )}
                {(post.postStatus === "Pending Approval" ||
                  post.postStatus === "Draft") &&
                  user.role === "superAdmin" && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleChangePostStatus(post.postId, "Approved");
                      }}
                      className="p-2 bg-green-600 text-white hover:bg-green-600 hover:text-white rounded-full transition-colors font-bold"
                      title="Approve post"
                    >
                      <CheckCircleIcon className="h-6 w-6" />
                    </button>
                  )}
                {(post.postStatus === "Pending Approval" ||
                  post.postStatus === "Draft") &&
                  user.role === "superAdmin" && (
                    <div
                      className="relative z-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                    >
                      <Menu>
                        <Menu.Button
                          className="p-2 bg-red-600 text-white hover:bg-red-600 hover:text-white rounded-full transition-colors font-bold"
                          title="Reject post"
                          type="button"
                        >
                          <XCircleIcon className="h-6 w-6" />
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
                                handleChangePostStatus(post.postId, "Rejected");
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
                                handleChangePostStatus(
                                  post.postId,
                                  "Rejected Permanently",
                                );
                              }}
                            >
                              Rejected Permanently
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    </div>
                  )}
                {post.postStatus === POST_STATUS.APPROVED && (
                  <div className="relative">
                    <Menu>
                      <Menu.Button
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   e.stopPropagation();
                        //   onDelete(post.postId);
                        // }}
                        className="p-2 bg-red-600 text-white hover:bg-red-600 hover:text-white rounded-full transition-colors font-bold"
                        title="Suspend post"
                      >
                        <PauseCircleIcon className="h-6 w-6" />
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
                                post.postId,
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
                                post.postId,
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
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
