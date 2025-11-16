import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useBannerContext } from "../../../context/BannerContext";
export default function BannerApproveModal({
  open,
  setOpen,
  confirmApprove,
}) {
  const { loadingApproveBigBanner } = useBannerContext();
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium">
                  Approve Banner
                </Dialog.Title>

                <div className="mt-4 text-sm">
                  Are you sure you want to approve this banner?
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>

                  <button
                    disabled={loadingApproveBigBanner}
                    onClick={confirmApprove}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    {loadingApproveBigBanner ? <>
                      <span className="animate-spin inline-block h-4 w-4 border-2 rounded-full mx-2 border-white border-t-transparent"></span>
                      Approving
                    </> : "Confirm"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
