import { useEffect, useState } from 'react'
import BaseModal from '../../components/common/BaseModal'
import { usePaymentContext } from '../../context/PaymentContext'
import { toast } from 'react-toastify'
import { IoCheckmarkCircle } from 'react-icons/io5'


const SelectCurrencyModal = ({ open, setOpen }) => {
    const { paymentMethod, onPaymentExecute, paymentExecuteLoading, requestType, masterOrderId } = usePaymentContext()
    // const { showroomInitData } = usePosts();

    const [formData, setFormData] = useState({
        PaymentMethodId: "",
        amount: 0,
        type: null,
        masterOrderId: null,
    })
    const [paymentMethodError, setPaymentMethodError] = useState(false)



    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            amount: requestType?.price,
            type: requestType,
            masterOrderId,
        }))
    }, [requestType, masterOrderId])


    const onSubmit = async (e) => {
        e.preventDefault()
        if (!formData.PaymentMethodId) { setPaymentMethodError(true); return };


        try {
            const res = await onPaymentExecute(formData)
            if (res.status === 200 || res.status === 201) {
                toast.success(res.data.Message || "Payment started successfully!");
                if (res.data.raw) {
                    const paymentUrl = res.data.raw.PaymentUrl
                    console.log(paymentUrl)
                    window.location.href = paymentUrl
                }
            }
        } catch (e) {
            toast.dismiss()
            toast.error(e.data?.Message || "Your Request sent failed");
            console.error(e);
        }
    }


    return (
        <BaseModal title="Payment" open={open} setOpen={setOpen} className='relative '>
            <form onSubmit={onSubmit}>
                <div className='p-6 overflow-auto max-h-[620px]'>
                    {/* <div className='flex flex-col mb-8'>
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
                                    maxHeight: "150px",
                                    overflowY: "auto",
                                    zIndex: 1000,
                                }),
                            }}

                            formatOptionLabel={(option) => (
                                <div className="grid grid-cols-5 items-center space-x-2">
                                    <img
                                        className="col-span-1 w-6 h-6 rounded-full border border-gray-300"
                                        src={option.ImageUrl}
                                        alt={option.PaymentCurrencyIso}
                                    />
                                    <span className="col-span-2">{option.PaymentMethodEn}</span>
                                    <span className="col-span-2">{option.PaymentCurrencyIso}</span>
                                </div>
                            )}
                        />}
                        {error.PaymentMethodId && <div className='text-xs text-red-500'>Please, select payment method</div>}
                    </div> */}

                    {/* Amount Summary */}
                    <AmountSummary formData={formData} requestType={requestType} />

                    {/* Payment Method List */}
                    <PaymentMethodList paymentMethod={paymentMethod} formData={formData} setFormData={setFormData} error={paymentMethodError} setError={setPaymentMethodError} />

                </div>
                <div className="flex justify-end space-x-3 p-4 w-full bottom-0 z-50 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                    <button
                        type="button"
                        onClick={() => { setFormData({ PaymentMethodId: "" }); setOpen(false); }}
                        className="px-6 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 
                        bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                        transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={paymentExecuteLoading}
                        type="submit"
                        className="flex px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                        {paymentExecuteLoading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mx-2"></div>}
                        <p>
                            {!paymentExecuteLoading ? "Proceed to Payment" : "Processing..."}
                        </p>

                    </button>
                </div>
            </form>
        </BaseModal>
    )
}

export default SelectCurrencyModal

const AmountSummary = ({ formData, requestType }) => {
    return (
        <div className="mb-6">
            <div className="grid gap-3 max-h-96 overflow-auto rounded-xl border border-primary-100 bg-gradient-to-r from-primary-50 to-white p-3 shadow-sm">
                <p className="text-xs font-medium text-gray-500 mb-1">
                    Amount to Pay
                </p>

                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-3xl font-bold text-gray-900">
                            {formData.amount}
                            <span className="text-base font-medium text-gray-500 ml-1">
                                {requestType?.currency || "QAR"}
                            </span>
                        </p>

                    </div>

                    <div className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-medium">
                        Secure Payment
                    </div>
                </div>
            </div>
        </div>
    )
}

const PaymentMethodList = ({ paymentMethod, formData, setFormData, error, setError }) => {
    return (
        <div className="flex flex-col ">
            <div className="mb-3">
                <p className="text-sm font-semibold text-gray-800">
                    Choose a payment method
                </p>
                <p className="text-xs text-gray-500">
                    Select your preferred payment option
                </p>
            </div>


            <div className="grid gap-3 max-h-96 overflow-auto border rounded-md border-primary-100 bg-gradient-to-r from-primary-50 to-white p-3 shadow-sm">
                {paymentMethod.map((method) => {
                    const isSelected = method.PaymentMethodId === formData.PaymentMethodId

                    return (
                        <button
                            aria-pressed={isSelected}
                            type="button"
                            key={method.PaymentMethodId}
                            onClick={() => {
                                setError(true)
                                setFormData({
                                    ...formData,
                                    PaymentMethodId: method.PaymentMethodId,
                                })
                            }}
                            className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left ${isSelected
                                ? "border-primary-500 bg-primary-50 shadow-md"
                                : "border-gray-200 bg-white hover:border-primary-300 hover:shadow-sm"
                                }
                                        `}>
                            {/* Left side */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={method.ImageUrl}
                                    alt={method.PaymentCurrencyIso}
                                    className="w-11 h-11 rounded-full border border-gray-200 bg-white shadow-sm"
                                />


                                <div>
                                    <p className="text-sm font-medium text-gray-800">
                                        {method.PaymentMethodEn}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {method.PaymentCurrencyIso}
                                    </p>
                                </div>
                            </div>

                            {/* Right side (check icon) */}
                            {isSelected && (
                                <IoCheckmarkCircle
                                    className="w-6 h-6 text-primary-600 transition-transform duration-200 group-hover:scale-105"
                                />
                            )}

                        </button>
                    )
                })}
            </div>

            {error.PaymentMethodId && (
                <p className="text-xs text-red-500 mt-2">
                    Please, select payment method
                </p>
            )}
        </div>
    )
}