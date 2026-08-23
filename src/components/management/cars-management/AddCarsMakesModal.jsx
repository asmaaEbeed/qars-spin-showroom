import { useEffect, useState } from 'react'
import BaseModal from '../../common/BaseModal';
import SwitchSelect from '../../common/SwitchSelect';
import UploadBannerImg from '../../banners/UploadBannerImg';
import { useCarsManagement } from '../../../context/CarsManagementContext';


const initialFormData = {
    makeId: "",
    MakeNamePl: "",
    MakeNameSl: "",
    LogoFile: "",
    IsActive: true,
}

const AddCarsMakesModal = ({ selectedCarMake = null,
    open,
    onClose,
    createCarMake,
    createCarMakesLoading,
    updateCarMake,
    updateCarMakeLoading,
    setAddClassOpen,
}) => {
    const [viewFile, setViewFile] = useState("")
    const [imageError, setImageError] = useState(false)
    const [makeExistBefore, setMakeExistBefore] = useState(false)




    const { selectedCarMakeId, carsMakesList, setSelectedCarMakeId } = useCarsManagement()

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (!open) return;
        // Edit
        if (selectedCarMake) {
            setFormData({
                makeId: selectedCarMake.makeId || "",
                MakeNamePl: selectedCarMake.makeNamePl || "",
                MakeNameSl: selectedCarMake.makeNameSl || "",
                LogoFile: selectedCarMake.imageUrl || "",
                IsActive: selectedCarMake.isActive || true,
            });
            setViewFile(selectedCarMake.imageUrl);
            return;
        }
        // new
        // setFormData({
        //     ...initialFormData,
        //     makeId: selectedCarMakeId ?? "",
        // });
        setViewFile("");
    }, [open, selectedCarMakeId, selectedCarMake]);

    const handleSetUploadFile = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => setViewFile(reader.result);
        reader.onload = () => setFormData({ ...formData, LogoFile: file });
        reader.readAsDataURL(file);
    }
    useEffect(() => {
        setImageError(false)
        if (!selectedCarMake?.makeId) setViewFile("")
    }, [open, selectedCarMake])


    async function onSubmit(e, openClassModal) {
        e.preventDefault()
        if (openClassModal && formData.makeId) setSelectedCarMakeId(formData.makeId)

        const isExist = carsMakesList.some(make => make.makeNamePl.toLowerCase().trim() === formData.MakeNamePl.toLowerCase().trim());
        const noImage = formData.LogoFile === ""

        if (noImage) { setImageError(true); }

        if (!formData.makeId && isExist) {
            setMakeExistBefore(true)
            // show error message
        }

        if (noImage || isExist) return;

        if (formData.makeId) {
            const res = await updateCarMake(formData)
            if (res.status === 200 || res.data.makeId) {
                if (openClassModal) {
                    setAddClassOpen(true)
                    onClose()
                } else
                    onClose()
            }
        } else {
            const res = await createCarMake(formData);
            if (res.status === 200 || res.data.makeId) {
                setFormData(initialFormData);
                if (openClassModal) {
                    setAddClassOpen(true)
                    onClose()
                }
            }
        }
    }

    useEffect(() => {
        if (formData.LogoFile) setImageError(false)
    }, [formData])

    return (
        <BaseModal title={`${selectedCarMake?.makeId ? "Edit" : "Create"} a Car Make`} open={open} setOpen={onClose}>
            <form className=" space-y-6">
                <div className="p-6">
                    <p className="m-auto text-center text-red-500 ml-24">*</p>
                    <UploadBannerImg viewFile={viewFile} setUploadFile={(file) => handleSetUploadFile(file)} imgLayoutStyle="h-[100px] w-[100px] rounded-full object-cover m-auto" />

                    {imageError && <p className='m-auto text-red-600 text-center mb-4'>Please add model logo.</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Make Name (PL) */}
                        <div>
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
                                    value={formData.MakeNamePl}
                                    onChange={(e) => {
                                        setMakeExistBefore(false)
                                        const sanitized = e.target.value.replace(/[\u0600-\u06FF]/g, "");;
                                        setFormData({ ...formData, MakeNamePl: sanitized })
                                    }}
                                    className={`w-full focus-visible:outline-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 bg-white`}
                                />

                            </div>
                            {makeExistBefore && <p className='m-auto text-red-600 mb-4'>This car make is existing</p>}
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
                                value={formData.MakeNameSl}
                                onChange={(e) => {
                                    // const sanitized = e.target.value.replace(/[A-Za-z]/g, "");
                                    setFormData({ ...formData, MakeNameSl: e.target.value });
                                }}
                                className="w-full text-right focus-visible:outline-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 bg-white"
                            />
                        </div>
                        {/* <div className='flex gap-5 mb-3'>
                            <SwitchSelect
                                value={formData.IsActive}
                                handleOnChange={(e) => { setFormData({ ...formData, IsActive: e }) }}
                            />
                            <p>{formData.IsActive ? "Active" : "Inactive"}</p>
                        </div> */}

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
                        disabled={createCarMakesLoading || updateCarMakeLoading}
                        type="button"
                        onClick={e => onSubmit(e, false)}
                        className="flex px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                        {((createCarMakesLoading || updateCarMakeLoading)) ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mx-2"></div> : null}
                        <p>{!createCarMakesLoading && !updateCarMakeLoading ? "Save" : "Saving..."}</p>
                    </button>
                    <button
                        disabled={createCarMakesLoading || updateCarMakeLoading}
                        type="button"
                        onClick={e => onSubmit(e, true)}
                        className="flex px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                    >
                        {((createCarMakesLoading || updateCarMakeLoading)) ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mx-2"></div> : null}
                        <p>{!createCarMakesLoading && !updateCarMakeLoading ? "Save & Add Class" : "Saving..."}</p>
                    </button>
                </div>
            </form>
        </BaseModal>
    )
}

export default AddCarsMakesModal