"use client";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const GeneralForm = dynamic(() => import("./GeneralForm"));

import { UserMassPreference } from "@prisma/client";
import { useRecipe } from "../useRecipe";
import { ExtendedRecipe } from "@/app/recipes/types";

interface GeneralProfileModalProps {
  massUnit?: UserMassPreference;
  recipe?: ExtendedRecipe | null;
}

export const GeneralModal: FC<GeneralProfileModalProps> = ({
  recipe,
  massUnit,
}) => {
  const { modalType, openModal, closeModal } = useRecipe();

  return (
    modalType === "general" && (
      <Modal
        title="Edit General"
        close={closeModal}
        hidden={modalType !== "general"}
      >
        <div>
          {modalType === "general" && (
            <GeneralForm recipe={recipe} massUnit={massUnit} />
          )}
        </div>
      </Modal>
    )
  );
};
export default GeneralModal;
