"use client";
import Button, { ButtonLink } from "@/components/Button/Button";
import React from "react";
import { AddIcon } from "@/components/Icon/AddIcon";
import { useRecipe } from "../useRecipe";

export const HopIngredientSectionActions = () => {
  const { openHop } = useRecipe();
  return (
    <div>
      <Button onClick={() => openHop("new")}>
        <AddIcon />
      </Button>
    </div>
  );
};
