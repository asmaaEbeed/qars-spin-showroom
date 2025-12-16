import React, { useEffect, useState } from 'react'
import BaseModal from '../../components/common/BaseModal'
import { usePaymentContext } from '../../context/PaymentContext'
import { toast } from 'react-toastify'
import Select from 'react-select'
import { usePosts } from '../../context/PostsContext'

const mobileRegex = /^[0-9]{3,11}$/;

const SelectCurrencyModal = ({ open, setOpen }) => {
    const { paymentMethod, onPaymentExecute, paymentExecuteLoading, requestType } = usePaymentContext()
    const { showroomInitData } = usePosts();

    const [formData, setFormData] = useState({
        PaymentMethodId: "",
        customerName: "",
        email: "",
        mobile: "",
        amount: 0
    })
    const [error, setError] = useState({})

    useEffect(() => {
        if (showroomInitData) {
            setFormData(prev => ({
                ...prev,
                customerName: showroomInitData.partnerNamePl,
                email: showroomInitData.notificationEmail,
                mobile: showroomInitData.contactPhone,

            }))
        }
    }, [showroomInitData])

    useEffect(() => {
        setFormData(prev => ({...prev, amount: requestType.price, type: requestType}))
    }, [requestType])

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!formData.PaymentMethodId) { setError({ ...error, PaymentMethodId: true }); return };
        const mobile = formData.mobile.trim().replace(/\s+/g, "");

        if (!mobileRegex.test(mobile)) {
            setError({ ...error, mobile: true });
            return
        }
        try {
            const res = await onPaymentExecute(formData)
            if (res.status === 200 || res.status === 201) {
                toast.success(res.data.Message || "Payment started successfully!");
                if (res.data.Data) {
                    const paymentUrl = res.data.Data.PaymentURL
                    window.open(paymentUrl, "_blank", "noopener,noreferrer");
                }

            }
        } catch (e) {
            toast.dismiss()
            toast.error(e.data?.Message || "Your Request sent failed");
            console.error(e);
        }
    }


    return (
        <BaseModal title="Payment" open={open} setOpen={setOpen} className='relative h-[480px] '>
            <form onSubmit={onSubmit}>
                <div className='p-6 overflow-auto h-[360px]'>
                    {/* {Object.keys(error).length && <div className="flex items-center bg-red-100 p-3 rounded-md mb-2">
                        <div className="flex-shrink-0">
                            <XCircleIcon className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-red-800">{error}</p>
                        </div>
                    </div>} */}
                    {/* {paymentMethod.length && paymentMethod.map((option => <div key={option.PaymentMethodId}
                        className={`grid grid-cols-5 items-center space-x-2 gap-4 p-2 hover:bg-gray-100 cursor-pointer
                             ${option.PaymentMethodId === formData.PaymentMethodId ? "bg-primary-50" : ""}`}
                        onClick={(e) => onSelectPaymentMethod(e, option)}>
                        <img
                            className="col-span-1 w-8 h-8 rounded-full border border-gray-300"
                            src={option.ImageUrl}
                            alt={option.PaymentCurrencyIso}
                        />
                        <span className="col-span-2">{option.PaymentMethodEn}</span>
                        <span className="col-span-1">{option.PaymentCurrencyIso}</span>
                        <div className=' col-span-1'>
                            {option.PaymentMethodId === formData.PaymentMethodId && <CheckCircleIcon className="w-5 h-5 text-green-700" />}
                        </div>
                    </div>))} */}

                    <div className='flex flex-col mb-8'>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Select Payment <span className="text-red-500">*</span>
                        </label>

                        {paymentMethod.length && <Select
                            options={paymentMethod}
                            getOptionLabel={(option) => option.PaymentMethodEn}
                            getOptionValue={(option) => String(option.PaymentMethodId)}
                            value={
                                paymentMethod?.find(
                                    (item) => item.PaymentMethodId === formData?.PaymentMethodId
                                ) || null
                            }
                            onChange={(selected) => { setError({ ...error, PaymentMethodId: false }); setFormData({ ...formData, PaymentMethodId: selected.PaymentMethodId }) }}
                            placeholder="Select Payment Method"
                            isClearable
                            className="w-full "
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    width: "100%",
                                    borderColor: "d1d5db",
                                    boxShadow: state.isFocused ? "0 0 0 1px #d6a23a" : "none",
                                    "&:hover": {
                                        borderColor: state.isFocused && "#d6a23a",
                                    },

                                }),
                                menuList: (base) => ({
                                    ...base,
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                }),
                            }}

                            formatOptionLabel={(option) => (
                                <div className="grid grid-cols-5 items-center space-x-2">
                                    <img
                                        className="col-span-1 w-8 h-8 rounded-full border border-gray-300"
                                        src={option.ImageUrl}
                                        alt={option.PaymentCurrencyIso}
                                    />
                                    <span className="col-span-2">{option.PaymentMethodEn}</span>
                                    <span className="col-span-2">{option.PaymentCurrencyIso}</span>
                                </div>
                            )}
                        />}
                        {error.PaymentMethodId && <div className='text-xs text-red-500'>Please, select payment method</div>}
                    </div>
                    <div className='grid grid-cols-2 gap-8'>
                        <div className='flex flex-col mb-2'>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Amount
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <input className={`w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-primary-500 focus-visible:outline-none focus:border-primary-500 pr-9`} type="number" value={formData.amount} readOnly />
                            </div>
                        </div>
                        {/* Customer Name */}
                        <div className='flex flex-col mb-2'>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Customer Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <input className={`w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 pr-9 focus-visible:outline-none`} type="text" value={formData.customerName}
                                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} required />
                            </div>
                        </div>
                        {/* Customer Name */}
                        <div className='flex flex-col mb-2'>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Customer Phone <span className="text-red-500">*</span>
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <input className={`w-full px-3 py-1.5 border ${error.mobile ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-primary-500 focus:border-primary-500 pr-9 focus-visible:outline-none`} type="text" value={formData.mobile}
                                    onChange={(e) => { setError({ ...error, mobile: "" }); setFormData({ ...formData, mobile: e.target.value }) }} required />
                            </div>
                            {error.mobile && <div className='text-xs text-red-500'>Phone number must:<br />
                                • Contain 3 to 11 digits<br />
                                • Start with numbers only<br />
                                • English numbers only"</div>}
                        </div>
                        {/* Customer Email */}
                        <div className='flex flex-col mb-2'>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Customer Email <span className="text-red-500">*</span>
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <input className={`w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 pr-9 focus-visible:outline-none`} type="text" value={formData.email} required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex justify-end space-x-3 p-4 absolute w-full bottom-0 z-50 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <button
                        type="button"
                        onClick={() => { setFormData({ PaymentMethodId: "" }); setOpen(false); }}
                        className="px-6 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={paymentExecuteLoading}
                        type="submit"
                        className="flex px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                        {paymentExecuteLoading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mx-2"></div>}
                        <p>{!paymentExecuteLoading ? "Proceed To pay" : "Proceeding..."}</p>
                    </button>
                </div>
            </form>
        </BaseModal>
    )
}

export default SelectCurrencyModal