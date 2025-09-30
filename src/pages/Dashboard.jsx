import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import StatisticsWidget from '../components/dashboard/StatisticsWidget';
import Chart from '../components/dashboard/Chart';
import MainLayout from '../components/layout/MainLayout';
import { dashboardAPI } from '../services/api';
import SelectShowroomHint from '../components/adminHint/SelectShowroomHint';
import { useParams } from 'react-router-dom';

export default function Dashboard() {
  const {id} = useParams();
  const [loadingWelcome, setLoadingWelcome] = useState(false)
  const [loadingStats, setLoadingStats] = useState(false)
  const [loadingMonthlyState, setLoadingMonthlyState] = useState(false)

  const [stats, setStats] = useState({
    visits: 0,
    activePosts: 0,
    followers: 0,
    avgRating: 0,
  });

  const [welcomeMessage, setWelcomeMessage] = useState({});
  const [followersData, setFollowersData] = useState({
    labels: [],
    values: [],
  });
  const [visitsData, setVisitsData] = useState({
    labels: [],
    values: [],
  });

  const fetchWelcome = async () => {
    setLoadingWelcome(true)
    try {

      const res = await dashboardAPI.welcomeMessage();
      setWelcomeMessage(res.data);
      setLoadingWelcome(false)
    } catch (error) {
      console.error('Error fetching welcome message:', error);
      setLoadingWelcome(false)
    }
  }

  const fetchStats = async () => {
    setLoadingStats(true)
    try {
      let response
      if(localStorage.getItem("role") === "superAdmin") {
        if ((id !== "undefiend" || !id) && id) {
          response = await dashboardAPI.getTopCounters(id);
        }
      } else {
       response = await dashboardAPI.getTopCounters(localStorage.getItem("partnerId"));
      }
      setStats({
        visits: response.data.visitsCount,
        activePosts: response.data.activePosts,
        followers: response.data.followersCount,
        avgRating: response.data.averageRating,
      });
      setLoadingStats(false)
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoadingStats(false)
    }
  };

  const monthlyState = async () => {
    setLoadingMonthlyState(true)
    try {
      const response = await dashboardAPI.monthlyStats(localStorage.getItem("partnerId"));
      setVisitsData({
        labels: response.data.labels,
        values: response.data.visitsData,
      })
      setFollowersData({
        labels: response.data.labels,
        values: response.data.followersData,
      })
      setLoadingMonthlyState(false)
    } catch (error) {
      console.error('Error fetching monthly stats:', error);
      setLoadingMonthlyState(false)
    }
  }

  useEffect(() => {
    fetchWelcome()
    fetchStats();
    monthlyState();
  }, []);


  if (localStorage.getItem("role") === "superAdmin") {
      if (!id || id === "undefined") return (<SelectShowroomHint />)
  
    }

  return (
    <MainLayout>
      <main>
        <div className='bg-gradient-to-r from-primary-500/10 to-indigo-500/10 px-6 py-4 border-b border-secondary-100'>
          {!loadingWelcome ?
            <div>
              <p className='text-xl font-semibold text-gray-900'>{welcomeMessage.greeting}, {localStorage.getItem("fullName")}!</p>
              {id && localStorage.getItem("role") === "superAdmin" && <h6 className='mt-2 text-lg font-semibold text-gray-600'>As a super admin you can manage all showrooms</h6>}
              <h6 className='mt-2 text-lg font-semibold text-gray-600'>Manager Dashboard.</h6>
            </div> :
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>

            </div>
          }
        </div>
        <div className="max-w-8xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className='bg-white/50 shadow-md py-4 px-4 border-secondary-100'>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatisticsWidget
                loading={loadingStats}
                title="Page Visits"
                value={stats.visits}
                icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>}
              />
              <StatisticsWidget
                title="Active Posts"
                loading={loadingStats}
                value={stats.activePosts}
                icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>}
              />
              <StatisticsWidget
                title="Followers"
                loading={loadingStats}
                value={stats.followers}
                icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>}
              />
              <StatisticsWidget
                title="Average Rating"
                loading={loadingStats}
                value={stats.avgRating}
                icon={<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>}
              />
            </div>

            <div className="mt-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-gray-900">Followers By Month (Last 12 Months)</h3>
                    <div className="mt-4">

                      {loadingMonthlyState ? <div className='h-28'><div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-500 border-t-transparent mx-auto mb-4"></div></div> : <Chart
                        title="Followers"
                        data={followersData}
                        type="line"
                      />}
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-gray-900">Page Visits By Month (Last 12 Months)</h3>
                    <div className="mt-4">
                      {loadingMonthlyState ? <div className='h-28'><div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-500 border-t-transparent mx-auto mb-4"></div></div> : <Chart
                        title="Visits"
                        data={visitsData}
                        type="line"
                      />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
