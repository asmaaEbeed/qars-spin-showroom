import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function BaseModal({ open, setOpen, title, children, actions }) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
              {title && (
                <Dialog.Title className="flex justify-between items-center p-4 bg-primary text-white rounded-t-lg">
                  <h2 className="text-lg font-semibold">{title}</h2>
                  <button
                    type="button"
                    className="ml-3 -mx-1.5 p-1.5 rounded-md hover:bg-gray-100 text-white hover:text-gray-700 transition-colors"
                    aria-label="Close"
                    onClick={() => setOpen(false)}
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </Dialog.Title>
              )}

              <div>{children}</div>

              {actions && (
                <div className="flex justify-end gap-3 mt-4">
                  {actions}
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
