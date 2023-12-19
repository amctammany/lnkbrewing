"use client";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const EquipmentForm = dynamic(() => import("./EquipmentForm"));

import { UserMassPreference, EquipmentProfile } from "@prisma/client";
import { useRecipe } from "../useRecipe";
import { ExtendedRecipe } from "@/app/recipes/types";

interface EquipmentProfileModalProps {
  massUnit?: UserMassPreference;
  recipe?: ExtendedRecipe | null;
  profiles: EquipmentProfile[];
}

export const EquipmentModal: FC<EquipmentProfileModalProps> = ({
  recipe,
  massUnit,
  profiles,
}) => {
  const { modalType, openModal, closeModal } = useRecipe();

  return (
    modalType === "equipment" && (
      <Modal
        title="Edit Equipment"
        close={closeModal}
        hidden={modalType !== "equipment"}
      >
        <div>
          {modalType === "equipment" && (
            <EquipmentForm
              recipe={recipe}
              massUnit={massUnit}
              profiles={profiles}
            />
          )}
        </div>
      </Modal>
    )
  );
};
export default EquipmentModal;
