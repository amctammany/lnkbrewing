"use client";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const EquipmentForm = dynamic(() => import("./EquipmentForm"), {
  ssr: false,
});

import { UserMassPreference, EquipmentProfile } from "@prisma/client";
import { useRecipe } from "../useRecipe";

interface EquipmentProfileModalProps {
  massUnit: UserMassPreference;
  profiles: EquipmentProfile[];
}

export const EquipmentModal: FC<EquipmentProfileModalProps> = ({
  massUnit,
  profiles,
}) => {
  const { recipe, modalType, openModal, closeModal } = useRecipe();

  return (
    modalType === "equipment" && (
      <Modal
        title="Edit Equipment"
        close={closeModal}
        hidden={modalType !== "equipment"}
      >
        <div>
          {modalType === "equipment" && (
            <EquipmentForm massUnit={massUnit} profiles={profiles} />
          )}
        </div>
      </Modal>
    )
  );
};
export default EquipmentModal;
