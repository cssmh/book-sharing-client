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
              <Dialog.Panel className="w-full max-w-xl p-6 bg-white rounded-xl shadow-lg transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold text-gray-900 mb-4 text-center"
                >
                  Review for {book_name}
                </Dialog.Title>
                <form onSubmit={handleAddReview} className="mt-3">
                  <label htmlFor="review" className="sr-only">
                    Your Review
                  </label>
                  <textarea
                    id="review"
                    name="review"
                    rows="7"
                    required
                    placeholder="Share your experience..."
                    className="text-sm w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                    aria-label="Share your experience"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-green-400 py-2 rounded-xl text-white mt-4 focus:outline-none focus:ring-2 focus:ring-green-500"
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
