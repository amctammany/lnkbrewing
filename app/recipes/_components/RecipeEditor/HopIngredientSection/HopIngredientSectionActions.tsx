"use client";
import Button, { ButtonLink } from "@/components/Button/Button";
import React from "react";
import { AddIcon } from "@/components/Icon/AddIcon";
import { useRecipe } from "../useRecipe";

export const HopIngredientSectionActions = () => {
  const { openModal } = useRecipe();
  return (
    <div>
      <Button
        variant="toolbar"
        size="toolbar"
        onClick={() => openModal("hops", "new")}
      >
        <AddIcon size="small" />
      </Button>
    </div>
  );
};
