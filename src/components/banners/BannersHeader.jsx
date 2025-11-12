import { PlusIcon } from '@heroicons/react/24/outline';
import { IoReload } from 'react-icons/io5';
import { useBannerContext } from '../../context/BannerContext';

const BannersHeader = ({ handleOpenCreate }) => {
    const { fetchBigBanner, filter, bannerType } = useBannerContext()
    const title = bannerType === "big" ?
        "Big Banner" : bannerType === "small" ?
            "Small Banner" : bannerType === "bigFiller" ?
                "Big Filler Banner" : "Small Filler Banner"

    const size = (bannerType === "big" || bannerType === "bigFiller") ? "500 × 200" : "500 × 125"
    return (
        <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20 top-16 z-40">
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Title Section */}
                    <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg
                                className="h-6 w-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-secondary-800 to-primary-700 bg-clip-text text-transparent">{title} Management</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Manage defined {title} <span className="font-medium text-gray-600">{size}</span>
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}

                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handleOpenCreate}
                            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                            <PlusIcon className="w-5 h-5" />
                            Create New Filler
                        </button>

                        <button
                            onClick={() => fetchBigBanner(filter)}
                            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-5 py-2.5 rounded-lg transition-all duration-200"
                        >
                            <IoReload className="w-5 h-5" />
                            Refresh
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannersHeader