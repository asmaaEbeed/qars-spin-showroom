
// src/pages/SelectShowroomHint.js
import React from "react";
import MainLayout from "../layout/MainLayout";
import { FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SelectShowroomHint() {
    return (
        <MainLayout>
            <div className="flex flex-col items-center justify-center h-full text-center px-4 min-h-[calc(100vh-200px)]">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 mb-6">
                    <FaBuilding />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    No showroom selected
                </h1>
                <p className="text-gray-500 max-w-md">
                    Please select a showroom from the list to view its dashboard and posts.
                </p>
                <Link to="/admin/showrooms" className="bg-primary hover:bg-primary-600 text-white py-2 px-4 rounded mt-4">
                    Select Showroom
                </Link>
            </div>
        </MainLayout>
    );
}
