import { MdManageHistory } from 'react-icons/md'

const PaymentReportHeader = ({ description }) => {


    return (
        <div className="py-2 px-4 bg-white/80 backdrop-blur-sm shadow-md border-b border-white/20 top-16 z-40">
            <div className="max-w-7xl mx-auto  py-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 lg:space-y-0">
                    {/* Title Section */}
                    <div className="flex items-center space-x-4">
                        <div className="h-8 w-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                            <MdManageHistory className="text-white text-2xl" />
                        </div>
                        <div>
                            <h2 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-secondary-800 to-primary-700 bg-clip-text text-transparent">
                                Payments
                            </h2>
                            <p className="text-secondary-600 text-xs lg:text-sm mt-1">
                                {description}
                            </p>
                        </div>
                    </div>
                    <div className="flex sm:flex-row gap-3">
                        <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 my-4">
                            {/* Total Showrooms */}
                            {/* <div className="bg-white rounded-2xl shadow p-3 flex items-center gap-2 max-w-[185px]">
                                <div>
                                    <p className="text-gray-500 text-xs">Current Page Amount</p>
                                    <h2 className="text-sm md:text-lg lg:text-xl font-bold flex items-center gap-2">
                                        <FiDollarSign className="text-primary-500 w-8 h-8" />
                                        {data.reduce((total, payment) => total + payment.amount, 0)} QAR
                                    </h2>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl shadow p-3 flex items-center gap-2 max-w-185px">
                                <div className=" w-full">
                                    <p className="text-gray-500 text-sm">Pending Requests</p>
                                    <div className=" flex justify-between w-full">
                                        <h2 className="text-sm md:text-lg font-bold flex gap-2 items-center">
                                            <BsClockHistory className="text-primary-500 w-4 h-4" />
                                            {data.filter(payment => payment.paymentStatus === "Pending").length}
                                        </h2>
                                        <h2 className="text-sm md:text-lg font-bold flex gap-2 items-center">
                                            <FiDollarSign className="text-primary-500 w-4 h-4" />

                                            {data.filter(payment => payment.paymentStatus === "Pending")
                                                .reduce((total, payment) => total + payment.amount, 0)} QAR
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl shadow p-3 flex items-center gap-2 max-w-[185px]">
                                <div className="w-full">
                                    <p className="text-gray-500 text-sm">Failed Requests</p>
                                    <div className=" flex justify-between w-full">
                                        <h2 className="text-sm md:text-lg font-bold flex items-center">
                                            <TbX className="text-primary-500 text-lg" />
                                            {data.filter(payment => payment.paymentStatus === "Failed").length}
                                        </h2>
                                        <h2 className="text-sm md:text-lg  font-bold flex items-center">
                                            <FiDollarSign className="text-primary-500 w-4 h-4" />

                                            {data.filter(payment => payment.paymentStatus === "Failed")
                                                .reduce((total, payment) => total + payment.amount, 0)} QAR
                                        </h2>
                                    </div>
                                </div>
                            </div> */}

                           
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PaymentReportHeader