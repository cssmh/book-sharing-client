import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ReviewModal = ({ closeModal, book_name, isOpen, handleAddReview }) => {
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
          <div className="fixed inset-0 bg-black/25" />
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  {book_name} Book Review
                </Dialog.Title>
                <form onSubmit={handleAddReview}>
                  <div>
                    <label htmlFor="text" className="block mb-2 text-sm">
                      Your review
                    </label>
                    <textarea
                      name="review"
                      rows="5"
                      required
                      placeholder="Share your thoughts about your experience getting and reading this book..."
                      className="w-full sm:w-3/4 md:w-full rounded-sm border-gray-300 focus:border-transparent"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full p-2 mt-2 text-center font-medium text-white transition duration-200 rounded shadow-md bg-green-400"
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

export default ReviewModal;
