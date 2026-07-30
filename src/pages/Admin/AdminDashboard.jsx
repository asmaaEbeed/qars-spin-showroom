import { useNavigate } from "react-router-dom";
import { ClipboardDocumentListIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import MainLayout from "../../components/layout/MainLayout";
import superAdminBg from "../../assets/images/superadmin-bg.jpg"
import { usePosts } from "../../context/PostsContext";
import { QARS_SPIN_LOGO, QARS_SPIN_PARTNER_ID } from "../../constants/qars-spin-data";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { fetchPosts, setFilters } = usePosts();


  const handleViewAllPosts = () => {

    fetchPosts({ partnerId: null });
    setFilters({
      searchBy: 0,
      searchTerm: "",
      category: "",
      status: "",
      sortBy: 0,
      year: "",
      pinToTop: false,
    });
    navigate("/admin/posts");
    localStorage.removeItem("partnerId")
  }

  const options = [
    {
      label: "View All Posts",
      description: "Manage and review all posts in the platform",
      icon: ClipboardDocumentListIcon,
      bg: "from-primary-600 to-black",
      hover: "hover:scale-105 hover:shadow-2xl",
      onClick: () => { handleViewAllPosts() },
    },
    {
      label: "",
      description: "Manage all showrooms and their details",
      img: QARS_SPIN_LOGO,
      icon: null,
      bg: "from-primary-600 to-black",
      hover: "hover:scale-105 hover:shadow-2xl",
      onClick: () =>  navigate(`/admin/dealer/${QARS_SPIN_PARTNER_ID}/showroom/posts`)
    },
    {
      label: "View All Showrooms",
      description: "Manage all showrooms and their details",
      icon: BuildingOfficeIcon,
      bg: "from-primary-600 to-black",
      hover: "hover:scale-105 hover:shadow-2xl",
      onClick: () => { navigate("/admin/showrooms"); localStorage.removeItem("partnerId") },
    },
    
  ];

  return (
    <MainLayout>
      <main className="relative min-h-[calc(100vh-9.5rem)]  bg-gradient-to-r z-10 from-secondary-900/90 to-primary-300/90 ">

        <div
          className="absolute inset-0 bg-cover bg-center bg-transparent "
          style={{
            backgroundImage:
              `url("${superAdminBg}")`,
          }}
        ></div>


        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative max-w-7xl mx-auto py-16 px-6">
          {/* Hero Title */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-extrabold text-white mb-4 tracking-wide">
              Super Admin Panel
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Manage everything from one place — posts, showrooms, and more. Designed for speed and control.
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {options.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.label}
                  onClick={option.onClick}
                  className={`group  relative flex flex-col items-center justify-center rounded-xl p-8 bg-gradient-to-br ${option.bg} text-white shadow-lg transition-transform duration-300 ${option.hover} mx-10 md:mx-0`}
                >
                  <div className="absolute inset-0 rounded-xl bg-black/20 group-hover:bg-black/10 transition"></div>
                  {Icon ? <Icon className="w-14 h-14 mb-4 z-10" /> : <img src={option.img} alt={option.label} className="w-64 h-14 mb-4 z-10" />}
                  <span className="text-xl font-semibold z-10">{option.label}</span>
                  <p className="text-sm text-gray-200 mt-2 text-center z-10">{option.description}</p>
                </button>
              );
            })}
          </div>

          
        </div>
      </main>
    </MainLayout>
  );
}
