"use client";
import Button, { ButtonLink } from "@/components/Button/Button";
import React from "react";
import { EditIcon } from "@/components/Icon/EditIcon";
import { useRecipe } from "../useRecipe";

export const EquipmentSectionActions = () => {
  const { openModal } = useRecipe();
  return (
    <div>
      <Button
        variant="toolbar"
        size="toolbar"
        onClick={() => openModal("equipment")}
      >
        <EditIcon size="small" />
      </Button>
    </div>
  );
};
