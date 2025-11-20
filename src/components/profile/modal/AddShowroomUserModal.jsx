import React, { useState } from 'react'
import BaseModal from '../../common/BaseModal'
import { Switch } from '@headlessui/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import SwitchSelect from '../../common/SwitchSelect';

const AddShowroomUserModal = ({ open, setOpen }) => {
    const [formData, setFormData] = useState({
        email: "",
        mobile: "",
        fullName: "",
        jobTitle: "",
        roles: [
            {
                id: "1",
                name: "createPosts",
                value: true
            },
            {
                id: "2",
                name: "dashboardReports",
                value: false
            },
            {
                id: "3",
                name: "approvePosts",
                value: true
            },
            {
                id: "4",
                name: "billingPayments",
                value: false
            }
        ],
    });
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    const handleSwitchRole = (e, id) => {
        setFormData(prev => ({
            ...prev,
            roles: prev.roles.map(r => r.id === id ? { ...r, value: e } : r)
        }))
    }
    return (
        <BaseModal title="Create New User" open={open} setOpen={setOpen}>
            <form className=" space-y-6" onSubmit={(e) => onSubmit(e)}>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Email */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email<span className="text-red-500">*</span>
                            </label>
                            <input
                                required
                                placeholder="Enter Email"
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
                                className={`w-full focus-visible:outline-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 bg-white`}
                            />

                        </div>
                        {/* Mobile */}
                        <div className="space-y-2">
                            <label
                                htmlFor="mobile"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Mobile<span className="text-red-500">*</span>
                            </label>
                            {/* <select
                                id="mobile"
                                value={formData.mobile}
                                className={`w-full focus-visible:outline-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 bg-white`}
                                onChange={(e) => { setFormData({ ...formData, mobile: e.target.value }) }}
                            >
                                {SHOWROOM_KIND.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select> */}
                            <input
                                required
                                placeholder="Enter Mobile"
                                type="text"
                                id="mobile"
                                value={formData.mobile}
                                onChange={(e) => {
                                    const sanitized = e.target.value.replace(/[^0-9+]/g, "");
                                    setFormData({ ...formData, mobile: sanitized });
                                }}
                                className="w-full focus-visible:outline-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 bg-white"
                            />


                        </div>
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label
                                htmlFor="fullName"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Full Name<span className="text-red-500">*</span>
                            </label>
                            <input
                                required
                                id="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => { setFormData({ ...formData, fullName: e.target.value }) }}
                                className={`w-full focus-visible:outline-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 bg-white`}
                            />

                        </div>

                        {/* job title */}
                        <div className="space-y-2">
                            <label
                                htmlFor="jobTitle"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Job Title<span className="text-red-500">*</span>
                            </label>
                            <input
                                required
                                id="jobTitle"
                                type="text"
                                value={formData.jobTitle}
                                onChange={(e) => { setFormData({ ...formData, jobTitle: e.target.value }) }}
                                className={`w-full focus-visible:outline-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 bg-white`}
                            />

                        </div>
                    </div>
                    
                    {/* Roles */}
                    <div>
                        <div className="flex items-center gap-4 mt-8 mb-6">
                            <div className="flex-grow h-[2px] bg-gray-300"></div>

                            <h2 className="text-lg font-semibold text-gray-700 whitespace-nowrap">
                                Assign Roles
                            </h2>

                            <div className="flex-grow h-[2px] bg-gray-300"></div>
                        </div>
                        <div className="text-sm text-gray-600 mb-4">
                            Select one or more roles for the user
                            <span className="text-red-500">*</span>
                        </div>
                        <div className="grid md:grid-cols-2">
                            {formData.roles.map(role =>
                                <div className='flex gap-5 mb-3' key={role.name}>
                                    <SwitchSelect role={role} handleOnChange={handleSwitchRole} />
                                    <p>{role.name}</p>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 p-4 sticky bottom-0 z-50 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <button
                        type="button"
                        onClick={() => { setOpen(false); }}
                        className="px-6 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                        Save
                    </button>
                </div>
            </form>
        </BaseModal>
    )
}

export default AddShowroomUserModal