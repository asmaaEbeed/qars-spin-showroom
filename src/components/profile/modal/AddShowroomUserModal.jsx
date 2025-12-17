import { useState } from 'react'
import BaseModal from '../../common/BaseModal'
import SwitchSelect from '../../common/SwitchSelect';
import { useParams } from 'react-router-dom';
import { useShowroomContext } from '../../../context/ShowroomContext';

const AddShowroomUserModal = ({ open, setOpen }) => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false)

    const { addNewShowroomUser, getPartnerUsers } = useShowroomContext()

    const initialFormData = {
        email: "",
        mobile: "",
        fullName: "",
        jobTitle: "",
        approvePosts: true,
        createPosts: true,
        dashboardReports: true,
        billingPayments: true,
        partnerId: id
    }
    const [formData, setFormData] = useState(initialFormData);
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await addNewShowroomUser(formData);
            console.log(res);
            if (res.status === 200 || res.status === 201) {
                setFormData(initialFormData);
                getPartnerUsers(id);
                setOpen(false);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
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
                            <div className='flex gap-5 mb-3'>
                                <SwitchSelect value={formData.approvePosts} handleOnChange={(e) => { setFormData({ ...formData, approvePosts: e }) }} />
                                <p>Approve Posts</p>
                            </div>
                            <div className='flex gap-5 mb-3'>
                                <SwitchSelect value={formData.createPosts} handleOnChange={(e) => { setFormData({ ...formData, createPosts: e }) }} />
                                <p>Create Posts</p>
                            </div>
                            <div className='flex gap-5 mb-3'>
                                <SwitchSelect value={formData.dashboardReports} handleOnChange={(e) => { setFormData({ ...formData, dashboardReports: e }) }} />
                                <p>Dashboard Reports</p>
                            </div>
                            <div className='flex gap-5 mb-3'>
                                <SwitchSelect value={formData.billingPayments} handleOnChange={(e) => { setFormData({ ...formData, billingPayments: e }) }} />
                                <p>Billing Payments</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-3 p-4 sticky bottom-0 z-50 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <button
                        type="button"
                        onClick={() => { setFormData(initialFormData); setOpen(false); }}
                        className="px-6 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={loading}
                        type="submit"
                        className="flex px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                        {loading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mx-2"></div>}
                        <p>{!loading ? "Save" : "Saving..."}</p>
                    </button>
                </div>
            </form>
        </BaseModal>
    )
}

export default AddShowroomUserModal