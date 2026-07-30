import { IoReload } from "react-icons/io5";
import getCurrentDateTime from "../../../utils/getCurrentDateTime";
import { getFirstDayOfCurrentMonth } from "../../../utils/getFirstDayOfCurrentMonth";

const PaymentReportFilter = ({
  filter,
  setFilter,
  resetFilter,
}) => {

  const handleEndDateChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      endDate: e.target.value || getCurrentDateTime(),
      pageNumber: 1,
    }));
  };

  const handleStartDateChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      startDate: e.target.value || getFirstDayOfCurrentMonth(),
      pageNumber: 1,
    }));
  };

  return (
    <div className="mb-2 overflow-clip flex border-b">
      <div className="px-2 pt-2 pb-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 items-end w-full">
        {/* Service Name */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Service Name
          </label>
          <select
            value={filter.serviceName}
            onChange={(e) =>
              setFilter({ ...filter, serviceName: e.target.value, pageNumber: 1 })
            }
            className="w-full rounded-lg border border-gray-300 text-sm text-gray-700 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All</option>
            <option value="Request 360 Photo Session">360° Service</option>
            <option value="Request to Feature a Post">Feature Service</option>
          </select>
        </div>

        {/* payment Status */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Payment Status
          </label>
          <select
            value={filter.paymentStatus}
            onChange={(e) =>
              setFilter({ ...filter, paymentStatus: e.target.value, pageNumber: 1 })
            }
            className="w-full rounded-lg border border-gray-300 text-sm text-gray-700 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All</option>
            <option value="Paid">Paid</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            User Type
          </label>
          <select
            value={filter.serviceType}
            onChange={(e) =>
              setFilter({ ...filter, serviceType: e.target.value, pageNumber: 1 })
            }
            className="w-full rounded-lg border border-gray-300 text-sm text-gray-700 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All</option>
            <option value="Individual">Individual</option>
            <option value="Partner">Partner</option>
          </select>
        </div>

        {/* user name */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            User Name
          </label>
          <input
            type="text"
            value={filter.userName}
            onChange={(e) =>
              setFilter({ ...filter, userName: e.target.value, pageNumber: 1 })
            }
            className="w-full rounded-lg border border-gray-300 text-sm text-gray-700 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="User name"
          />
        </div>

        {/* start date */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Start Date
          </label>
          <input
            type="datetime-local"
            value={filter.startDate}
            onChange={(e) => handleStartDateChange(e)}
            className="w-full rounded-lg border border-gray-300 text-sm text-gray-700 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* End date */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            End Date
          </label>
          <input
            type="datetime-local"
            value={filter.endDate}
            max={getCurrentDateTime()}
            onChange={(e) => handleEndDateChange(e)}
            className="w-full rounded-lg border border-gray-300 text-sm text-gray-700 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* reset */}
        <div className="w-full flex justify-end items-end px-2">


          <button
            onClick={resetFilter}
            className="shrink-0 gap-4 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
          >
            <IoReload className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentReportFilter;