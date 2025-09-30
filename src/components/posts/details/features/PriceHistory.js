import React, { useState, useEffect } from 'react';
import { usePosts } from '../../../../context/PostsContext';
import Chart from 'react-apexcharts';

export const PriceHistory = ({ currentPost }) => {
  const { getPriceHistory } = usePosts();
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPriceHistory();
  }, [currentPost.id]);

  const fetchPriceHistory = async () => {
    setLoading(true);
    try {
      const history = await getPriceHistory(currentPost.id);
      setPriceHistory(history);
    } catch (error) {
      console.error('Error fetching price history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getChartOptions = () => ({
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false
      }
    },
    colors: ['#2563eb'],
    stroke: {
      width: 2,
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${value.toLocaleString()}`
      }
    },
    tooltip: {
      y: {
        formatter: (value) => `$${value.toLocaleString()}`
      }
    }
  });

  const getChartData = () => ({
    series: [
      {
        name: 'Price',
        data: priceHistory.map(item => ({
          x: new Date(item.date),
          y: item.price
        }))
      }
    ]
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-secondary-800">Price History</h2>
        <button 
          onClick={fetchPriceHistory}
          className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors"
        >
          Refresh History
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <Chart 
            options={getChartOptions()}
            series={getChartData().series}
            type="line"
            height={350}
          />
          <div className="bg-primary-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Price Changes</h3>
            <div className="space-y-2">
              {priceHistory.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-secondary-500">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                  <span className="font-medium">
                    ${item.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceHistory;
