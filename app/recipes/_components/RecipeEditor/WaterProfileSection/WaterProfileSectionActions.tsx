"use client";
import Button, { ButtonLink } from "@/components/Button/Button";
import React from "react";
import { EditIcon } from "@/components/Icon/EditIcon";
import { useRecipe } from "../useRecipe";

export const WaterProfileSectionActions = () => {
  const { openModal } = useRecipe();
  return (
    <div>
      <Button
        variant="toolbar"
        size="toolbar"
        onClick={() => openModal("water")}
      >
        <EditIcon size="small" />
      </Button>
    </div>
  );
};
