import React, { Fragment, useState } from "react";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ChangePassModal = ({ isPassOpen, closeModal, handleChangePass }) => {
  const [view, setView] = useState(true);

  return (
    <Transition appear show={isPassOpen} as={Fragment}>
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
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            aria-hidden="true"
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md p-6 mx-auto bg-white rounded-xl shadow-lg">
                <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  New Password
                </Dialog.Title>
                <form onSubmit={handleChangePass}>
                  <div className="relative mb-4">
                    <input
                      id="password"
                      name="password"
                      type={view ? "password" : "text"}
                      required
                      placeholder="Enter your password"
                      className="text-sm w-full rounded-lg border border-gray-300 py-2 px-3 focus:border-transparent focus:ring-2 focus:ring-green-500"
                      aria-label="Password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center"
                      onClick={() => setView(!view)}
                      aria-label={view ? "Show password" : "Hide password"}
                    >
                      {view ? (
                        <FaRegEyeSlash className="text-gray-400" />
                      ) : (
                        <FaRegEye className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-500 py-2 rounded-lg text-white mt-4 focus:outline-none focus:ring-2 focus:ring-green-500"
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

export default ChangePassModal;
