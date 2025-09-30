

import { FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

export default function NotAuthorized() {
  const navigate = useNavigate();

  return (
    <MainLayout>
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
        <FiAlertCircle className="w-10 h-10 text-red-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>
      <p className="text-gray-500 mb-6">
        You don’t have permission to view this page.  
        Please contact your administrator if you believe this is a mistake.
      </p>
      <button onClick={() => navigate("/dashboard")}>
        Back to Home
      </button>
    </div>
    </MainLayout>
  );
}

