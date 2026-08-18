import { useEffect, useMemo, useState } from 'react'
import BaseModal from '../../common/BaseModal';
import SwitchSelect from '../../common/SwitchSelect';
import { useCarsManagement } from '../../../context/CarsManagementContext';

const initialFormData = {
    makeId: "",
    classId: "",
    modelId: "",
    modelNamePl: "",
    modelNameSl: "",
    isActive: true,
};

const AddCarsModelsModal = ({
    selectedCarModel = null,
    open,
    onClose,

}) => {

    const {
        selectedCarMakeId,
        selectedCarClassId,
        createCarModel,
        createCarModelLoading,
        updateCarModel,
        updateCarModelLoading,
        createCarModelSuccess
    } = useCarsManagement()


    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (!open) return;

        if (selectedCarModel) {
            setFormData({
                makeId: selectedCarModel.makeId ?? "",
                classId: selectedCarModel.classId ?? "",
                modelId: selectedCarModel.modelId ?? "",
                modelNamePl: selectedCarModel.modelNamePl ?? "",
                modelNameSl: selectedCarModel.modelNameSl ?? "",
                isActive: selectedCarModel.isActive ?? true,
            });

            return;
        }

        setFormData({
            ...initialFormData,
            makeId: selectedCarMakeId ?? "",
            classId: selectedCarClassId ?? "",
        });
    }, [
        open,
        selectedCarModel,
        selectedCarMakeId,
        selectedCarClassId,
    ]);

    async function onSubmit(e) {
        e.preventDefault()
        if (formData.modelId) {
            const res = await updateCarModel(formData, selectedCarMakeId)
            console.log(res);
            if (res.status === 200 || res.data.modelId) {
                onClose();
            }
        } else {
            createCarModel(formData);
        }
    }


    useEffect(() => {
        if (createCarModelSuccess) {
            setFormData(prev => ({
                ...prev, modelId: "",
                modelNamePl: "",
                modelNameSl: "",
                isActive: true,
            }))
        }
    }, [createCarModelSuccess, initialFormData])



    return (
        <BaseModal title={`${selectedCarModel?.modelId ? "Edit" : "Create"}  a Car Model`} open={open} setOpen={onClose}>
            <form className=" space-y-6" onSubmit={(e) => onSubmit(e)}>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Model Name (PL) */}
                        <div className="space-y-2">
                            <label
                                className="block text-sm font-medium text-gray-700" htmlFor='modelNamePl'
                            >
                                Model Name (En)<span className="text-red-500">*</span>
                            </label>
                            <input
                                id="modelNamePl"
                                required
                                placeholder="Enter Model Name (PL)"
                                type="text"
                                value={formData.modelNamePl}
                                onChange={(e) => {
                                    const sanitized = e.target.value.replace(/[\u0600-\u06FF]/g, "");;
                                    setFormData({ ...formData, modelNamePl: sanitized })
                                }}
                                className={`w-full focus-visible:outline-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 bg-white`}
                            />

                        </div>
                        {/* model Name (SL) */}
                        <div className="space-y-2">
                            <label
                                htmlFor="modelNameSl"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Model Name (Ar)<span className="text-red-500">*</span>
                            </label>
                            <input
                                id="modelNameSl"
                                required
                                placeholder="اسم الصنع"
                                type="text"
                                value={formData.modelNameSl}
                                onChange={(e) => {
                                    // const sanitized = e.target.value.replace(/[A-Za-z]/g, "");
                                    setFormData({ ...formData, modelNameSl: e.target.value });
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
                        disabled={createCarModelLoading || updateCarModelLoading}
                        type="submit"
                        className="flex px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                        {createCarModelLoading || updateCarModelLoading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mx-2"></div> : null}
                        <p>{!createCarModelLoading && !updateCarModelLoading ? "Save" : "Saving..."}</p>
                    </button>
                </div>
            </form>

        </BaseModal>
    )
}

export default AddCarsModelsModal