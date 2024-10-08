import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ResetPassModal = ({ closeModal, isOpen, handleForgotPassword }) => {
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
              <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold text-gray-900 mb-4 text-center"
                >
                  Password Reset
                </Dialog.Title>
                <form onSubmit={handleForgotPassword}>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border rounded-lg border-gray-300 bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      aria-required="true"
                      aria-describedby="email-description"
                    />
                    <p id="email-description" className="text-xs text-gray-500 p-1">
                      We will send a reset link to this email address.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-500 text-white rounded-lg transition-transform transform active:translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Submit
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ResetPassModal;
