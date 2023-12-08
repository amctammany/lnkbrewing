"use client";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const StyleForm = dynamic(() => import("./StyleForm"), {
  ssr: false,
});

import { UserMassPreference, Style } from "@prisma/client";
import { useRecipe } from "../useRecipe";

interface StyleProfileModalProps {
  massUnit: UserMassPreference;
  styles: Style[];
}

export const StyleModal: FC<StyleProfileModalProps> = ({
  styles,
  massUnit,
}) => {
  const { recipe, modalType, openModal, closeModal } = useRecipe();

  return (
    modalType === "style" && (
      <Modal
        title="Edit Style"
        close={closeModal}
        hidden={modalType !== "style"}
      >
        <div>
          {modalType === "style" && (
            <StyleForm massUnit={massUnit} styles={styles} />
          )}
        </div>
      </Modal>
    )
  );
};
export default StyleModal;
