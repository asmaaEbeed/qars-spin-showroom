import { TbX } from 'react-icons/tb';
import { FaCheck } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs'
import { FiCheckCircle, FiClock, FiDollarSign, FiXCircle } from 'react-icons/fi';

const PaymentReportStatistics = ({ data }) => {


    const cards = [
        {
            title: "Total Amount",
            titleIcon: FiDollarSign,
            count: data.summary.totalCount,
            amount: data.summary.totalAmount,
            icon: FiDollarSign,
        },
        {
            title: "Paid Requests",
            titleIcon: FiCheckCircle,
            count: data.summary.paidCount,
            amount: data.summary.paidAmount,
            icon: FaCheck,
        },
        {
            title: "Pending Requests",
            titleIcon: FiClock,
            count: data.summary.pendingCount,
            amount: data.summary.pendingAmount,
            icon: BsClockHistory,
        },
        {
            title: "Failed Requests",
            titleIcon: FiXCircle,
            count: data.summary.failedCount,
            amount: data.summary.failedAmount,
            icon: TbX,
        },
    ];
    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto my-4'> {cards.map((card, index) => (
            <div key={index} className="bg-white rounded-2xl shadow p-3 flex items-center gap-2">
                <div className="w-full">
                    <p className="text-gray-500 text-sm mb-2 flex gap-2 items-center border-b pb-1">
                        <card.titleIcon className="text-primary-500  w-6 h-6" />
                        {card.title}</p>

                    <div className="flex justify-between w-full">
                        <h2 className="text-sm md:text-[16px] font-bold flex items-center gap-2">
                            <FaCheck className="text-green-500 w-4 h-4" />
                            {card.count}
                        </h2>

                        <h2 className="text-sm md:text-[16px] font-bold flex items-center gap-2">
                            <FiDollarSign className="text-primary-500 w-4 h-4" />
                            {card.amount} QAR
                        </h2>
                    </div>
                </div>
            </div>
        ))}</div>
    )
}

export default PaymentReportStatistics