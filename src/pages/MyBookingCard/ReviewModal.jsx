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
                <form onSubmit={handleAddReview} className="mt-4">
                  <div>
                    <label htmlFor="review" className="sr-only">
                      Review
                    </label>
                    <textarea
                      id="review"
                      name="review"
                      rows="8"
                      required
                      placeholder="Share your experience..."
                      className="text-sm w-full rounded-lg border border-gray-300 mt-3 p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                      aria-label="Share your experience"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary py-2 rounded-2xl text-white mt-4 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-opacity-75"
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
