import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import UploadBannerImg from "../UploadBannerImg";
import { useBannerUpload } from "../hooks/useBannerUpload";
import { useBannerContext } from "../../../context/BannerContext";

export default function BannerUploadModal({ open, setOpen, uploadSlot }) {
  const { editingBanner } = useBannerContext();

  const {
    viewFile,
    uploadFile,
    setUploadFile,
    loadingUploadBigBanner,
    handleUpload,
    reset,
  } = useBannerUpload(editingBanner, open, uploadSlot);

  const onUploadClick = async () => {
    const res = await handleUpload(editingBanner.bannerId);
    if (res?.status === 200) {
      reset();
      setOpen(false);
    }
  };

  const closeModal = () => {
    reset();
    setOpen(false);
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-6 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-4 scale-95"
          >
            <Dialog.Panel className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
                <Dialog.Title className="text-lg font-semibold text-gray-800">
                  Upload Banner –{" "}
                  <span className="text-primary-600">
                    {uploadSlot === "pl" ? "English" : "Arabic"}
                  </span>
                </Dialog.Title>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                {/* Body */}
                <UploadBannerImg viewFile={viewFile} setUploadFile={setUploadFile} slot={uploadSlot}/>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
                <button onClick={closeModal} className="px-5 py-2 rounded-lg border">
                  Cancel
                </button>

                <button
                  onClick={onUploadClick}
                  disabled={!uploadFile || loadingUploadBigBanner}
                  className={`px-6 py-2 rounded-lg text-white shadow ${uploadFile
                      ? "bg-primary-600 hover:bg-primary-700"
                      : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                  {loadingUploadBigBanner ? (
                    <>
                      <span className="animate-spin inline-block h-4 w-4 border-2 rounded-full mx-2 border-white border-t-transparent"></span>
                      Uploading
                    </>
                  ) : (
                    "Upload"
                  )}
                </button>
              </div>

            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
