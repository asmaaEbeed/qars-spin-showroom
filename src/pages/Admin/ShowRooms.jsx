import { useCallback, useState } from 'react'
import { useEffect } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { ShowRoomsHeader } from '../../components/showrooms/ShowRoomsHeader'
import { FaImage, FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { FaChartColumn } from 'react-icons/fa6'
import Pagination from '../../components/layout/Pagination'
import { usePosts } from '../../context/PostsContext'
import { AdminPartnerAPI } from '../../services/api'
import { toast } from 'react-toastify'
import qarsSpinLogo from "../../assets/images/logo/Logo.svg"
import { QARS_SPIN_PARTNER_ID } from '../../constants/qars-spin-data'

const PARTNER_STATUS_COLOR = {
  Approved: "bg-green-500",
  "Under Preparation": "bg-indigo-300",
  "Waiting Approval": "bg-blue-500",
  Suspended: "bg-red-500"
}

const ShowRooms = () => {
  const navigate = useNavigate();
  const [showrooms, setShowrooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { fetchPosts } = usePosts();

  const fetchShowrooms = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await AdminPartnerAPI.getAllShowRooms();
      setShowrooms(res.data);
    } catch (e) {
      toast.error("Something went wrong");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [])
  useEffect(() => {
    if (!showrooms.length) fetchShowrooms();
    console.log(showrooms.filter((s) => s.partnerStatus === "Approved"))
  }, [showrooms, fetchShowrooms]);

  // === Filter by partnerName ===
  const filteredShowrooms = showrooms.filter((s) =>
    s.partnerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredShowrooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentShowrooms = filteredShowrooms.slice(startIndex, startIndex + itemsPerPage);

  const handleShowRoomsPosts = (partnerId) => {
    navigate(`/admin/dealer/${partnerId}/showroom`);
    fetchPosts({ partnerId });
  };
  return (
    <MainLayout>
      <ShowRoomsHeader showrooms={showrooms} />
      {isLoading ? <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent absolute top-0"></div>
        </div>
        <p className="mt-6 text-lg font-medium text-secondary-600">
          Loading ShowRoom listings...
        </p>
        <p className="text-secondary-500">
          Please wait while we fetch your data
        </p>
      </div> :

        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-indigo-50 py-8 px-4">
          <div className="max-w-7xl mx-auto ">
            {/* Search */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 hidden md:block">Showrooms</h1>

              <div className="relative w-full md:max-w-sm">
                <input
                  type="text"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search showrooms..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus-visible:outline-none transition"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentShowrooms.map((showroom, index) => (
                <div key={index} className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${showroom.pinToTop && 'border-2 border-yellow-400 rounded-b-xl'}`}>
                  {/* Cover Image */}
                  <div className="relative h-48 bg-gray-200">
                    {showroom.pinToTop && <div className='absolute w-[155px] h-[30px] top-7 left-[-33px] z-10 bg-gradient-to-r from-amber-300 to-amber-600 text-white  flex items-center justify-center font-medium -rotate-45 shadow-xl '>
                      Featured</div>}
                    <div className={`absolute top-4 right-0 z-10 ${PARTNER_STATUS_COLOR[showroom.partnerStatus]} text-white px-2 py-1 rounded-l-full text-xs font-medium`}>
                      {showroom.partnerStatus}
                    </div>
                    {showroom.coverPhotoUrl ? <img
                      src={showroom.coverPhotoUrl}
                      alt={`${showroom.partnerName} cover`}
                      className="w-full h-full object-cover"
                    /> : <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center">
                      <FaImage className="w-8 h-8 text-gray-400" />
                      <p className="text-gray-500 mt-2 text-sm font-medium">No cover photo</p>
                    </div>}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {showroom.partnerId === QARS_SPIN_PARTNER_ID ?
                    <img src={qarsSpinLogo} alt={`${showroom.partnerName} logo`} className="h-10 -ml-4 w-auto mb-2" /> :
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{showroom.partnerName}</h2>}

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Posts Count:</span>
                        <span className="text-sm font-medium text-gray-900">{showroom.postsCount}</span>
                      </div>

                      {/* <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average Rate:</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 mr-1">{showroom.averageRate}</span>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.floor(showroom.averageRate) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div> */}

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Mobile:</span>
                        <span className="text-sm font-medium text-gray-900">{showroom.contactPhone}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Email:</span>
                        <span className="text-sm font-medium text-gray-900">{showroom.notificationEmail}</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-3">
                      <button onClick={() => handleShowRoomsPosts(showroom.partnerId)} className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                        View Posts
                      </button>
                      <button onClick={() => navigate(`/admin/dealer/${showroom.partnerId}/profile`)} className="flex-1 bg-emerald-100 hover:bg-emerald-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                        View Profile
                      </button>
                      <button title="Dashboard" onClick={() => navigate(`/admin/dealer/${showroom.partnerId}/dashboard`)} className="w-12flex-1 bg-purple-100 hover:bg-purple-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                        <FaChartColumn />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination Component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      }

    </MainLayout>
  )
}

export default ShowRooms
