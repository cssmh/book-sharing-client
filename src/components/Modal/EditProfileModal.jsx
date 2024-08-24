import React, { Fragment } from "react";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";

const EditProfileModal = ({
  closeModal,
  isOpen,
  photoURL,
  displayName,
  handleUpdate,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-lg transition-all">
                <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  Edit Your Profile
                </Dialog.Title>
                <form onSubmit={handleUpdate}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      defaultValue={displayName}
                      className="text-sm w-full rounded-lg border border-gray-300 py-2 px-3 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Photo URL
                    </label>
                    <input
                      id="photo"
                      type="text"
                      name="photo"
                      className="text-sm w-full rounded-lg border border-gray-300 py-2 px-3 focus:border-transparent focus:ring-2 focus:ring-green-500"
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
                    className="w-full bg-green-500 py-2 rounded-lg text-white mt-4 transform active:translate-y-0.5 transition-transform duration-150 ease-in-out"
                  >
                    Update
                  </button>
                </form>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditProfileModal;
