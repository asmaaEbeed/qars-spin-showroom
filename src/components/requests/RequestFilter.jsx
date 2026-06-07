import { IoReload } from "react-icons/io5";
import { useRequestContext } from "../../context/RequestContext";
import { ACTION_REQUEST_TYPES } from "../banners/constants/requestConstant";
import { PiFunnelDuotone } from "react-icons/pi";

export default function RequestFilter({ isUser = false }) {

    const { filter, setFilter, resetFilter, sortDate, setSortDate } = useRequestContext();


    return (
        <>
            <div className="mb-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md ">
                <h5 className="text-sm font-semibold text-gray-700 flex items-center gap-2 border-b border-secondary-100 px-4 py-3">
                    <PiFunnelDuotone className="w-6 h-6  text-primary-500" />
                    Filter Requests
                </h5>

                <div className="px-4 pt-2 pb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 items-end w-full">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            By Request Type
                        </label>
                        <select
                            value={filter.requestType}
                            onChange={(e) => setFilter({ ...filter, requestType: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 text-sm text-gray-700 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="">Show All</option>
                            {Object.values(ACTION_REQUEST_TYPES).map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full">
                        <label className="block text-xs font-medium text-gray-600">
                            By Status
                        </label>
                        <select
                            value={filter.status}
                            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 text-sm text-gray-700 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="In-Progress">In-Progress</option>
                        </select>
                    </div>
                    {!isUser && <div className="w-full">
                        <label className="block text-xs font-medium text-gray-600">
                            Source Kind
                        </label>
                        <select
                            value={filter.sourceKind}
                            onChange={(e) => setFilter({ ...filter, sourceKind: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 text-sm text-gray-700 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="">All</option>
                            <option value="Individual">Individual</option>
                            <option value="Partner">Partner</option>
                            <option value="Qars Spin">Qars Spin</option>
                        </select>
                    </div>}
                    <div className="w-full flex items-end gap-2">
                        <div>
                            <label className="block text-xs font-medium text-gray-600">
                                Sort Date
                            </label>
                            <select
                                value={sortDate}
                                onChange={(e) => setSortDate(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 text-sm text-gray-700 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        <button
                            onClick={resetFilter}
                            className="shrink-0 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                            <IoReload className="w-5 h-5" />
                            Reset
                        </button>
                    </div>
                </div>
            </div>


        </>
    );
}
