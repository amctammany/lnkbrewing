"use client";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
import dynamic from "next/dynamic";
const StyleForm = dynamic(() => import("./StyleForm"), {
  ssr: false,
});

import { UserMassPreference, Style } from "@prisma/client";
import { useRecipe } from "../useRecipe";
import { ExtendedRecipe } from "@/app/recipes/types";

interface StyleProfileModalProps {
  recipe?: ExtendedRecipe | null;
  massUnit: UserMassPreference;
  styles: Style[];
}

export const StyleModal: FC<StyleProfileModalProps> = ({
  styles,
  recipe,
  massUnit,
}) => {
  const { modalType, openModal, closeModal } = useRecipe();

  return (
    modalType === "style" && (
      <Modal
        title="Edit Style"
        close={closeModal}
        hidden={modalType !== "style"}
      >
        <div>
          {modalType === "style" && (
            <StyleForm recipe={recipe} massUnit={massUnit} styles={styles} />
          )}
        </div>
      </Modal>
    )
  );
};
export default StyleModal;
