import { ClockIcon } from '@heroicons/react/24/outline'
import { BsClockHistory } from 'react-icons/bs'
import { MdManageHistory } from 'react-icons/md'
import { TbClockCheck } from 'react-icons/tb';

const RequestsHeader = ({ requests, description }) => {
    return (
        <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20 top-16 z-40">
            <div className="max-w-7xl mx-auto  py-1">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Title Section */}
                    <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                            <MdManageHistory className="text-white text-3xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-secondary-800 to-primary-700 bg-clip-text text-transparent">
                                Requests Management
                            </h1>
                            <p className="text-secondary-600 text-sm lg:text-base mt-1">
                                { description }
                            </p>
                        </div>
                    </div>
                    <div className="flex sm:flex-row gap-3">
                        <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 my-4">
                            {/* Total Showrooms */}
                            <div className="bg-white rounded-2xl shadow p-3 flex items-center gap-2">
                                <ClockIcon className="text-primary-500 w-8 h-8" />
                                <div>
                                    <p className="text-gray-500 text-sm">All Requests</p>
                                    <h2 className="text-sm md:text-lg lg:text-2xl font-bold">{requests.length}</h2>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl shadow p-3 flex items-center gap-2">
                                <BsClockHistory className="text-primary-500 text-3xl" />
                                <div>
                                    <p className="text-gray-500 text-sm">Pending Requests</p>
                                    <h2 className="text-sm md:text-lg lg:text-2xl font-bold">{requests.filter(request => request.status === "Pending").length}</h2>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl shadow p-3 flex items-center gap-2">
                                <TbClockCheck className="text-primary-500 text-3xl" />
                                <div>
                                    <p className="text-gray-500 text-sm">Completed Requests</p>
                                    <h2 className="text-sm md:text-lg lg:text-2xl font-bold">{requests.filter(request => request.status === "Completed").length}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RequestsHeader