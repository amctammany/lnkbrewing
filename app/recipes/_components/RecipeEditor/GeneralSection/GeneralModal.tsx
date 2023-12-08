"use client";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const GeneralForm = dynamic(() => import("./GeneralForm"), {
  ssr: false,
});

import { UserMassPreference } from "@prisma/client";
import { useRecipe } from "../useRecipe";

interface GeneralProfileModalProps {
  massUnit: UserMassPreference;
}

export const GeneralModal: FC<GeneralProfileModalProps> = ({ massUnit }) => {
  const { recipe, modalType, openModal, closeModal } = useRecipe();

  return (
    modalType === "general" && (
      <Modal
        title="Edit General"
        close={closeModal}
        hidden={modalType !== "general"}
      >
        <div>
          {modalType === "general" && <GeneralForm massUnit={massUnit} />}
        </div>
      </Modal>
    )
  );
};
export default GeneralModal;
