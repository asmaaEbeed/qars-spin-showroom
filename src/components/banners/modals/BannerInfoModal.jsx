import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useBannerForm } from "../hooks/useBannerForm";
import { useBannerContext } from "../../../context/BannerContext";
import UploadBannerImg from "../UploadBannerImg";
import { useBannerUpload } from "../hooks/useBannerUpload";
import { TARGET_TYPE } from "../constants/bannersConstant";
import { toast } from "react-toastify";



export default function BannerInfoModal({
  open,
  setOpen,
  editingBanner,
  handleApprove
}) {

  const TODAY = new Date().toISOString().split('T')[0];
  const [isSmall, setIsSmall] = useState(false)

  const { errors, validateForm, handleBlur } = useBannerForm(editingBanner);
  const { handleAddBanner,
    handleEditBanner,
    loadingAddBigBanner,
    formData,
    setFormData,
    bannerType } = useBannerContext();

  useEffect(() => {
    if (bannerType === "smallFiller" || bannerType === "small") {
      setIsSmall(true)
    } else {
      setIsSmall(false)
    }
    //smallFiller
    // bigFiller
    // small
    // big
  }, [bannerType])

  const {
    viewFile: viewPl,
    uploadFile: uploadPl,
    setUploadFile: setUploadPl,
    loadingUploadBigBanner: loadingPl,
    handleUpload: handleUploadPl,
    reset: resetPl,
  } = useBannerUpload(editingBanner, open, "pl");

  const {
    viewFile: viewSl,
    uploadFile: uploadSl,
    setUploadFile: setUploadSl,
    loadingUploadBigBanner: loadingSl,
    handleUpload: handleUploadSl,
    reset: resetSl,
  } = useBannerUpload(editingBanner, open, "sl");

  const handleSubmit = async (e, formData, validateForm) => {
    e.preventDefault();
    const isValid = validateForm(formData);
    if (!isValid) return;



    const data = { ...formData, BannerType: bannerType }
    let res;

    try {

      if (editingBanner?.bannerId) {

        res = await handleEditBanner(editingBanner?.bannerId, data);
      } else {
        res = await handleAddBanner(data);
      }
      if (res.status === 200) {
        if (uploadPl) {
          await handleUploadPl(res.data.bannerId || editingBanner?.bannerId);
          resetPl();
        }
        if (uploadSl) {
          await handleUploadSl(res.data.bannerId || editingBanner?.bannerId);
          resetSl();
        }
        if (editingBanner.bannerId && (editingBanner.endDate.split('T')[0] < new Date().toISOString().split('T')[0])) {
          handleApprove(editingBanner);
        }
        setOpen(false);

      }
    } catch (e) {
      toast.error(e.response?.data?.title || "Something went worng!");
    }
  }


  return (
    <Transition appear show={open} as={Fragment} >
      <Dialog
        as="div"
        className="relative z-50 "
        onClose={() => setOpen(false)}
      >
        {/* Background */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-50">
                  <div className="flex items-center justify-between">
                    <Dialog.Title className="text-xl font-semibold text-gray-900">
                      {editingBanner?.bannerId ? ((editingBanner.endDate.split('T')[0] < new Date().toISOString().split('T')[0]) ? "Republish Banner" : "Edit Banner") : "Create New Banner"}
                    </Dialog.Title>
                    <button
                      onClick={() => setOpen(false)}
                      className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                      aria-label="Close"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Form */}
                <form className=" space-y-6" onSubmit={(e) =>
                  handleSubmit(
                    e,
                    formData,
                    validateForm,
                  )
                }>
                  <div className="px-6 py-3">
                    {/* Basic Information */}
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Title */}
                        <div className="space-y-2">
                          <label
                            htmlFor="input_title"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="input_title"
                            type="text"
                            value={formData.bannerTitle}
                            onChange={(e) => setFormData({ ...formData, bannerTitle: e.target.value })}
                            onBlur={() => handleBlur("bannerTitle")}
                            placeholder="Enter banner title"
                            className={`w-full px-3 py-2 border ${errors.bannerTitle ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 placeholder-gray-400 transition`}
                          />
                          {errors.bannerTitle && (
                            <p className="mt-1 text-xs text-red-600">{errors.bannerTitle}</p>
                          )}
                        </div>

                        {/* Target */}
                        <div className="space-y-2">
                          <label
                            htmlFor="input_target"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Target Page<span className="text-red-500">*</span>
                          </label>
                          <select
                            id="input_target"
                            value={formData.targetType}
                            className={`w-full px-3 py-2 border ${errors.targetType ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 bg-white`}
                            onChange={(e) => { setFormData({ ...formData, targetType: e.target.value }) }}
                            onBlur={() => handleBlur("targetType")}
                          >
                            {

                              isSmall ? TARGET_TYPE.filter(type => type === "Home Page").map((type) => (
                                <option key={type} value={type}>{type}</option>
                              )) : TARGET_TYPE.map((type) => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                          </select>
                          {errors.targetType && (
                            <p className="mt-1 text-xs text-red-600">{errors.targetType}</p>
                          )}
                        </div>


                        {/* Start Date */}
                        <div className="space-y-2">
                          <label
                            htmlFor="input_start"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Start Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            disabled={editingBanner?.bannerId && editingBanner.endDate >= TODAY}
                            id="input_start"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            onBlur={() => handleBlur("startDate")}
                            className={`w-full px-3 py-2 border ${errors.startDate ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900`}
                          />
                          {errors.startDate && (
                            <p className="mt-1 text-xs text-red-600">{errors.startDate}</p>
                          )}
                        </div>

                        {/* End Date */}
                        <div className="space-y-2">
                          <label
                            htmlFor="input_end"
                            className="block text-sm font-medium text-gray-700"
                          >
                            End Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="input_end"
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            onBlur={() => handleBlur("endDate")}
                            className={`w-full px-3 py-2 border ${errors.endDate ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900`}
                          />
                          {errors.endDate && (
                            <p className="mt-1 text-xs text-red-600">{errors.endDate}</p>
                          )}
                        </div>

                        {/* Target URLs */}
                        {/* English Target URL */}
                        <div className="space-y-2">
                          <label
                            htmlFor="input_target_url_pl"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Target URL (English)
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="input_target_url_pl"
                            type="text"
                            value={formData.targetUrlPl}
                            onChange={(e) => setFormData({ ...formData, targetUrlPl: e.target.value })}
                            onBlur={() => handleBlur("targetUrlPl")}
                            placeholder="Enter banner target URL (English)"
                            className={`${errors.targetUrlPl ? "border-red-500" : "border-gray-300"} w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 placeholder-gray-400 transition`}
                          />
                          {errors.targetUrlPl && (
                            <p className="mt-1 text-xs text-red-600">{errors.targetUrlPl}</p>
                          )}
                        </div>
                        {/* Arabic Target URL */}
                        <div className="space-y-2">
                          <label
                            htmlFor="input_target_url_sl"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Target URL (Arabic)
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="input_target_url_sl"
                            type="text"
                            value={formData.targetUrlSl}
                            onChange={(e) => setFormData({ ...formData, targetUrlSl: e.target.value })}
                            onBlur={() => handleBlur("targetUrlSl")}
                            placeholder="Enter banner target URL (Arabic)"
                            className={`${errors.targetUrlSl ? "border-red-500" : "border-gray-300"} w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 placeholder-gray-400 transition`}
                          />
                          {errors.targetUrlSl && (
                            <p className="mt-1 text-xs text-red-600">{errors.targetUrlSl}</p>
                          )}
                        </div>
                      </div>

                      {/* Remarks */}
                      <div className="space-y-2 md:col-span-2">
                        <label
                          htmlFor="input_remarks"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Remarks
                        </label>
                        <input
                          id="input_remarks"
                          type="text"
                          value={formData.bannerRemarks}
                          onChange={(e) => setFormData({ ...formData, bannerRemarks: e.target.value })}
                          placeholder="Enter banner remarks"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm text-gray-900 placeholder-gray-400 transition"
                        />
                      </div>

                    </div>

                    <div className="flex items-center gap-4 mt-8 mb-6">
                      <div className="flex-grow h-[2px] bg-gray-300"></div>

                      <h2 className="text-lg font-semibold text-gray-700 whitespace-nowrap">
                        Upload Banners
                      </h2>

                      <div className="flex-grow h-[2px] bg-gray-300"></div>
                    </div>
                    <div className="grid md:grid-cols-2  gap-4 mt-4">

                      {/* PL UPLOAD */}
                      <div >
                        <UploadBannerImg
                          viewFile={viewPl}
                          setUploadFile={setUploadPl}
                          slot="pl"
                        />
                      </div>

                      {/* SL UPLOAD */}
                      <div >
                        <UploadBannerImg
                          viewFile={viewSl}
                          setUploadFile={setUploadSl}
                          slot="sl"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-end gap-3 !mt-0">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loadingAddBigBanner || loadingPl || loadingSl}
                      className="flex items-center justify-center gap-1 px-6 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition"
                    >
                      <div>{(loadingAddBigBanner || loadingPl || loadingSl) && <><span className="animate-spin inline-block rounded-full h-4 w-4 border-2 border-white border-t-transparent mx-auto"></span></>}</div>
                      <div>{editingBanner?.bannerId ?
                        ((editingBanner.endDate.split('T')[0] < new Date().toISOString().split('T')[0]) ?
                          "Republish Banner" : "Update Banner") : "Create Banner"}</div>
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}