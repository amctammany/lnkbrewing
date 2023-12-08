"use client";
import Button, { ButtonLink } from "@/components/Button/Button";
import React from "react";
import { AddIcon } from "@/components/Icon/AddIcon";
import { useRecipe } from "../useRecipe";

export const FermentableIngredientSectionActions = () => {
  const { openFermentable } = useRecipe();
  return (
    <div>
      <Button onClick={() => openFermentable("new")}>
        <AddIcon />
      </Button>
    </div>
  );
};
