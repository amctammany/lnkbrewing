"use client";
import { ExtendedRecipe } from "@/app/recipes/types";
import { Modal } from "@/components/Modal/Modal";
import React, { FC } from "react";
//import { GeneralForm } from "./OtherIngredientForm";
import dynamic from "next/dynamic";
const GeneralForm = dynamic(() => import("./GeneralForm"), {
  ssr: false,
});

//import {
//addRecipeGeneralToRecipe,
//updateRecipeGeneral,
//} from "@/app/recipes/actions";
//import { getOtherOptions, getOthers } from "@/app/ingredients/others/queries";
import { UserMassPreference } from "@prisma/client";
import { Button } from "@/components/Button";
import { useRecipe } from "../useRecipe";

interface GeneralProfileModalProps {
  recipe?: ExtendedRecipe | null;
  massUnit: UserMassPreference;
  //open: boolean;
  //close: () => void;
}

export const GeneralModal: FC<GeneralProfileModalProps> = ({
  //recipe,
  //other,
  massUnit,
}) => {
  const { recipe, modalType, openModal, closeModal } = useRecipe();

  return (
    modalType === "general" && (
      <Modal
        //title="Edit Other"
        close={closeModal}
        hidden={modalType !== "general"}
      >
        <div>
          {modalType === "general" && (
            <GeneralForm
              massUnit={massUnit}
              //otherId={otherId}
              //other={other}
              //recipe={recipe}
            />
          )}
        </div>
      </Modal>
    )
  );
};
export default GeneralModal;
