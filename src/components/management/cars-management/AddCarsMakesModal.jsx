import React, { useEffect, useMemo, useState } from 'react'
import BaseModal from '../../common/BaseModal';
import SwitchSelect from '../../common/SwitchSelect';

const AddCarsMakesModal = ({ selectedCarMake = null, open, onClose, createCarMake, createCarMakesLoading }) => {

    const initialFormData = useMemo(() => ({
        makeNamePl: "",
        makeNameSl: "",
        imageFileName: "",
        imageUrl: "",
        isActive: true,

    }), [])
    const [formData, setFormData] = useState(initialFormData);

    function onSubmit(e) {
        e.preventDefault()
        createCarMake(formData);
    }

    useEffect(() => {
        if (selectedCarMake) {
            setFormData({
                ...selectedCarMake,
                isActive: selectedCarMake.isActive || true,
            });
        } else {
            setFormData(initialFormData);
        }
    }, [selectedCarMake, initialFormData]);

    return (
        <BaseModal title="Create New Car Make" open={open} setOpen={onClose}>
            <form className=" space-y-6" onSubmit={(e) => onSubmit(e)}>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Make Name (PL) */}
                        <div className="space-y-2">
                            <label
                                className="block text-sm font-medium text-gray-700"
                            >
                                Make Name (En)<span className="text-red-500">*</span>
                            </label>
                            <input
                                required
                                placeholder="Enter Make Name (PL)"
                                type="text"
                                value={formData.makeNamePl}
                                onChange={(e) => {
                                    const sanitized = e.target.value.replace(/[\u0600-\u06FF]/g, "");;
                                    setFormData({ ...formData, makeNamePl: sanitized })
                                }}
                                className={`w-full focus-visible:outline-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 bg-white`}
                            />

                        </div>
                        {/* Make Name (SL) */}
                        <div className="space-y-2">
                            <label
                                htmlFor="mobile"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Make Name (Ar)<span className="text-red-500">*</span>
                            </label>
                            <input
                                required
                                placeholder="اسم الصنع"
                                type="text"
                                value={formData.makeNameSl}
                                onChange={(e) => {
                                    const sanitized = e.target.value.replace(/[A-Za-z]/g, "");
                                    setFormData({ ...formData, makeNameSl: sanitized });
                                }}
                                className="w-full text-right focus-visible:outline-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 bg-white"
                            />
                        </div>
                        <div className='flex gap-5 mb-3'>
                            <SwitchSelect
                                value={formData.isActive}
                                handleOnChange={(e) => { setFormData({ ...formData, isActive: e }) }}
                            />
                            <p>{formData.isActive ? "Active" : "Inactive"}</p>
                        </div>

                    </div>
                </div>

                <div className="flex justify-end space-x-3 p-4 sticky bottom-0 z-50 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <button
                        type="button"
                        onClick={() => { setFormData(initialFormData); onClose(); }}
                        className="px-6 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={createCarMakesLoading}
                        type="submit"
                        className="flex px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                        {createCarMakesLoading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mx-2"></div>}
                        <p>{!createCarMakesLoading ? "Save" : "Saving..."}</p>
                    </button>
                </div>
            </form>
        </BaseModal>
    )
}

export default AddCarsMakesModal