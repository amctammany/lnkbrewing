"use client";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const MashForm = dynamic(() => import("./MashForm"), {
  ssr: false,
});

import { UserMassPreference, MashProfile } from "@prisma/client";
import { useRecipe } from "../useRecipe";

interface MashProfileModalProps {
  massUnit: UserMassPreference;
  profiles: MashProfile[];
}

export const MashModal: FC<MashProfileModalProps> = ({
  massUnit,
  profiles,
}) => {
  const { recipe, modalType, openModal, closeModal } = useRecipe();

  return (
    modalType === "mash" && (
      <Modal title="Edit Mash" close={closeModal} hidden={modalType !== "mash"}>
        <div>
          {modalType === "mash" && (
            <MashForm massUnit={massUnit} profiles={profiles} />
          )}
        </div>
      </Modal>
    )
  );
};
export default MashModal;
