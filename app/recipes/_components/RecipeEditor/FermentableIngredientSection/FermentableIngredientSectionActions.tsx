"use client";
import Button, { ButtonLink } from "@/components/Button/Button";
import React from "react";
import { AddIcon } from "@/components/Icon/AddIcon";
import { useRecipe } from "../useRecipe";

export const FermentableIngredientSectionActions = () => {
  const { openModal } = useRecipe();
  return (
    <div>
      <Button
        variant="toolbar"
        size="toolbar"
        onClick={() => openModal("fermentables", "new")}
      >
        <AddIcon size="small" />
      </Button>
    </div>
  );
};
