"use client";
import Button, { ButtonLink } from "@/components/Button/Button";
import React from "react";
import { EditIcon } from "@/components/Icon/EditIcon";
import { useRecipe } from "../useRecipe";

export const WaterProfileSectionActions = () => {
  const { openModal } = useRecipe();
  return (
    <div>
      <Button onClick={() => openModal("water")}>
        <EditIcon />
      </Button>
    </div>
  );
};
