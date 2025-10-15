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

function App() {
  return (
    <AuthProvider>
      <CarProvider>
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
                <PostsProvider>
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                </PostsProvider>
              }
            />
            <Route
              path="/admin/dealer/:id/dashboard"
              element={
                <PostsProvider>
                  <ProtectedRoute allowedRoles={["superAdmin"]}>
                    <Dashboard />
                  </ProtectedRoute>
                </PostsProvider>
              }
            />
            <Route
              path="/profile"
              element={
                <PostsProvider>
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                </PostsProvider>
              }
            />
            <Route
              path="/admin/dealer/:id/profile"
              element={
                <PostsProvider>
                  <ProtectedRoute allowedRoles={["superAdmin"]}>
                    <Profile />
                  </ProtectedRoute>
                </PostsProvider>
              }
            />
            <Route
              path="/showroom/posts"
              element={
                <PostsProvider>
                  <ProtectedRoute>
                    <Posts />
                  </ProtectedRoute>
                </PostsProvider>
              }
            />
            <Route
              path="/admin/dealer/:id/showroom/posts"
              element={
                <PostsProvider>
                  <ProtectedRoute allowedRoles={["superAdmin"]}>
                    <Posts />
                  </ProtectedRoute>
                </PostsProvider>
              }
            />
            <Route
              path="/showroom/posts/:code"
              element={
                <PostsProvider>
                  <ProtectedRoute>
                    <PostDetails />
                  </ProtectedRoute>
                </PostsProvider>
              }
            />
            <Route
              path="/admin/dealer/:id/showroom/posts/:code"
              element={
                <PostsProvider>
                  <ProtectedRoute allowedRoles={["superAdmin"]}>
                    <PostDetails />
                  </ProtectedRoute>
                </PostsProvider>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/showroom"
              element={
                <PostsProvider>
                  <ProtectedRoute>
                    <Showroom />
                  </ProtectedRoute>
                </PostsProvider>
              }
            />
            <Route
              path="/admin/dealer/:id/showroom"
              element={
                <PostsProvider>
                  <ProtectedRoute allowedRoles={["superAdmin"]}>
                    <Showroom />
                  </ProtectedRoute>
                </PostsProvider>
              }
            />

            <Route
              path="/admin/showrooms"
              element={
                <PostsProvider>
                  <ProtectedRoute allowedRoles={["superAdmin"]}>
                    <ShowRooms />
                  </ProtectedRoute>
                </PostsProvider>
              }
            />
            <Route
              path="/admin/superAdmin-panel"
              element={
                <PostsProvider>
                  <ProtectedRoute allowedRoles={["superAdmin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                </PostsProvider>
              }
            />
            <Route
              path="/admin/posts"
              element={
                <PostsProvider>
                  <ProtectedRoute allowedRoles={["superAdmin"]}>
                    <Posts />
                  </ProtectedRoute>
                </PostsProvider>
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
            <Route path="/not-authorized" element={<NotAuthorized />} />
          </Routes>
        </Router>
      </CarProvider>
    </AuthProvider>
  );
}

export default App;
