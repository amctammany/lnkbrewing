"use client";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const WaterProfileForm = dynamic(() => import("./WaterProfileForm"), {
  ssr: false,
});

import { UserMassPreference, WaterProfile } from "@prisma/client";
import { useRecipe } from "../useRecipe";

interface WaterProfileProfileModalProps {
  massUnit: UserMassPreference;
  profiles: WaterProfile[];
}

export const WaterProfileModal: FC<WaterProfileProfileModalProps> = ({
  massUnit,
  profiles,
}) => {
  const { recipe, modalType, openModal, closeModal } = useRecipe();

  return (
    modalType === "water" && (
      <Modal
        title="Edit WaterProfile"
        close={closeModal}
        hidden={modalType !== "water"}
      >
        <div>
          {modalType === "water" && (
            <WaterProfileForm massUnit={massUnit} profiles={profiles} />
          )}
        </div>
      </Modal>
    )
  );
};
export default WaterProfileModal;
