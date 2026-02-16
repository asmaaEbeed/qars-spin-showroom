import React from "react";
import {
  PencilIcon,
  CheckCircleIcon,
  PhotoIcon,
  FolderPlusIcon,
  PlusIcon,
  CalendarIcon,
  LinkIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import LoadingState from "../common/LoadingState";
import { useBannerContext } from "../../context/BannerContext";
import { formatDateTime } from "../../utils/dateFormatter";
import { IoReload } from "react-icons/io5";

export default function BannerTable({ onEdit, onApprove, onUpload, handleOpenCreate }) {

  const {
    bigBanners,
    loadingBigBanner,
  } = useBannerContext();

  if (loadingBigBanner)
    return (<LoadingState title="Banners" />)


  if (bigBanners && bigBanners.length === 0 && !loadingBigBanner)
    return <div className="flex flex-col items-center justify-center py-20 border border-gray-200 rounded-xl bg-white/50 h-full">
      <div className="h-20 w-20 bg-secondary-100 rounded-2xl flex items-center justify-center mb-6">
        <FolderPlusIcon className="h-10 w-10 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-secondary-700 mb-2">
        No Banners Found
      </h3>
      <p className="text-secondary-500 mb-6 text-center">
        {bigBanners && bigBanners.length > 0
          ? "Try adjusting your search filters or clear all filters to see more results"
          : "Start by creating your first banner"}
      </p>
      <button
        onClick={handleOpenCreate}
        className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <PlusIcon className="mr-2 h-5 w-5" />
        Create First Banner
      </button>
    </div>;

  const EmptyImg = ({ banner, type }) => <div className=" relative mt-3 rounded-lg overflow-hidden border border-gray-300 bg-gray-200 h-[120px] w-[300px] flex flex-col items-center justify-center">
    <PhotoIcon className="h-12 w-12 text-gray-500" />
    <p className="text-gray-500 font-semibold  uppercase" >No Image</p>
    <div className="absolute bottom-2 right-2 flex gap-2 group">

      <button
        onClick={(e) => { e.stopPropagation(); onUpload(banner, type); }}
        className="flex items-center  gap-1.5 text-xs font-medium bg-white/90 text-gray-800 px-2 py-1.5 rounded-md shadow-sm hover:bg-white transition-colors ml-auto"
      >
        <ArrowUpTrayIcon className="h-3.5 w-3.5" />
        <span>Upload EN</span>
      </button>
    </div>
  </div>

  return (
    <div className="bg-white rounded shadow-sm p-3 overflow-x-auto">
      <div className="">
        {bigBanners.map((b) => (
          <div
            key={b.bannerId}
            className="group bg-white rounded-xl shadow-sm border mb-4 border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
          >
            {/* Image Section */}
            <div className="p-4 flex-shrink-0 flex items-center justify-center">
              <div className="space-y-3">
                {b.imageUrlPl ? (
                  <div className="relative group/image-container rounded-lg overflow-hidden border border-gray-200 w-full max-w-[300px] mx-auto">
                    <img
                      src={b.imageUrlPl}
                      alt={b.bannerTitle || 'Banner Image'}
                      className="w-full h-auto aspect-[5/2] object-cover transition-transform duration-300 group-hover/image-container:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover/image-container:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); onUpload(b, "pl"); }}
                        className="flex items-center gap-1.5 text-xs font-medium bg-white/90 text-gray-800 px-2 py-1.5 rounded-md shadow-sm hover:bg-white transition-colors ml-auto"
                      >
                        <ArrowUpTrayIcon className="h-3.5 w-3.5" />
                        <span>Upload EN</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <EmptyImg banner={b} type="pl" />
                )}

                {b.imageUrlSl ? (
                  <div className="relative group/image-container rounded-lg overflow-hidden border border-gray-200 w-full max-w-[300px] mx-auto">
                    <img
                      src={b.imageUrlSl}
                      alt={b.bannerTitle || 'Banner Image AR'}
                      className="w-full h-auto aspect-[5/2] object-cover transition-transform duration-300 group-hover/image-container:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover/image-container:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); onUpload(b, "sl"); }}
                        className="flex items-center gap-1.5 text-xs font-medium bg-white/90 text-gray-800 px-2 py-1.5 rounded-md shadow-sm hover:bg-white transition-colors ml-auto"
                      >
                        <ArrowUpTrayIcon className="h-3.5 w-3.5" />
                        <span>Upload AR</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <EmptyImg banner={b} type="sl" />
                )}
              </div>
            </div>

            {/* Card Body */}
            <div className="flex-1 p-5 flex flex-col border-t md:border-t-0 md:border-l border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                      {b.bannerTitle}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${b.bannerStatus === "Approved"
                      ? "bg-green-100 text-green-800"
                      : b.bannerStatus === "Archived"
                        ? "bg-amber-100 text-amber-800"
                        : b.bannerStatus === "Draft"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                      {b.bannerStatus}
                    </span>
                  </div>

                </div>



                <div className="flex-shrink-0 flex gap-2">
                  <button
                    onClick={() => onEdit(b)}
                    className="flex items-center justify-center h-10  w-10 text-white bg-primary-400 hover:bg-primary-600 hover:text-white rounded-full transition-colors"
                    title="Edit Banner"
                  >
                    <PencilIcon className="h-5 w-5 " />
                  </button>
                  {b.bannerStatus !== "Approved" && b.endDate >= new Date().toISOString() && <button
                    onClick={() => onApprove(b)}
                    className="flex items-center justify-center h-10  w-10 text-white bg-green-600 hover:bg-green-700 hover:text-white rounded-full transition-colors"
                    title="Approve Banner"
                  >
                    <CheckCircleIcon className="h-7 w-7" />
                  </button>}
                  {b.endDate.split('T')[0] < new Date().toISOString().split('T')[0] && <button
                    onClick={() => onEdit(b)}
                    className="flex items-center justify-center h-10  w-10 text-white bg-blue-600 hover:bg-blue-700 hover:text-white rounded-full transition-colors"
                    title="Republish Banner"
                  >
                    <IoReload className="h-6 w-6" />
                  </button>}
                </div>
              </div>
              <hr />
              <div className="flex my-2 gap-2">
                {b.targetType && (
                  <span className="inline-block text-sm font-medium text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full">
                    {b.targetType}
                  </span>
                )}
                {b.bannerRemarks && (
                  <p className="text-sm text-gray-600 mt-1">{b.bannerRemarks}</p>
                )}
              </div>


              {/* URL Targets */}
              <div className="space-y-2 mb-2">
                <a
                  href={b.targetUrlPl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/url relative flex items-center text-sm text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-blue-50 text-blue-600 rounded-full">
                    <LinkIcon className="h-3.5 w-3.5" />
                  </span>

                  {/* ✅ Truncated text */}
                  <span className="truncate max-w-[275px]">{b.targetUrlPl || "No URL provided"}</span>

                  <ArrowTopRightOnSquareIcon className="ml-1.5 h-3.5 w-3.5 text-gray-400 group-hover/url:text-primary-500 transition-colors" />

                  {/* ✅ Tooltip */}
                  <span className="absolute left-0 top-full mt-1 hidden group-hover/url:block bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-normal max-w-sm">
                    {b.targetUrlPl}
                  </span>
                </a>

                <a
                  href={b.targetUrlSl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/url flex items-center text-sm text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-2 bg-blue-50 text-blue-600 rounded-full">
                    <LinkIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="truncate max-w-[275px]">{b.targetUrlSl || 'No URL provided'}</span>
                  <ArrowTopRightOnSquareIcon className="ml-1.5 h-3.5 w-3.5 text-gray-400 group-hover/url:text-primary-500 transition-colors" />
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-2">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{b.impressionCount?.toLocaleString() || '0'}</p>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Impressions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{b.clickCount?.toLocaleString() || '0'}</p>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {b.clickThroughRate ? `${parseFloat(b.clickThroughRate).toFixed(1)}%` : '0%'}
                  </p>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</p>
                </div>
              </div>
              <hr />
              {/* Dates */}
              <div className="mt-auto pt-2 ">
                <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">Start Date</div>
                      <div>{formatDateTime(b.startDate, { type: "date" }) || 'Not set'}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">End Date</div>
                      <div>{formatDateTime(b.endDate, { type: "date" }) || 'Not set'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* <button
          onClick={() => onDelete(b.id)}
          className="flex items-center gap-1 border px-3 py-1.5 rounded text-sm text-red-600 hover:bg-red-50 transition"
        >
          <TrashIcon className="h-4 w-4" />
          Delete
        </button> */}
      </div>
    </div>
  );
}
