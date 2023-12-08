"use client";
import Button, { ButtonLink } from "@/components/Button/Button";
import React from "react";
import { AddIcon } from "@/components/Icon/AddIcon";
import { useRecipe } from "../useRecipe";

export const YeastIngredientSectionActions = () => {
  const { openYeast } = useRecipe();
  return (
    <div>
      <Button onClick={() => openYeast("new")}>
        <AddIcon />
      </Button>
    </div>
  );
};
