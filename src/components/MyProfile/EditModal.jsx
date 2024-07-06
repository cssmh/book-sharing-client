import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const EditModal = ({ closeModal, isOpen, photoURL, displayName, handleUpdate }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium text-center leading-6 text-gray-900 mb-1">
                  Edit Your Profile
                </Dialog.Title>
                <form onSubmit={handleUpdate}>
                  <div className="form-control">
                    <label htmlFor="name" className="label pt-0">
                      <span className="label-text">Your Name</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      defaultValue={displayName}
                      className="text-sm w-full rounded-xl border border-gray-300 p-[9px] focus:border-transparent"
                    />
                  </div>
                  <div className="form-control mt-1">
                    <label htmlFor="photo" className="label">
                      <span className="label-text">Photo URL</span>
                    </label>
                    <input
                      id="photo"
                      type="text"
                      name="photo"
                      className="text-sm w-full rounded-xl border border-gray-300 p-[9px] focus:border-transparent"
                      defaultValue={
                        photoURL ===
                        "https://raw.githubusercontent.com/cssmh/bookhaven-client/main/src/assets/default.jpg"
                          ? ""
                          : photoURL
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary py-[9px] rounded-2xl text-white mt-5 mb-2 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-opacity-75"
                  >
                    Update
                  </button>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditModal;
