import React, { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ChangePassModal = ({ isPassOpen, closeModal, handleChangePass }) => {
  const [view, setView] = useState(true);
  return (
    <Transition appear show={isPassOpen} as={Fragment}>
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
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium text-center leading-6 text-gray-900 mb-3">
                  New Password
                </Dialog.Title>
                <form onSubmit={handleChangePass}>
                  <div className="form-control relative">
                    <input
                      id="password"
                      name="password"
                      type={view ? "password" : "text"}
                      required
                      placeholder="Enter your password"
                      className="text-sm w-full rounded-xl border border-gray-300 p-[9px] focus:border-transparent"
                    />
                    <span
                      className="absolute top-3 right-3"
                      onClick={() => setView(!view)}
                    >
                      {view ? <FaRegEyeSlash /> : <FaRegEye />}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary py-2 rounded-2xl text-white mt-4 mb-2 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-opacity-75"
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

export default ChangePassModal;
