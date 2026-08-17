import { useEffect, useMemo, useState } from 'react'
import BaseModal from '../../common/BaseModal';
import SwitchSelect from '../../common/SwitchSelect';
import { useCarsManagement } from '../../../context/CarsManagementContext';

const AddCarsClassesModal = ({
    selectedCarClass = null,
    open,
    onClose,
    createCarClass,
    createCarClassesLoading,
    updateCarClass,
    updateCarClassLoading,
    setAddModelOpen
}) => {

    const { selectedCarMakeId, classUpdatedSuccess, setSelectedCarClassId, carsClassList, selectedCarClassId } = useCarsManagement()

    const initialFormData = useMemo(() => ({
        makeId: selectedCarMakeId ? selectedCarMakeId : "",
        classId: "",
        classNamePl: "",
        classNameSl: "",
        isActive: true,
    }), [])

    const [formData, setFormData] = useState(initialFormData);
    const [openModal, setOpenModal] = useState(false)
    const [classExistBefore, setClassExistBefore] = useState(false)

    useEffect(() => {
        if (open)
            setFormData({ ...formData, makeId: selectedCarMakeId })
    }, [selectedCarMakeId, open])

    function onSubmit(e, openModal) {
        e.preventDefault()
        setOpenModal(openModal)
        if (openModal && selectedCarMakeId && formData.classId) setSelectedCarClassId(formData.classId)
        if (!formData.classId && carsClassList.some(carClass => carClass.classNamePl.toLowerCase().trim() === formData.classNamePl.toLowerCase().trim())) {
            setClassExistBefore(true)
            // show error message
            return;
        }
        formData.classId ? updateCarClass(formData, selectedCarMakeId) : createCarClass(formData);
    }

    useEffect(() => {
        if (selectedCarClass) {
            setFormData({
                makeId: selectedCarClass.makeId || "",
                classId: selectedCarClass.classId || "",
                classNamePl: selectedCarClass.classNamePl || "",
                classNameSl: selectedCarClass.classNameSl || "",
                isActive: selectedCarClass.isActive || true,
            });
        } else {
            setFormData(initialFormData);

        }
    }, [selectedCarClass, initialFormData]);

    useEffect(() => {
        if (classUpdatedSuccess) onClose()
    }, [classUpdatedSuccess, onClose])



    useEffect(() => {
        if (selectedCarClassId && selectedCarMakeId ) {
            if (openModal) {
                setAddModelOpen(true)
            }
            // onClose();
        }
    }, [openModal, selectedCarClassId, selectedCarMakeId, setAddModelOpen])


    return (
        <BaseModal title={`${selectedCarClass?.classId ? "Edit" : "Create"}  a Car Class`} open={open} setOpen={onClose}>
            <form className=" space-y-6" onSubmit={(e) => onSubmit(e)}>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Make Name (PL) */}
                        <div className="space-y-2">
                            <label
                                className="block text-sm font-medium text-gray-700"
                            >
                                Class Name (En)<span className="text-red-500">*</span>
                            </label>
                            <input
                                required
                                placeholder="Enter Make Name (PL)"
                                type="text"
                                value={formData.classNamePl}
                                onChange={(e) => {
                                    setClassExistBefore(false)
                                    const sanitized = e.target.value.replace(/[\u0600-\u06FF]/g, "");;
                                    setFormData({ ...formData, classNamePl: sanitized })
                                }}
                                className={`w-full focus-visible:outline-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 bg-white`}
                            />
                            {classExistBefore && <p className='m-auto text-red-600 mb-4'>This car class is existing.</p>}

                        </div>
                        {/* Make Name (SL) */}
                        <div className="space-y-2">
                            <label
                                htmlFor="mobile"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Class Name (Ar)<span className="text-red-500">*</span>
                            </label>
                            <input
                                required
                                placeholder="اسم الصنع"
                                type="text"
                                value={formData.classNameSl}
                                onChange={(e) => {
                                    // const sanitized = e.target.value.replace(/[A-Za-z]/g, "");
                                    setFormData({ ...formData, classNameSl: e.target.value });
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
                        disabled={createCarClassesLoading || updateCarClassLoading}
                        type="submit"
                        className="flex px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                        {createCarClassesLoading || updateCarClassLoading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mx-2"></div> : null}
                        <p>{!createCarClassesLoading && !updateCarClassLoading ? "Save" : "Saving..."}</p>
                    </button>
                    <button
                        disabled={createCarClassesLoading || updateCarClassLoading}
                        type="button"
                        onClick={e => onSubmit(e, true)}
                        className="flex px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                    >
                        {((createCarClassesLoading || updateCarClassLoading) && openModal) ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mx-2"></div> : null}
                        <p>{!createCarClassesLoading && !updateCarClassLoading ? "Save & Add Model" : "Saving..."}</p>
                    </button>
                </div>
            </form>

        </BaseModal>
    )
}

export default AddCarsClassesModal