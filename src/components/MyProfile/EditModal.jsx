import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

const EditModal = ({ closeModal, isOpen, dp, name, handleUpdate }) => {
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
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 pb- text-left align-middle shadow-xl transition-all">
                <form onSubmit={handleUpdate} className="card-body py-0 px-1">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Your Name</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={name}
                      name="name"
                      required
                      className="input input-bordered rounded-2xl text-gray-500 focus:border-transparent"
                      style={{ outline: "none" }}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Photo URL</span>
                    </label>
                    <input
                      type="text"
                      name="photo"
                      required
                      defaultValue={
                        dp ===
                        "https://raw.githubusercontent.com/cssmh/bookhaven-client/main/src/assets/default.jpg"
                          ? ""
                          : dp
                      }
                      className="input input-bordered rounded-2xl text-gray-500 focus:border-transparent"
                      style={{ outline: "none" }}
                    />
                  </div>
                  <button className="w-full bg-primary py-[10px] rounded-2xl text-white mt-2">
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
