"use client";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const WaterProfileForm = dynamic(() => import("./WaterProfileForm"), {
  ssr: false,
});

import { UserMassPreference, WaterProfile } from "@prisma/client";
import { useRecipe } from "../useRecipe";
import { ExtendedRecipe } from "@/app/recipes/types";

interface WaterProfileProfileModalProps {
  massUnit: UserMassPreference;
  recipe?: ExtendedRecipe | null;
  profiles: WaterProfile[];
}

export const WaterProfileModal: FC<WaterProfileProfileModalProps> = ({
  massUnit,
  recipe,
  profiles,
}) => {
  const { modalType, openModal, closeModal } = useRecipe();

  return (
    modalType === "water" && (
      <Modal
        title="Edit WaterProfile"
        close={closeModal}
        hidden={modalType !== "water"}
      >
        <div>
          {modalType === "water" && (
            <WaterProfileForm
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
export default WaterProfileModal;
