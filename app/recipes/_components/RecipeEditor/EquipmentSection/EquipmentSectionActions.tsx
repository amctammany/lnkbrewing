"use client";
import Button, { ButtonLink } from "@/components/Button/Button";
import React from "react";
import { AddIcon } from "@/components/Icon/AddIcon";
import { useRecipe } from "../useRecipe";

export const EquipmentSectionActions = () => {
  const { openModal } = useRecipe();
  return (
    <div>
      <Button onClick={() => openModal("equipment")}>
        <AddIcon />
      </Button>
    </div>
  );
};
