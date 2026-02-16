import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PostsProvider } from "./context/PostsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import Showroom from "./pages/Showroom";
import Profile from "./pages/Profile";
import UserSettings from "./components/profile/UserSettings";
import Welcome from "./pages/Welcome";
import Apply from "./pages/Apply";
import { CarProvider } from "./context/CarContext";
import ShowRooms from "./pages/Admin/ShowRooms";
import NotAuthorized from "./pages/NotAuthorized";
import BigBanners from "./pages/Admin/banners/BigBanners";
import { BigBannerProvider } from "./context/BannerContext";
import { ShowroomProvider } from "./context/ShowroomContext";
import { PaymentProvider } from "./context/PaymentContext";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import PaymentFailed from "./pages/payment/PaymentFailed";
import Requests from "./pages/Admin/requests";
import { RequestProvider } from "./context/RequestContext";
import UserRequests from "./pages/UserRequests";

function App() {
  return (
    <AuthProvider>
      <CarProvider>
        <PostsProvider>
          <PaymentProvider>
            <RequestProvider>
              <Router>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
                <Routes>
                  <Route path="/welcome" element={<Welcome />} />
                  <Route path="/apply" element={<Apply />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/dashboard"
                    element={
                      // <PostsProvider>
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                      // </PostsProvider>
                    }
                  />
                  <Route
                    path="/admin/dealer/:id/dashboard"
                    element={
                      // <PostsProvider>
                      <ProtectedRoute allowedRoles={["superAdmin"]}>
                        <Dashboard />
                      </ProtectedRoute>
                      // </PostsProvider>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      // <PostsProvider>
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                      // </PostsProvider>
                    }
                  />
                  <Route
                    path="/admin/dealer/:id/profile"
                    element={
                      // <PostsProvider>
                      <ShowroomProvider>
                        <ProtectedRoute allowedRoles={["superAdmin"]}>
                          <Profile />
                        </ProtectedRoute>
                      </ShowroomProvider>
                      // </PostsProvider>
                    }
                  />
                  <Route
                    path="/showroom/posts"
                    element={
                      // <PostsProvider>
                      <ProtectedRoute>
                        <Posts />
                      </ProtectedRoute>
                      // </PostsProvider>
                    }
                  />
                  <Route
                    path="/admin/dealer/:id/showroom/posts"
                    element={
                      // <PostsProvider>
                      <ProtectedRoute allowedRoles={["superAdmin"]}>
                        <Posts />
                      </ProtectedRoute>
                      // </PostsProvider>
                    }
                  />
                  <Route
                    path="/showroom/posts/:code"
                    element={
                      // <PostsProvider>
                      <ProtectedRoute>
                        <PostDetails />
                      </ProtectedRoute>
                      // </PostsProvider>
                    }
                  />
                  <Route
                    path="/admin/dealer/:id/showroom/posts/:code"
                    element={
                      // <PostsProvider>
                      <ProtectedRoute allowedRoles={["superAdmin"]}>
                        <PostDetails />
                      </ProtectedRoute>
                      // </PostsProvider>
                    }
                  />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  {/* <Route path="/" element=<RoleRedirect /> /> */}
                  <Route
                    path="/showroom"
                    element={
                      // <PostsProvider>
                      <ProtectedRoute>
                        <Showroom />
                      </ProtectedRoute>
                      // </PostsProvider>
                    }
                  />
                  <Route
                    path="/admin/dealer/:id/showroom"
                    element={
                      // <PostsProvider>
                      <ProtectedRoute allowedRoles={["superAdmin"]}>
                        <Showroom />
                      </ProtectedRoute>
                      // </PostsProvider>
                    }
                  />

                  <Route
                    path="/admin/showrooms"
                    element={
                      // <PostsProvider>
                      <ProtectedRoute allowedRoles={["superAdmin"]}>
                        <ShowRooms />
                      </ProtectedRoute>
                      // </PostsProvider>
                    }
                  />
                  <Route
                    path="/admin/superAdmin-panel"
                    element={
                      // <PostsProvider>
                      <ProtectedRoute allowedRoles={["superAdmin"]}>
                        <AdminDashboard />
                      </ProtectedRoute>
                      // </PostsProvider>
                    }
                  />
                  <Route
                    path="/admin/posts"
                    element={
                      // <PostsProvider>
                      <ProtectedRoute allowedRoles={["superAdmin"]}>
                        <Posts />
                      </ProtectedRoute>
                      // </PostsProvider>
                    }
                  />
                  <Route
                    path="/admin/big-banners"
                    element={
                      <BigBannerProvider>
                        <ProtectedRoute allowedRoles={["superAdmin"]}>
                          <BigBanners />
                        </ProtectedRoute>
                      </BigBannerProvider>
                    }
                  />
                  <Route
                    path="/admin/small-banners"
                    element={
                      <BigBannerProvider>
                        <ProtectedRoute allowedRoles={["superAdmin"]}>
                          <BigBanners />
                        </ProtectedRoute>
                      </BigBannerProvider>
                    }
                  />
                  <Route
                    path="/admin/big-fillers"
                    element={
                      <BigBannerProvider>
                        <ProtectedRoute allowedRoles={["superAdmin"]}>
                          <BigBanners />
                        </ProtectedRoute>
                      </BigBannerProvider>
                    }
                  />
                  <Route
                    path="/admin/small-fillers"
                    element={
                      <BigBannerProvider>
                        <ProtectedRoute allowedRoles={["superAdmin"]}>
                          <BigBanners />
                        </ProtectedRoute>
                      </BigBannerProvider>
                    }
                  />
                  <Route
                    path="/admin/requests"
                    element={
                        <ProtectedRoute allowedRoles={["superAdmin"]}>
                          <Requests />
                        </ProtectedRoute>
                    }
                  />
                   <Route
                    path="/user-requests"
                    element={
                        <ProtectedRoute>
                          <UserRequests />
                        </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/user-settings"
                    element={
                      <PostsProvider>
                        <ProtectedRoute>
                          <UserSettings />
                        </ProtectedRoute>
                      </PostsProvider>
                    }
                  />
                  <Route
                    path="/payment-success"
                    element={
                      <ProtectedRoute>
                        <PaymentSuccess />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/payment-failed"
                    element={
                      <ProtectedRoute>
                        <PaymentFailed />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/not-authorized" element={<NotAuthorized />} />
                </Routes>
              </Router>
            </RequestProvider>
          </PaymentProvider>
        </PostsProvider>
      </CarProvider>
    </AuthProvider>
  );
}

export default App;
