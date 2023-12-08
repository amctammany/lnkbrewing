"use client";
import Button, { ButtonLink } from "@/components/Button/Button";
import React from "react";
import { AddIcon } from "@/components/Icon/AddIcon";
import { useRecipe } from "../useRecipe";

export const MashSectionActions = () => {
  const { openModal } = useRecipe();
  return (
    <div>
      <Button onClick={() => openModal("mash")}>
        <AddIcon />
      </Button>
    </div>
  );
};
