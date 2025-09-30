import React from 'react';
import { formatNumber } from '../../utils/numberFormatter';

const StatisticsWidget = ({ title, value, icon, color = 'primary', loading = false }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className={`inline-flex items-center justify-center h-12 w-12 rounded-md bg-${color}-100 text-${color}-600`}> 
              {icon}
            </span>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="text-lg font-semibold text-gray-900">
                {loading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-500 border-t-transparent mx-auto mb-4"></div> : formatNumber(value)}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsWidget;
