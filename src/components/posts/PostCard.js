import React from "react";
import { ClockIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import PlaceHolderImage from "../../assets/images/placeholder-car.jpg";

const PostCard = ({ post, onDelete, onEdit }) => {
  const statusColors = {
    Approved: {
      bg: "bg-green-50",
      text: "text-green-800",
      border: "border-green-200",
    },
    Pending: {
      bg: "bg-yellow-50",
      text: "text-yellow-800",
      border: "border-yellow-200",
    },
    Rejected: {
      bg: "bg-red-50",
      text: "text-red-800",
      border: "border-red-200",
    },
    Draft: {
      bg: "bg-gray-50",
      text: "text-gray-800",
      border: "border-gray-200",
    },
  };

  const status = post.status || "Draft";
  const statusStyle = statusColors[status] || statusColors.Draft;

  return (
    <Link
      to={`/showroom/posts/${post.postCode}`}
      className="block mb-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      <div className="flex md:flex-row flex-col w-full">
        {/* Image Section */}
        <div className="relative md:max-w-60 max-w-full bg-gray-100">
          <img
            src={post.rectangleImageUrl || PlaceHolderImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex flex-col space-y-1">
            <p
              className={`${
                post.postStatus === "Approved"
                  ? "bg-green-50 text-green-800 border-green-500"
                  : post.postStatus === "Pending"
                  ? "bg-yellow-50 text-yellow-800 border-yellow-200"
                  : post.postStatus === "Rejected"
                  ? "bg-red-50 text-red-800 border-red-200"
                  : "bg-gray-50 text-gray-800 border-gray-200 "
              } px-3 py-1 rounded-full text-xs min-w-20 text-center ${
                statusStyle.bg
              } ${statusStyle.text} ${statusStyle.border}`}
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

            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit(e);
                }}
                className="p-2  text-primary-600 bg-primary-50 hover:bg-primary-600 hover:text-white rounded-full transition-colors"
                title="Edit post"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
              {/* <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(post.postId);
                }}
                className="p-2 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-full transition-colors"
                title="Delete post"
              >
                <TrashIcon className="h-4 w-4" />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
