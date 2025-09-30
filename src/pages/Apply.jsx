import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo/Logo.svg";
import { FiSend } from "react-icons/fi";

const Apply = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div
            style={{
                backgroundImage: 'url("/images/auth-bg.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className="min-h-screen py-4"
        >
            <div className="relative h-full flex items-center justify-center px-2 sm:px-4 lg:px-8">
                <div className="max-w-3xl w-full">
                    {/* Main Card */}
                    <div className="bg-white/35 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 overflow-hidden duration-500">
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-[#554419] to-primary-600 px-4 sm:px-8 py-6 text-center relative overflow-hidden">
                            <div className="relative space-y-4">
                                <div className="bg bg-opacity-40 text-shadow-lg rounded-full">
                                    <img
                                        src={Logo}
                                        alt="Qars Spin Logo"
                                        className="w-1/2 m-auto block"
                                    />
                                </div>
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-8 h-0.5 bg-white/60 rounded-full"></div>
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                    <div className="w-8 h-0.5 bg-white/60 rounded-full"></div>
                                </div>

                                <div className="space-y-2">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white/90">
                                        Apply as Partner
                                    </h2>
                                    <p className="text-lg text-white/80 max-w-2xl mx-auto">
                                        Fill the form below to join our partners network
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="px-8 sm:px-12 py-12">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-secondary-800 mb-1"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                        required
                                            id="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            className="w-full px-4 py-3 rounded-xl border border-secondary-300 focus:ring-2 focus:ring-primary-500 focus:outline-none shadow-sm bg-white/80"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-secondary-800 mb-1"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            className="w-full px-4 py-3 rounded-xl border border-secondary-300 focus:ring-2 focus:ring-primary-500 focus:outline-none shadow-sm bg-white/80"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-medium text-secondary-800 mb-1"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+20 123 456 7890"
                                            className="w-full px-4 py-3 rounded-xl border border-secondary-300 focus:ring-2 focus:ring-primary-500 focus:outline-none shadow-sm bg-white/80"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="company"
                                            className="block text-sm font-medium text-secondary-800 mb-1"
                                        >
                                            Company Name
                                        </label>
                                        <input
                                            id="company"
                                            type="text"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Enter your company name"
                                            className="w-full px-4 py-3 rounded-xl border border-secondary-300 focus:ring-2 focus:ring-primary-500 focus:outline-none shadow-sm bg-white/80"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-secondary-800 mb-1"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us a bit about your company and vehicles..."
                                        className="w-full px-4 py-3 rounded-xl border border-secondary-300 focus:ring-2 focus:ring-primary-500 focus:outline-none shadow-sm bg-white/80"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center px-6 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    <FiSend className="mr-2 h-5 w-5" />
                                    Submit Application
                                </button>
                            </form>

                            <p className="mt-8 text-center text-secondary-600 text-sm">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-primary-600 font-medium hover:underline"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Apply;
