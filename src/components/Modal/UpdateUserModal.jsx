import { Fragment, useState } from "react";
import {
  Dialog,
  Listbox,
  Transition,
  DialogTitle,
  DialogPanel,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";

const roles = ["guest", "admin"];

const UpdateUserModal = ({ setIsOpen, isOpen, handleModal, user }) => {
  const [selected, setSelected] = useState(user.role);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
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
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-lg transition-all">
                <DialogTitle className="text-lg font-semibold text-gray-900 mb-4 text-center">
                  Update User Role
                </DialogTitle>
                <div className="mt-4 w-full">
                  <Listbox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                      <ListboxButton className="relative w-full cursor-pointer rounded-lg bg-gray-100 py-2 pl-3 pr-10 text-left shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500">
                        <span className="block truncate text-gray-800">
                          {selected}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <AiOutlineDown
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </ListboxButton>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                          {roles.map((role, roleIdx) => (
                            <ListboxOption
                              key={roleIdx}
                              className="relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-900 hover:bg-gray-100"
                              value={role}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected
                                        ? "font-semibold text-green-600"
                                        : "font-normal"
                                    }`}
                                  >
                                    {role}
                                  </span>
                                  {selected && (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                      <BsCheckLg
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  )}
                                </>
                              )}
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
                <hr className="my-4 border-gray-300" />
                <div className="flex justify-between gap-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 text-base font-medium rounded-md text-gray-700 bg-gray-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 text-base font-medium rounded-md text-white bg-green-600"
                    onClick={() => handleModal(selected)}
                  >
                    Update
                  </button>
                </div>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateUserModal;
