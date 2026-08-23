// Reviewd
import { formatDateTime } from "../../../utils/dateFormatter";
import { useCarContext } from "../../../context/CarContext";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import xlsxExport from "../../../hooks/xlsxExport";
import LoadingState from "../../common/LoadingState";

import { formatNumber } from "chart.js/helpers";
import { toast } from "react-toastify";

const PostOffers = ({ currentPost }) => {
  const { carOffers, carOfferLoading } = useCarContext();

  if (carOfferLoading) {
    return (
      <div className=" bg-gradient-to-br from-primary-50 via-white to-indigo-50 flex items-center justify-center">
        <LoadingState title="Offers" />
      </div>
    );
  }
  const handleExportOffers = () => {
    xlsxExport(carOffers, `CarOffers_${currentPost.postCode}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500/10 to-indigo-500/10 px-6 py-4 border-b border-secondary-100">
          <h2 className="text-lg font-bold text-secondary-800">
            Sale Information
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-secondary-600">
                Asking Price
              </h3>
              <p className="text-2xl font-bold text-primary-600">
                QAR {currentPost.askingPrice}
              </p>
            </div>
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-secondary-600">
                Minimum Price
              </h3>
              <p className="text-xl font-semibold text-secondary-800">
                QAR {currentPost.minimumPrice}
              </p>
            </div>
            <div className="bg-primary-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-secondary-600">Status</h3>
              <p className="text-xl font-semibold text-secondary-800">
                {currentPost.isSold ? "Sold" : "Available"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="flex justify-between bg-gradient-to-r from-primary-500/10 to-indigo-500/10 px-6 py-4 border-b border-secondary-100">
          <h2 className="text-lg font-bold text-secondary-800">Offers List</h2>
          <button
            className="bg-primary-500 text-white px-4 py-2 rounded-lg"
            onClick={handleExportOffers}
          >
            <DocumentArrowUpIcon className="w-5 h-5 inline" /> Export
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="p-4 rounded-lg max-h-[400px] overflow-y-scroll">
              {carOffers.length > 0 ? (
                carOffers.map((offer) => (
                  <div
                    key={offer.offerId}
                    className="bg-primary-50 p-4 rounded-lg mb-2"
                  >
                    <div className="bg-primary-50 py-2 rounded-lg grid grid-cols-2 justify-between gap-3 ">
                      <div className="">
                        <h3 className="text-sm font-medium text-secondary-600 ">
                          User Name
                        </h3>
                        <p className="font-semibold text-secondary-800 text-sm">
                          {offer.fullName}
                        </p>
                      </div>
                      <div className="">
                        <h3 className="text-sm font-medium text-secondary-600 ">
                          Mobile
                        </h3>
                        <p className="font-semibold text-secondary-800 text-sm">
                          <a
                            href={`tel:${offer.mobile}`}
                            onClick={(e) => {
                              if (!/Mobi|Android/i.test(navigator.userAgent)) {
                                e.preventDefault();
                                navigator.clipboard.writeText(offer.mobile);
                                toast.dismiss();
                                toast.success("Phone number copied to clipboard!");
                              }
                            }}
                            className="text-blue-600 hover:underline"
                          >
                            {offer.mobile}
                          </a>
                          
                        </p>
                      </div>
                      <div className="">
                        <h3 className="text-sm font-medium text-secondary-600 flex items-center ">
                          <p>Offer Price</p>
                        </h3>
                        <p className="font-semibold text-secondary-800 text-sm">
                          {offer.offerPrice}
                        </p>
                      </div>
                      <div className="">
                        <h3 className="text-sm font-medium text-secondary-600 ">
                          Offer Date
                        </h3>
                        <p className=" font-semibold text-secondary-800 text-sm">
                          {formatDateTime(offer.offerDateTime).formateDate}
                        </p>
                      </div>
                    </div>
                    <div className="bg-primary-50 py-2 rounded-lg flex justify-between "></div>
                  </div>
                ))
              ) : (
                <p className="text-xl font-semibold text-secondary-800">
                  No offers available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-primary-500/10 to-indigo-500/10 px-6 py-4 border-b border-secondary-100">
          <h2 className="text-lg font-bold text-secondary-800">
            Offers Summary
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Post Views:</span>
                <span className="font-semibold text-secondary-800 text-sm">
                  {currentPost.visitsCount || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Bidders Count:</span>
                <span className="font-semibold text-secondary-800 text-sm">
                  {currentPost.biddersCount || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Offers Count:</span>
                <span className="font-semibold text-secondary-800 text-sm">
                  {currentPost.offersCount || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Least Price:</span>
                <span className="font-semibold text-secondary-800 text-sm">
                  QAR{formatNumber(currentPost.leastPrice) || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Highest Price:</span>
                <span className="font-semibold text-secondary-800 text-sm">
                  QAR {formatNumber(currentPost.highestPrice) || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Avg Price:</span>
                <span className="font-semibold text-secondary-800 text-sm">
                  QAR {formatNumber(currentPost.avgPrice) || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">First Offer:</span>
                <span className="font-semibold text-secondary-800 text-sm">
                  {formatDateTime(currentPost.firstOffer).formateDate || "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Latest Offer:</span>
                <span className="font-semibold text-secondary-800 text-sm">
                  {formatDateTime(currentPost.latestOffer).formateDate || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostOffers;
