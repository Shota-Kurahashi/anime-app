/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Transition } from "@headlessui/react";
import React, { FC } from "react";
import { ModalContent } from "src/components/Layout/modules/ModalContent";
import { useGlobalState } from "src/store/global/globalStore";

export const Modal: FC = () => {
  const isOpenLoginModal = useGlobalState((state) => state.isOpenLoginModal);
  const changeIsOpenModal = useGlobalState((state) => state.setIsOpenModal);

  return (
    <Transition
      show={isOpenLoginModal}
      enter="transition-opacity duration-100"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      onClick={(e) => {
        if (e.target === e.currentTarget) changeIsOpenModal(false);
      }}
      className="fixed inset-0 z-50   flex place-items-center bg-black/20"
    >
      <Transition.Child
        enter="transition-all duration-200"
        enterFrom="opacity-0 scale-0"
        enterTo="opacity-100 scale-100"
        leave="transition-all duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-0"
        className="mx-auto w-4/5 max-w-md rounded-md bg-white"
      >
        <ModalContent />
      </Transition.Child>
    </Transition>
  );
};
